import { Button } from "~/components/ui/button";
import { useHistory } from "~/components/sudoku/menu/progress/useHistory";

export const HistoryButtons = () => {
  const {
    isForwardDisabled,
    isBackwardDisabled,
    handleBackward,
    handleForward,
  } = useHistory();
  return (
    <>
      <Button
        variant={"default"}
        size={"icon"}
        disabled={isBackwardDisabled()}
        onClick={handleBackward}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-undo-icon lucide-undo"
        >
          <path d="M3 7v6h6" />
          <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
        </svg>
      </Button>
      <Button
        variant={"default"}
        size={"icon"}
        disabled={isForwardDisabled()}
        onClick={handleForward}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-redo-icon lucide-redo"
        >
          <path d="M21 7v6h-6" />
          <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
        </svg>
      </Button>
    </>
  );
};
