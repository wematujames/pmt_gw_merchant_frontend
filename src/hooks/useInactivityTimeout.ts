import { useEffect, useRef, useCallback } from "react";

const useInactivityTimeout = (
  onTimeout: () => void,
  timeoutDuration: number = 3 * 60 * 1000
) => {
  const timeoutRef = useRef(null) as any;

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(onTimeout, timeoutDuration);
  }, [timeoutDuration, onTimeout]);

  useEffect(() => {
    const handleActivity = () => resetTimeout();

    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);
    document.addEventListener("click", handleActivity);

    resetTimeout();

    return () => {
      clearTimeout(timeoutRef.current);
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      document.removeEventListener("click", handleActivity);
    };
  }, [resetTimeout]);

  return null;
};

export default useInactivityTimeout;
