import { CSSProperties, forwardRef, HTMLAttributes, ReactNode } from "react";
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
