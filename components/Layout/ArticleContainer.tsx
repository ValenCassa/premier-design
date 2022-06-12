import { ReactNode } from "react";
import styles from './styles/ArticleContainer.module.css'
import { motion } from "framer-motion";

const ArticleContainer = ({ children }: { children: ReactNode }) => {
    return (
        <motion.article 
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}
            transition={{ duration: 0.2, type: 'easeInOut' }}
    
            >
            {children}
        </motion.article>
    )
}

export default ArticleContainer;