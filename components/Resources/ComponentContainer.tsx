import { CSSProperties, ReactNode } from "react";
import styles from './styles/ComponentContainer.module.css';

const ComponentContainer = ({ children, sx }: { children: ReactNode, sx?: CSSProperties }) => {
    return (
        <div className={styles.container} style={sx}>
            {children}
        </div>
    )
}

export default ComponentContainer;