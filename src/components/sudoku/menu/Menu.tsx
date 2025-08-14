import { HistoryButtons } from "./progress/HistoryButtons";
import { Validator } from "~/components/sudoku/menu/validate/Validator";

export const Menu = () => {
  return (
    <div className={"flex justify-center gap-4"}>
      <HistoryButtons />
      <Validator />
    </div>
  );
};
