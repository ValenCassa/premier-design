import Command from 'public/svg/Command.svg'
import styles from './styles/CommandButton.module.css'

const CommandButton = () => {
    return (
        <div className={styles.command}>
            <Command />
        </div>        
    )
}

export default CommandButton