import { useEffect, useState } from 'react';
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
                        height: `${100 - (progress as number)}%`
                    }} />
                    <div className={styles.counter}><p className={styles.progress}>{Math.round(progress as number)}%</p></div>

                </div>
            </div>
        </div>
    )
}

export default Scrollbar