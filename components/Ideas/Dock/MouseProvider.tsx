import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { MotionValue, useMotionValue, useVelocity } from "framer-motion";

// Track mouse position as motion values
const useMousePosition = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  });

  return useMemo(
    () => ({
      x,
      y,
    }),
    [x, y]
  );
};

type Mouse = {
  position: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  velocity: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
};

const MouseContext = createContext<Mouse | null>(null);

// By using react context here, we can avoid spamming window
// with mouse listeners every time we use a mouse hook.
export const MouseProvider = ({ children }: { children: string }) => {
  const { x, y } = useMousePosition();
  const velocityX = useVelocity(x);
  const velocityY = useVelocity(y);

  const mouse = useMemo(
    () => ({
      position: {
        x,
        y,
      },
      velocity: {
        x: velocityX,
        y: velocityY,
      },
    }),
    [x, y, velocityX, velocityY]
  );

  return (
    <MouseContext.Provider value={mouse}>{children}</MouseContext.Provider>
  );
};

export const useMouse = () => {
  return useContext<Mouse>(MouseContext as Context<Mouse>);
};
