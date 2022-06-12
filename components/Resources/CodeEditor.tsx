import { useState } from 'react'
import styles from './styles/CodeEditor.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import CodeArrow from 'public/svg/CodeArrow.svg'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Copy from 'public/svg/Copy.svg'

interface Content {
    code: string;
    tabName: string;
}

interface EditorAccordionProps {
    cssContent: Content;
    tsxContent: Content;
}

interface TabProps {
    name: string;
    onClick: () => void;
    active: boolean;
}

const Tab = ({ name, onClick, active }: TabProps) => {
    const [hover, setHover] = useState(false)

    return (
        <div 
            className={styles.tab} 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
            onClick={onClick}
            id={!active ? styles.inactive : undefined}
            >
            <p>{name}</p>
            <AnimatePresence initial exitBeforeEnter>
                {hover
                ? <motion.div 
                    layoutId='hoverTabEditor' 
                    className={styles.onHover} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    />
                : null
                }
            </AnimatePresence>
            
        </div>
    )
}

const CodeBlock = ({ language, content }: { language: string, content: string }) => {
    const [copy, setCopy] = useState(false)

    const onCopy = () => {
        navigator.clipboard.writeText(content)
        if (copy) return
        setCopy(true)
        setTimeout(() => setCopy(false), 2000)
    }
    
    return (
        <motion.div
        style={{
            position: 'relative'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
            <AnimatePresence initial exitBeforeEnter>
                {copy
                ? (
                    <motion.div 
                        className={styles.copyNotification}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.3
                        }}
                        >
                        <p className={styles.copied}>Copied to clipboard.</p>
                    </motion.div>
                )
                :null
                }
            </AnimatePresence>
            <span 
                className={styles.copy}
                onClick={onCopy}
                >
                <Copy />
            </span>
            <SyntaxHighlighter
                language={language}
                useInlineStyles
                showLineNumbers={true}
                style={nord}

            >
                {content}
            </SyntaxHighlighter>            
        </motion.div>
    )
}


const EditorAccordion =  ({ tsxContent, cssContent }: EditorAccordionProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<string>('tsx')

    return (
        <div>
            <motion.div 
                className={styles.accordion}
                onClick={() => setIsOpen(!isOpen)}
                
                >
                    <span className={styles.arrow} id={isOpen ? styles.opened : undefined}>
                        <CodeArrow />
                    </span>
                    <p>Code Editor</p>  
            </motion.div>
            
            <AnimatePresence initial exitBeforeEnter>
                
                {isOpen
        
                    ? (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className={styles.tabs}>
                                <Tab 
                                    name={tsxContent.tabName} 
                                    onClick={() => setActiveTab('tsx')}
                                    active={activeTab === 'tsx'} 
                                    />
                                <Tab 
                                    name={cssContent.tabName}
                                    onClick={() => setActiveTab('css')}
                                    active={activeTab === 'css'}
                                />
                            </div>
                        
                        <motion.div
                            layout
                            className={styles.editor}
                        >
                            <div className={'code'}>
                                
                                <div >
                                {activeTab === 'tsx' 
                                
                                    ?   <CodeBlock key={'ts'} language='typescript' content={tsxContent.code} /> 
                                    :   <CodeBlock key={'css'} language='scss' content={cssContent.code} />                                      
                                }
                                </div>
                               

                            </div>
                            
                        </motion.div>
                        </motion.div>
                    )
                        : null
                    }
                 
            </AnimatePresence>
           
        </div>  
    )
}

const CodeEditor = ({ content }: { content: EditorAccordionProps }) => {
    return (
        <motion.div className={styles.container}>
            <EditorAccordion
                tsxContent={content.tsxContent}
                cssContent={content.cssContent} 
                />
        </motion.div>
    )
}

export default CodeEditor