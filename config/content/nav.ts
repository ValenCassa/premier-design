import { Content } from "components/Resources/CodeEditor";

export const tsxCode = `import styles from './styles/Nav.module.css';
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
            <div 
                className={styles.name} 
                id={active === name ? styles.colorActive : undefined}
                >
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
                        <Tab 
                            name={tab} 
                            key={index} 
                            active={activeTab} 
                            setActive={setActiveTab} 
                            />
                    ))}
                </div>
            </div>
            <div className={styles.right}>
                <NavArrow />
            </div>
        </nav>
    )
}

export default Nav`;

export const cssCode = `.container {
    position: relative;
    max-width: 80%;
    width: 100%;
    background-color: white;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
   color: black;
    padding: 0 0.6em;
    box-shadow: -86px -18px 35px rgba(0, 0, 0, 0.01), -48px -10px 30px rgba(0, 0, 0, 0.05), -21px -5px 22px rgba(0, 0, 0, 0.09), -5px -1px 12px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);

    .left {
        display: flex;
        align-items: center;

        .logo {
            margin: 0.6em 0;
            width: 5px;
            height: 28px;
            background: linear-gradient(182.88deg, #4194E0 -47.69%, #265082 97.61%);
            border-radius: 3px 0px 3px 0px;
        }

        .tabs {
            margin-left: 1.5em;
            display: flex;
            padding-top: 0.2em;

            .tab {
                position: relative;
                cursor: pointer;
                .name {
                    position: relative;
                    z-index: 3;
                    padding-top: 0.1em;
                    font-size: 15px;
                    font-weight: 500;
                    transition: color 0.2s ease-in-out;

                    &:hover {
                        color: #4194E0;
                    }
                }
            }
        }

        .tabs > * + * {
            margin-left: 1em;
        }
    }
}

.name#colorActive {
    color: #2C6BA4;
}

.active {
    position: absolute;
    background: linear-gradient(180deg, #3582C9 -50%, #155087 133.33%);
    width: 100%;
    height: 4px;
    bottom: -0.8em;
    border-radius: 2px 2px 0px 0px;
    
}`;

export const activeTab = `import { useRouter } from 'next/router';

/* rest of the code */

const Tabs = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'About',
        href: '/about'
    },
    {
        name: 'Our work',
        href: '/our-work'
    },
    {
        name: 'Contact',
        href: '/contact'
    }
]

const Nav = () => {
/* const [activeTab, setActiveTab] = useState(Tabs[0]); */

const { pathname } = useRouter();

return (
    <nav className={styles.container}>
        <div className={styles.left}>
            <span className={styles.logo} />
            <div className={styles.tabs}>
                {Tabs.map((tab, index) => {
                    const activeTab = pathname === tab.href;
                    return (
                    <Tab 
                        name={tab.name} 
                        key={index} 
                        active={activeTab} 
                        />
                )})}
            </div>
        </div>
        <div className={styles.right}>
            <NavArrow />
        </div>
    </nav>
    )
}`;

export const content: Content[] = [
  {
    code: tsxCode,
    language: "tsx",
    tabName: "Nav.tsx",
  },
  {
    code: cssCode,
    language: "css",
    tabName: "Nav.module.css",
  },
];
