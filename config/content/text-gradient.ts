export const tsxContent = `import styles from './styles/TextGradient.module.css'

const TextGradient = () => {
    return (
        <p className={styles.gradient}>Pretty cool stuff</p>
    )
}

export default TextGradient`

export const cssContent = `.gradient {
    background: linear-gradient(94.71deg, #DEF59A -7.45%, #38C1C1 94.7%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-size: 30px;
    font-weight: 500;
}`