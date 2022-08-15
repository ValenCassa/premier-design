import { motion, useSpring, useTransform } from "framer-motion";
import {
  useState,
  useRef,
  useEffect,
  useContext,
  ReactNode,
  createContext,
  Context,
} from "react";
import HStack from "./HStack";
import { useMouse } from "./MouseProvider";
import styles from "../styles/Dock.module.css";

type DockApi = {
  hovered: boolean;
  width: number | undefined;
};

const DockContext = createContext<DockApi | null>(null);

const useDock = () => {
  return useContext<DockApi>(DockContext as Context<DockApi>);
};

export const Dock = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [width, setWidth] = useState<number | undefined>();

  useEffect(() => {
    setWidth(ref.current?.clientWidth);
  }, []);

  return (
    <DockContext.Provider value={{ hovered, width }}>
      <HStack
        ref={ref}
        sx={{
          position: "fixed",
          bottom: "0.5em",
          left: "50%",
          transform: "translateX(-50%)",
          alignItems: "flex-end",
          borderRadius: "10px",
          padding: "0.6em 0.8em",
          willChange: "contents",
          boxSizing: "content-box",
          gap: "1em",
          height: "48px",
          backgroundColor: "#212121",
          border: "1px solid #464646",
        }}
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseOut={() => {
          setHovered(false);
        }}
      >
        {children}
      </HStack>
    </DockContext.Provider>
  );
};

export const DockItem = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useMouse();
  const dock = useDock();
  const [elCenterX, setElCenterX] = useState<number | null>(null);

  const dimension = useTransform(mouse.position.x, (mouseX) => {
    return (
      48 +
      36 *
        Math.cos(
          (((mouseX - (elCenterX as number)) / (dock.width as number)) *
            Math.PI) /
            2
        ) **
          12
    );
  });

  const spring = useSpring(48, {
    damping: 10,
    stiffness: 150,
    mass: 0.01,
  });

  useEffect(() => {
    return dimension.onChange((val) => {
      if (dock.hovered) {
        spring.set(val);
      } else {
        spring.set(48);
      }
    });
  }, [spring, dimension, dock.hovered]);

  useEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    setElCenterX((rect?.x as number) + (rect?.width as number) / 2);
  }, []);

  useEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    const fn = () =>
      setElCenterX((rect?.x as number) + (rect?.width as number) / 2);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  });

  return (
    <motion.div
      ref={ref}
      className={styles.dockItem}
      style={{
        width: spring,
        height: spring,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Dock;
