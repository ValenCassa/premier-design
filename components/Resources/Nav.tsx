import styles from './styles/Nav.module.css';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import NavArrow from 'public/svg/NavArrow.svg';

const Tabs = [
    'Home',
    'About',
    'Our work',
    'Contact',
]

interface TabProps {
    name: string;
    active: string;
    setActive: Dispatch<SetStateAction<string>>;
}

const Tab = ({ name, active, setActive }: TabProps) => {

    return (
        <div 
            className={styles.tab} 
                onClick={() => setActive(name)}
                >
            <div className={styles.name} id={active === name ? styles.colorActive : undefined}>
                <p>{name}</p>
            </div>
            {active === name
            ? <motion.div layoutId='activeNavTab' className={styles.active} />
            : null
            }
            
        </div>
    )
}

const Nav = () => {
    const [activeTab, setActiveTab] = useState(Tabs[0]);

    return (
        <nav className={styles.container}>
            <div className={styles.left}>
                <span className={styles.logo} />
                <div className={styles.tabs}>
                    {Tabs.map((tab, index) => (
                        <Tab name={tab} key={index} active={activeTab} setActive={setActiveTab} />
                    ))}
                </div>
            </div>
            <div className={styles.right}>
                <NavArrow />
            </div>
        </nav>
    )
}

export default Nav