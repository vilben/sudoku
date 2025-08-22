import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import "./Sudoku3DStyles.css";
import { Slider } from "~/components/ui/slider";
import {
  Microscope,
  MoveDiagonal,
  MoveHorizontal,
  MoveLeft,
  MoveRight,
  MoveVertical,
} from "lucide-react";
import { Sudoku3DFace } from "~/components/sudoku/3d/Sudoku3DFace";
import { ThreeDGrid } from "~/lib/3D/sudoku3D.types";
import { useSudoku3D } from "~/components/sudoku/3d/useSudoku3D";

export const Sudoku3DComponent = ({
  N,
  threeDGrid,
}: {
  N: number;
  threeDGrid: ThreeDGrid;
}) => {
  const { currentGrid, setCellValue } = useSudoku3D(threeDGrid);

  const FACES = [...Array(N).keys()];

  const faceRefs = useRef<HTMLDivElement[]>([]);
  const [visibleFace, setVisibleFace] = useState<number>(0);
  const [xRotation, setXRotation] = useState<number>(15);
  const [yRotation, setYRotation] = useState<number>(30);
  const [translation, setTranslation] = useState<number>(5);
  const [opacity, setOpacity] = useState<number>(50);

  useEffect(() => {
    faceRefs.current.forEach((faceRef, index) => {
      const offset = index - visibleFace;
      const faceNo = offset < 0 ? FACES.length + offset : offset;

      const op =
        faceNo === 0
          ? 1
          : faceNo === 1
            ? opacity / 100
            : Math.pow((opacity * 0.8) / 100, faceNo);

      faceRef.style.transform = `translateZ(${-faceNo * translation * 2}rem)`; // only depth
      faceRef.style.opacity = op.toString();
      faceRef.style.zIndex = (faceRefs.current.length - faceNo).toString();
    });
  }, [visibleFace, FACES.length, opacity, translation]);

  const setValueInGrid = useCallback(
    (i: number, j: number, k: number, v: number) => {
      setCellValue(i, j, k, v);
    },
    [setCellValue],
  );

  const renderFaces = useMemo(() => {
    return (
      <>
        {currentGrid.map((face, index) => (
          <Sudoku3DFace
            ref={(el) => {
              faceRefs.current[index] = el!;
            }}
            key={`z-${face}${index}`}
            face={face}
            faceIndex={index}
            setValue={setValueInGrid}
            initialGrid={threeDGrid}
          />
        ))}
      </>
    );
  }, [currentGrid, setValueInGrid]);

  const changeVisibleFace = (dir: boolean) => {
    if (dir) {
      setVisibleFace((c) => (c === N - 1 ? 0 : c + 1));
    } else {
      setVisibleFace((c) => (c === 0 ? N - 1 : c - 1));
    }
  };

  return (
    <div className={"flex flex-col w-full h-full justify-center items-center"}>
      <div
        className="sudoku-cube-wrapper"
        style={{
          width: `${(N + 1) * 5}rem`,
          height: `${(N + 1) * 5}rem`,
          position: "relative",
        }}
      >
        <div
          className={`sudoku-container flex flex-col justify-center`}
          style={{
            transform: `rotateX(${-1 * xRotation}deg) rotateY(${-1 * yRotation}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.3s",
          }}
        >
          {renderFaces}
        </div>
      </div>

      <div className={"flex flex-col gap-2 w-64 z-50"}>
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
        <label className={"flex gap-2"}>
          <Microscope />
          <Slider
            min={0}
            defaultValue={[50]}
            max={100}
            step={1}
            onValueChange={(v) => setOpacity(v[0])}
          />
        </label>
      </div>
    </div>
  );
};
