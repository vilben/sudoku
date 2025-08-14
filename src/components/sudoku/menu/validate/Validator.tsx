import { Button } from "~/components/ui/button";
import { useCallback } from "react";
import { isValidSudoku } from "~/components/sudoku/menu/validate/validate.utils";
import { toast } from "sonner";
import { useSudokuContext } from "~/components/sudoku/hooks/useSudokuContext";

export const Validator = () => {
  const { grid, showErrors, setShowErrors } = useSudokuContext();

  const validate = useCallback(() => {
    const isValid = isValidSudoku(grid);
    showToast(isValid);
    setShowErrors(!isValid);
  }, [grid]);

  const hideErrors = () => {
    setShowErrors(false);
  };

  const showToast = (isValid: boolean) => {
    const t = isValid ? toast.success : toast.error;
    t(`Sudoku is ${isValid ? "valid" : "invalid"}`, {
      position: "top-right",
      cancel: {
        label: "Hide",
        onClick: () => {},
      },
    });
  };

  return (
    <>
      {!showErrors && (
        <Button variant={"default"} onClick={validate}>
          Check Errors
        </Button>
      )}
      {showErrors && (
        <Button variant={"destructive"} onClick={hideErrors}>
          Hide Errors
        </Button>
      )}
    </>
  );
};
