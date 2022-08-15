import { useState } from "react";
import styles from "./styles/CodeEditor.module.css";
import { AnimatePresence, motion } from "framer-motion";
import CodeArrow from "public/svg/CodeArrow.svg";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Copy from "public/svg/Copy.svg";

export interface Content {
  code: string;
  tabName: string;
  language: string;
}

interface EditorAccordionProps {
  content: Content[];
}

interface TabProps {
  name: string;
  onClick: () => void;
  active: boolean;
}

const Tab = ({ name, onClick, active }: TabProps) => {
  const [hover, setHover] = useState(false);

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
        {hover ? (
          <motion.div
            layoutId="hoverTabEditor"
            className={styles.onHover}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const CodeBlock = ({
  language,
  content,
}: {
  language: string;
  content: string;
}) => {
  const [copy, setCopy] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(content);
    if (copy) return;
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

  return (
    <motion.div
      style={{
        position: "relative",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.codeBlock}
    >
      <AnimatePresence initial exitBeforeEnter>
        {copy ? (
          <motion.div
            className={styles.copyNotification}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <p className={styles.copied}>Copied to clipboard.</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <span className={styles.copy} onClick={onCopy}>
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
  );
};

const EditorAccordion = ({ content }: EditorAccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Content>(content[0]);

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
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.accordionContainer}
          >
            <div className={styles.tabs}>
              {content.map((tab, index) => (
                <Tab
                  key={index}
                  name={tab.tabName}
                  onClick={() => setActiveTab(tab)}
                  active={activeTab.tabName === tab.tabName}
                />
              ))}
            </div>

            <motion.div layout className={styles.editor}>
              <div className={"code"}>
                <div>
                  <CodeBlock
                    key={activeTab.tabName}
                    language={activeTab.language}
                    content={activeTab.code}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const CodeEditor = ({ content }: EditorAccordionProps) => {
  return (
    <motion.div className={styles.container}>
      <EditorAccordion content={content} />
    </motion.div>
  );
};

export default CodeEditor;
