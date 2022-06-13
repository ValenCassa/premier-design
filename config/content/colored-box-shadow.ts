export const tsxContent = `import styles from './styles/ColoredBoxShadow.module.css';

const ColoredBoxShadow = () => {
    return (
        <div className={styles.container}>
            <p>Pretty cool stuff</p>
        </div>
    )
}

export default ColoredBoxShadow`

export const cssContent = `.container {
    position: relative;
    padding: 3em 7em;
    background-color: rgb(247, 247, 247);
    border-radius: 3px;
    transform-style: preserve-3d;
    color: black;
    font-weight: 500;
    font-size: 15px;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(103.53deg, #F4F4F4 -9.33%, #BA5CD1 -9.32%, #5C77D8 40.97%, #2D2BA0 104.42%);
        filter: blur(36px);
        border-radius: 3px;
        transform: translateZ(-1px)
    }
}`

