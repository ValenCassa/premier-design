import styles from './styles/Title.module.css';
import ArrowBack from 'public/svg/ArrowBack.svg'
import { useRouter } from 'next/router';

const Title = ({ title }: { title: string }) => {
    const { push } = useRouter()

    return (
        <div>
            <span className={styles.arrow} onClick={() => push('/')}>
                <ArrowBack />
            </span>
            <h1 className={styles.title}>
                {title}
            </h1>
        </div>
    )
}

export default Title