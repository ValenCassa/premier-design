import { Content } from "components/Resources/CodeEditor";

const tsxContent = `import { useEffect, useState } from 'react';
import styles from './styles/Scrollbar.module.css';

const Scrollbar = () => {
    const [progress, setProgress] = useState<number>(0)

    const onScroll = () => {
        const docHeight = document.documentElement.scrollHeight
        const windowHeight = document.documentElement.clientHeight
        const scrollTop = document.documentElement.scrollTop
        const progress = scrollTop === 0 ? 0 : (scrollTop / (docHeight - windowHeight)) * 100
        setProgress(progress === NaN ? 0 : progress)

    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [progress])

    return (
        <div 
            className={styles.scrollbarContainer}
            >
            <div className={styles.container}>
                <div className={styles.percent}>
                    <div className={styles.fill} style={{
                        height: \`\${100 - (progress as number)}%\`
                    }} />
                    <div className={styles.counter}><p className={styles.progress}>{Math.round(progress as number)}%</p></div>

                </div>
            </div>
        </div>
    )
}

export default Scrollbar`;

const cssContent = `.scrollbarContainer {
    position: fixed;
    pointer-events: none;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    z-index: 99999;


    .container {
        width: 100%;
        height: 100%;
        padding-right: 3em;
        display: flex;
        align-items: center;
    }

    .percent {
        position: relative;
        margin-left: auto;
        margin-right: 0em;
        height: 140px;
    }

    .counter {
        position: absolute;
        font-size: 16px;
        color: white;
        transform: translateX(-3em);
    }
    
}


.counter {
    width: 3px;
    height: 100%;
}

.fill {
    position: absolute;
    top: 0;
    width: 1px;
    height: 100%;
    background: #464646;
    transition: background 0.15s ease;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 140px;
        background: white;
        transform: rotate(180deg);
        z-index: -1;
    }
}

@media only screen and (max-width: 950px) {
    .scrollbarContainer {
        display: none;
    }
}`;

export const content: Content[] = [
  {
    code: tsxContent,
    language: "tsx",
    tabName: "Scrollbar.tsx",
  },
  {
    code: cssContent,
    language: "css",
    tabName: "Scrollbar.module.css",
  },
];
