import { ReactNode } from "react";
import styles from './styles/ArticleContainer.module.css'
import { motion } from "framer-motion";
import Meta from "components/Resources/Meta";

interface Meta {
    title: string;
    description: string;
}

const ArticleContainer = ({ children, meta }: { children: ReactNode, meta: Meta }) => {
    return (
        <>
        <Meta 
            title={meta.title}
            description={meta.description}
        />
        <motion.article 
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}
            transition={{ duration: 0.2, type: 'easeInOut' }}
    
            >
            {children}
        </motion.article>
        </>
    )
}

export default ArticleContainer;