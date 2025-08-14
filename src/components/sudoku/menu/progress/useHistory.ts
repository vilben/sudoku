import { useRouter } from "@tanstack/react-router";
import { useCallback, useState } from "react";

export const useHistory = () => {
  const router = useRouter();
  const [initialPath] = useState(router.history.location.pathname);
  const [highestHistoryState, setHighestHistoryState] = useState(
    router.history.location.state.__TSR_index,
  );

  const handleBackward = useCallback(() => {
    router.history.back();
  }, [router.history]);

  const handleForward = useCallback(() => {
    router.history.forward();
    const newState = router.history.location.state.__TSR_index;
    if (newState > highestHistoryState) {
      setHighestHistoryState(router.history.location.state.__TSR_index);
    }
  }, [router.history.location.state.__TSR_index]);

  const canGoForward = () => {
    const currentState = router.history.location.state.__TSR_index;
    if (currentState > highestHistoryState) {
      setHighestHistoryState(router.history.location.state.__TSR_index);
    }
    return currentState < highestHistoryState;
  };

  const isBackwardDisabled = useCallback(
    () =>
      router.history.location.pathname === initialPath ||
      !router.history.canGoBack(),
    [router.history.location],
  );

  const isForwardDisabled = useCallback(
    () => !canGoForward(),
    [canGoForward, router.history],
  );

  return {
    isForwardDisabled,
    isBackwardDisabled,
    handleBackward,
    handleForward,
  };
};
