import styles from './styles/CodeMonoBlock.module.css';


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

export default CodeMonoBlock