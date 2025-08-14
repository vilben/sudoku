import { Grid, SudokuError } from "../../sudoku.types";

export function isValidSudoku(grid: Grid): boolean {
  const SIZE = 9;

  // Helper: check if an array contains no duplicate numbers (ignoring 0)
  const noDuplicates = (nums: number[]): boolean => {
    const seen = new Set<number>();
    for (const num of nums) {
      if (num === 0) continue; // skip empty
      if (num < 1 || num > 9) return false; // invalid number
      if (seen.has(num)) return false;
      seen.add(num);
    }
    return true;
  };

  // Check rows
  for (let r = 0; r < SIZE; r++) {
    if (!noDuplicates(grid[r])) return false;
  }

  // Check columns
  for (let c = 0; c < SIZE; c++) {
    const col = grid.map((row) => row[c]);
    if (!noDuplicates(col)) return false;
  }

  // Check 3×3 subgrids
  for (let boxRow = 0; boxRow < SIZE; boxRow += 3) {
    for (let boxCol = 0; boxCol < SIZE; boxCol += 3) {
      const block: number[] = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          block.push(grid[boxRow + r][boxCol + c]);
        }
      }
      if (!noDuplicates(block)) return false;
    }
  }

  return true;
}

export function validateSudoku(grid: Grid): SudokuError[] {
  const SIZE = 9;
  const errors: SudokuError[] = [];

  const markDuplicates = (
    coords: { x: number; y: number; value: number }[],
  ) => {
    const seen = new Map<number, { x: number; y: number }>();
    for (const cell of coords) {
      if (cell.value === 0) continue; // skip empty
      if (cell.value < 1 || cell.value > 9) {
        errors.push({ x: cell.x, y: cell.y });
      } else if (seen.has(cell.value)) {
        const first = seen.get(cell.value)!;
        errors.push(first, { x: cell.x, y: cell.y });
      } else {
        seen.set(cell.value, { x: cell.x, y: cell.y });
      }
    }
  };

  // Check rows
  for (let y = 0; y < SIZE; y++) {
    markDuplicates(grid[y].map((value, x) => ({ x, y, value })));
  }

  // Check columns
  for (let x = 0; x < SIZE; x++) {
    markDuplicates(grid.map((row, y) => ({ x, y, value: row[x] })));
  }

  // Check boxes
  for (let boxY = 0; boxY < SIZE; boxY += 3) {
    for (let boxX = 0; boxX < SIZE; boxX += 3) {
      const block: { x: number; y: number; value: number }[] = [];
      for (let dy = 0; dy < 3; dy++) {
        for (let dx = 0; dx < 3; dx++) {
          const y = boxY + dy;
          const x = boxX + dx;
          block.push({ x, y, value: grid[y][x] });
        }
      }
      markDuplicates(block);
    }
  }

  // Remove duplicate coordinates
  return Array.from(new Map(errors.map((e) => [`${e.x},${e.y}`, e])).values());
}
