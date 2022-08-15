import { Content } from "components/Resources/CodeEditor";

const MouseProviderCode = `import React, {
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
  
`;

const DockCode = `
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

const MotionBox = motion(Box);

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

`;

const GradientCardCode = `/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Dock.module.css";

const GradientCard = ({ src }: { src: string }) => {
  return (
    <div className={styles.gradientCard}>
      <img src={src} alt="gradient" className={styles.gradientImage} />
      <img src={src} alt="gradient" className={styles.gradientImageBehind} />
    </div>
  );
};

export default GradientCard;

`;

const HStackCode = `import { CSSProperties, forwardRef, HTMLAttributes, ReactNode } from "react";
import styles from "../styles/Dock.module.css";

interface HStackProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  sx?: CSSProperties;
}

const HStack = forwardRef<HTMLDivElement, HStackProps>((props, ref) => {
  const { children, sx, ...rest } = props;
  return (
    <div className={styles.hStack} ref={ref} style={sx} {...rest}>
      {children}
    </div>
  );
});

HStack.displayName = "HStack";

export default HStack;

`;

const IndexCode = `import { MouseProvider } from "./MouseProvider";
import { Dock, DockItem } from "./Dock";
import GradientCard from "./GradientCard";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const DockComponent = () => {
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  if (!domReady) return <></>;

  return createPortal(
    <MouseProvider>
      <Dock>
        <DockItem>
          <GradientCard src="https://products.ls.graphics/mesh-gradients/images/33.-Beauty-Bush.jpg" />
        </DockItem>
        <DockItem>
          <GradientCard src="https://products.ls.graphics/mesh-gradients/images/32.-Banana-Mania.jpg" />
        </DockItem>
        <DockItem>
          <GradientCard src="https://products.ls.graphics/mesh-gradients/images/01.-Royal-Heath.jpg" />
        </DockItem>
        <DockItem>
          <GradientCard src="https://products.ls.graphics/mesh-gradients/images/29.-Pale-Cornflower-Blue_1.jpg" />
        </DockItem>
        <DockItem>
          <GradientCard src="https://products.ls.graphics/mesh-gradients/images/05.-Flax.jpg" />
        </DockItem>
        <DockItem>
          <GradientCard src="https://products.ls.graphics/mesh-gradients/images/07.-Tidal.jpg" />
        </DockItem>
        <DockItem>
          <GradientCard src="https://products.ls.graphics/mesh-gradients/images/23.-California_1.jpg" />
        </DockItem>
      </Dock>
    </MouseProvider>,
    document.getElementById("dock-portal")
  );
};

export default DockComponent;

`;

const stylesCode = `.gradientCard {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    .gradientImage {
      position: absolute;
      border-radius: 100%;
      transform: translateY(10px) scale(1.25);
      z-index: 0;
      filter: blur(10px);
      opacity: 0.2;
      width: 40%;
      aspect-ratio: 1;
    }
  
    .gradientImageBehind {
      border-radius: 100%;
      width: 40%;
      aspect-ratio: 1;
    }
  }
  
  .hStack {
    display: flex;
  }
  
  .dockItem {
    background-color: #2d2d2d;
    cursor: pointer;
    border-radius: 10px;
    filter: saturate(0.9) brightness(0.9);
    border: 1px solid #464646;
    transition: filter 0.3s;
    overflow: hidden;
  
    &:hover {
      filter: saturate(1) brightness(1.12);
    }
  }
  
`;

export const content: Content[] = [
  {
    tabName: "Dock.tsx",
    code: DockCode,
    language: "tsx",
  },
  {
    tabName: "HStack.tsx",
    code: HStackCode,
    language: "tsx",
  },
  {
    tabName: "GradientCard.tsx",
    code: GradientCardCode,
    language: "tsx",
  },
  {
    tabName: "MouseProvider.tsx",
    code: MouseProviderCode,
    language: "tsx",
  },
  {
    tabName: "index.tsx",
    code: IndexCode,
    language: "tsx",
  },
  {
    tabName: "Dock.module.css",
    code: stylesCode,
    language: "css",
  },
];
