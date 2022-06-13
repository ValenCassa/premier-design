import SyntaxHighlighter from 'react-syntax-highlighter';
import styles from './styles/CodeMonoBlock.module.css';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs';


const CodeMonoBlock = ({ content }: { content: string }) => {
    const slashIndex = content.indexOf('--') - 1
    const code = content.slice(0, slashIndex)
    const comment = content.slice(slashIndex)

    return (
        <div className={`${styles.container}`} id={styles.monoblock}>
            <p>{code}<span>{comment}</span></p>
        </div>
    )
}

export const CodeBlock = ({ code, language }: { code: string, language: string }) => {
    return (
        <div className={`${styles.container} code`} id={styles.monoblock}>
            <SyntaxHighlighter 
                language={language} style={nord}
                customStyle={{
                    margin: '0',
                }}
                >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

export default CodeMonoBlock