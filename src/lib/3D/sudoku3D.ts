import { ThreeDGrid } from "~/lib/3D/sudoku3D.types";

type Candidates = Set<number>[][][];

export class Sudoku3D {
  size: number;
  numbers: number[];

  constructor(size: number) {
    if (size < 3 || size > 9) {
      throw new Error("Size must be between 3 and 9");
    }
    this.size = size;
    this.numbers = Array.from({ length: size }, (_, i) => i + 1);
  }

  /** Create empty grid */
  createEmpty(): ThreeDGrid {
    return Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => Array(this.size).fill(0)),
    );
  }

  /** Build initial candidates from a grid */
  private initCandidates(grid: ThreeDGrid): Candidates {
    const n = this.size;
    const cands: Candidates = Array.from({ length: n }, () =>
      Array.from({ length: n }, () =>
        Array.from({ length: n }, () => new Set(this.numbers)),
      ),
    );

    for (let z = 0; z < n; z++) {
      for (let x = 0; x < n; x++) {
        for (let y = 0; y < n; y++) {
          const val = grid[z][x][y];
          if (val !== 0) {
            this.updateCandidates(cands, x, y, z, val);
            cands[z][x][y] = new Set([val]); // fixed
          }
        }
      }
    }
    return cands;
  }

  /** Update candidate sets after placing a value */
  private updateCandidates(
    cands: Candidates,
    x: number,
    y: number,
    z: number,
    val: number,
  ) {
    const n = this.size;
    // Row
    for (let j = 0; j < n; j++) cands[z][x][j].delete(val);
    // Column
    for (let i = 0; i < n; i++) cands[z][i][y].delete(val);
    // Pillar
    for (let k = 0; k < n; k++) cands[k][x][y].delete(val);
    // Own cell = fixed
    cands[z][x][y] = new Set([val]);
  }

  /** Pick the cell with minimum remaining values (MRV heuristic) */
  private findBestCell(
    grid: ThreeDGrid,
    cands: Candidates,
  ): [number, number, number] | null {
    const n = this.size;
    let best: [number, number, number] | null = null;
    let min = Infinity;

    for (let z = 0; z < n; z++) {
      for (let x = 0; x < n; x++) {
        for (let y = 0; y < n; y++) {
          if (grid[z][x][y] === 0) {
            const count = cands[z][x][y].size;
            if (count < min) {
              min = count;
              best = [x, y, z];
              if (min === 1) return best; // best possible
            }
          }
        }
      }
    }
    return best;
  }

  /** Generate a full valid solution */
  generateRandomSolution(): ThreeDGrid {
    const grid = this.createEmpty();
    const cands = this.initCandidates(grid);
    this._fill(grid, cands);
    return grid;
  }

  private _fill(grid: ThreeDGrid, cands: Candidates): boolean {
    const cell = this.findBestCell(grid, cands);
    if (!cell) return true; // solved
    const [x, y, z] = cell;

    // Randomize order
    const options = Array.from(cands[z][x][y]);
    options.sort(() => Math.random() - 0.5);

    for (const val of options) {
      // Clone candidate state
      const snapshot = cands.map((face) =>
        face.map((row) => row.map((set) => new Set(set))),
      );
      grid[z][x][y] = val;
      this.updateCandidates(cands, x, y, z, val);

      if (this._fill(grid, cands)) return true;

      // Backtrack
      grid[z][x][y] = 0;
      for (let z2 = 0; z2 < this.size; z2++) {
        for (let x2 = 0; x2 < this.size; x2++) {
          for (let y2 = 0; y2 < this.size; y2++) {
            cands[z2][x2][y2] = snapshot[z2][x2][y2];
          }
        }
      }
    }
    return false;
  }

  /** Solver that counts solutions (with MRV) */
  solve(grid: ThreeDGrid, limit = 2): number {
    const cands = this.initCandidates(grid);
    const count = { val: 0 };
    this._solve(grid, cands, limit, count);
    return count.val;
  }

  private _solve(
    grid: ThreeDGrid,
    cands: Candidates,
    limit: number,
    count: { val: number },
  ): void {
    if (count.val >= limit) return;
    const cell = this.findBestCell(grid, cands);
    if (!cell) {
      count.val++;
      return;
    }

    const [x, y, z] = cell;
    for (const val of Array.from(cands[z][x][y])) {
      const snapshot = cands.map((face) =>
        face.map((row) => row.map((set) => new Set(set))),
      );
      grid[z][x][y] = val;
      this.updateCandidates(cands, x, y, z, val);

      this._solve(grid, cands, limit, count);

      grid[z][x][y] = 0;
      for (let z2 = 0; z2 < this.size; z2++) {
        for (let x2 = 0; x2 < this.size; x2++) {
          for (let y2 = 0; y2 < this.size; y2++) {
            cands[z2][x2][y2] = snapshot[z2][x2][y2];
          }
        }
      }

      if (count.val >= limit) return;
    }
  }

  /** Deep clone helper */
  private cloneGrid(g: ThreeDGrid): ThreeDGrid {
    return g.map((face) => face.map((row) => [...row]));
  }

  /** Generate a riddle (unique solution) */
  generateRiddle(
    solution: ThreeDGrid,
    cluesToKeep: number,
    maxPasses = 1,
  ): ThreeDGrid {
    const n = this.size;
    const totalCells = n * n * n;
    if (cluesToKeep < 0 || cluesToKeep >= totalCells) {
      throw new Error("cluesToKeep must be between 0 and totalCells - 1");
    }

    const riddle = this.cloneGrid(solution);
    const targetRemovals = totalCells - cluesToKeep;
    let removed = 0;

    for (let pass = 0; pass < maxPasses && removed < targetRemovals; pass++) {
      const positions = Array.from({ length: totalCells }, (_, i) => i);
      positions.sort(() => Math.random() - 0.5);

      for (const pos of positions) {
        if (removed >= targetRemovals) break;
        const z = Math.floor(pos / (n * n));
        const x = Math.floor((pos % (n * n)) / n);
        const y = pos % n;

        if (riddle[z][x][y] === 0) continue;

        const backup = riddle[z][x][y];
        riddle[z][x][y] = 0;

        const copy = this.cloneGrid(riddle);
        const solutions = this.solve(copy, 2);

        if (solutions === 1) {
          removed++;
        } else {
          riddle[z][x][y] = backup;
        }
      }
    }
    return riddle;
  }
}
