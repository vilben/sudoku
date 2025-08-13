import { useRouter } from "@tanstack/react-router";

export function useUpdateRoute(sudokuId: string) {
  const router = useRouter();

  return (sudokuProgress: string) => {
    const newPath = router.buildLocation({
      to: "/tanstack-sudoku/sudoku/$sudokuId/$sudokuProgress",
      params: { sudokuId, sudokuProgress },
    }).pathname;

    router.history.replace(newPath); // 🔥 Updates URL without navigation
  };
}
