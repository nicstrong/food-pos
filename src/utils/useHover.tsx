import { useCallback, useEffect, useRef, useState } from 'react'

export function useHover(delayMs = 400) {
  const timer = useRef<number>();
  const [hover, setHover] = useState(false);
  const nextHover = useRef(false);

  const restart = useCallback(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      timer.current = undefined;
      setHover(nextHover.current);
    }, delayMs);
  }, [delayMs]);

  useEffect(() => {
    if (timer.current !== undefined) {
      restart();
    }
  }, [restart]);

  const onMouseEnter = useCallback(() => {
    nextHover.current = true;
    restart();
  }, [restart]);

  const onMouseLeave = useCallback(() => {
    nextHover.current = false;
    restart();
  }, [restart]);

  const resetHover = useCallback(() => {
    window.clearTimeout(timer.current);
    setHover(false);
  }, []);

  return { hover, onMouseEnter, onMouseLeave, resetHover };
}
