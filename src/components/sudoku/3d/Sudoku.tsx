import {
  ChangeEvent,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "~/components/ui/button";
import "./SudokuStyles.css";
import { Slider } from "~/components/ui/slider";
import {
  MoveDiagonal,
  MoveHorizontal,
  MoveLeft,
  MoveRight,
  MoveVertical,
} from "lucide-react";

const N = 3;
const FACES = [...Array(N).keys()];

type Face = number[][];
type ThreeDGrid = Array<Face>;

enum Side {
  FRONT,
  TOP,
  RIGHT,
}

/* Solution
const face1: Face = [[1, 2, 3], [2, 3, 1], [3, 1, 2]];
const face2: Face = [[2, 3, 1], [3, 1, 2], [1, 2, 3]];
const face3: Face = [[3, 1, 2], [1, 2, 3], [2, 3, 1]];
* */

const face1: Face = [
  [0, 0, 0],
  [2, 3, 0],
  [0, 1, 0],
];
const face2: Face = [
  [0, 3, 0],
  [3, 0, 2],
  [0, 2, 0],
];
const face3: Face = [
  [3, 0, 0],
  [1, 0, 0],
  [2, 3, 0],
];

const ThreeDGrid: ThreeDGrid = [face1, face2, face3];

export const Sudoku = () => {
  const faceRefs = useRef<HTMLDivElement[]>([]);
  const [visibleFace, setVisibleFace] = useState<number>(0);
  const [side, setSide] = useState<Side>(Side.FRONT);
  const [grid, setGrid] = useState<ThreeDGrid>(ThreeDGrid);
  const [xRotation, setXRotation] = useState<number>(15);
  const [yRotation, setYRotation] = useState<number>(30);
  const [translation, setTranslation] = useState<number>(5);

  useEffect(() => {
    faceRefs.current?.forEach((faceRef: HTMLDivElement, index) => {
      const faceIndex = index - visibleFace;
      const faceNo =
        FACES[faceIndex < 0 ? FACES.length + faceIndex : faceIndex];

      faceRef.style.transform = `translateZ(${-1 * faceNo * translation + "rem"}) translateX(${((translation * yRotation) / 45) * faceNo + "rem"}) translateY(${((-1 * translation * xRotation) / 45) * faceNo + "rem"}) rotateY(${-1 * yRotation}deg) rotateX(${-1 * xRotation}deg)`;
      faceRef.style.opacity = Math.pow(0.35, faceNo).toString();
      faceRef.style.zIndex = (faceRefs.current.length - faceNo).toString();
    });
  }, [visibleFace, faceRefs.current, grid, xRotation, yRotation, translation]);

  const setValueInGrid = useCallback(
    (i: number, j: number, k: number, v: number) => {
      const newGrid = [...grid];
      newGrid[i][j][k] = v;
      setGrid(newGrid);
    },
    [grid, setGrid],
  );

  const renderFaces = useMemo(() => {
    return (
      <>
        {grid.map((face, index) => (
          <Face
            ref={(el) => {
              faceRefs.current[index] = el!;
            }}
            key={Math.random()}
            face={face}
            faceIndex={index}
            setValue={setValueInGrid}
          />
        ))}
      </>
    );
  }, [grid, setValueInGrid]);

  const changeVisibleFace = (dir: boolean) => {
    if (dir) {
      setVisibleFace((c) => (c === N - 1 ? 0 : c + 1));
    } else {
      setVisibleFace((c) => (c === 0 ? N - 1 : c - 1));
    }
  };

  return (
    <>
      <div className={"sudoku-container h-75 w-75"}>{renderFaces}</div>
      <div className={"flex flex-col gap-2"}>
        <div className={"flex flex-row font-bold font-lg justify-center gap-2"}>
          <Button onClick={() => changeVisibleFace(false)}>
            <MoveLeft />
          </Button>
          <Button onClick={() => changeVisibleFace(true)}>
            <MoveRight />
          </Button>
        </div>
        <label className={"flex gap-2"}>
          <MoveVertical />
          <Slider
            min={0}
            defaultValue={[15]}
            max={45}
            step={1}
            onValueChange={(v) => setXRotation(v[0])}
          />
        </label>
        <label className={"flex gap-2"}>
          <MoveHorizontal />
          <Slider
            min={0}
            defaultValue={[30]}
            max={45}
            step={1}
            onValueChange={(v) => setYRotation(v[0])}
          />
        </label>
        <label className={"flex gap-2"}>
          <MoveDiagonal />
          <Slider
            min={0}
            defaultValue={[5]}
            max={10}
            step={1}
            onValueChange={(v) => setTranslation(v[0])}
          />
        </label>
      </div>
    </>
  );
};

export const Face = forwardRef<
  HTMLDivElement,
  {
    face: Face;
    faceIndex: number;
    setValue: (faceIndex: number, row: number, col: number, n: number) => void;
  }
>(
  (
    {
      face,
      faceIndex,
      setValue,
    }: {
      face: Face;
      faceIndex: number;
      setValue: (
        faceIndex: number,
        row: number,
        col: number,
        n: number,
      ) => void;
    },
    ref,
  ) => {
    const onChange = (
      e: ChangeEvent<HTMLInputElement>,
      faceIndex: number,
      rowIndex: number,
      colIndex: number,
    ) => {
      const value = e.target.value;
      if (value.length > 1 || !/^[0-9]?$/.test(value)) {
        return;
      }
      setValue(faceIndex, rowIndex, colIndex, Number(e.target.value));
    };

    return (
      <div ref={ref} className={`flex flex-col absolute face`}>
        {face.map((row, rowIndex) => (
          <div key={Math.random()} className={"flex flex-row border"}>
            {row.map((cell, colIndex) => (
              <div
                key={Math.random()}
                className={`p-2 m-2 font-bold font-lg border`}
              >
                <input
                  className={"w-12 h-12 text-center text-2xl hover:shadow-lg"}
                  type={"text"}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  autoComplete={"off"}
                  maxLength={1}
                  onChange={(e) => {
                    onChange(e, faceIndex, rowIndex, colIndex);
                  }}
                  value={cell === 0 ? "" : cell}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
);
