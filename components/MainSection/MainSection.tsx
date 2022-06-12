import styles from './styles/MainSection.module.css';
import TabsContextProvider from 'contexts/TabsContext';
import type { Item } from 'types/Item';
import { useItem } from 'hooks/useItem';
import { useRouter } from 'next/router';
import Design from 'public/svg/Design.svg'

const items: Item[] = [
    {
        title: 'Navbar Animation',
        date: 'June 10, 2022',
        href: 'navbar-animation'
    },
    {
        title: 'Toasts',
        date: 'June 10, 2022',
        href: 'toasts'
    },
    {
        title: 'Coloured Box Shadow',
        date: 'June 10, 2022',
        href: 'colored-box-shadow'
    }
]

const Item = ({ item, index }: { item: Item, index: number }) => {
    const { activeItem, setActiveItem } = useItem()
    const realIndex = index + 1
    const itemActiveClass = activeItem ? (activeItem === item.title ? undefined : styles.inactive) : undefined
    const { push } = useRouter()

    const onMouseEnter = () => {
        setActiveItem(item.title)
    }

    const onMouseLeave = () => {
        setActiveItem(undefined)
    }

    return (
        <tr 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={styles.row}
            onClick={() => push(`/ideas/${item.href}`)}
            >
            <td className={styles.content}>
                <div className={styles.left}>
                    <p className={styles.index}>
                        {realIndex >= 10 ? realIndex : '0' + realIndex}
                    </p>
                    <p
                        id={itemActiveClass}
                        className={styles.title}
                    >
                        {item.title}
                    </p>
                </div>
                <div className={styles.right}>
                    <p className={styles.date}>
                        {item.date}
                    </p>
                </div>
            </td>
        </tr>
    )
}

const Items = () => {
    
    return (
        <table className={styles.items}>
            <tbody>
                {items.map((item, index) => (
                    <Item item={item} index={index} key={index} />
                ))}
            </tbody>
        </table>
    )
}

const MainSection = () => {

    return (
        <section>
            <div className={styles.mainSection}>
                <div className={styles.mainSection__title}>
                    <h1>
                        Premier <Design /><span>by <a className={styles.me} target='_blank' rel='noreferrer' href='https://twitter.com/devcassa'>@devCassa</a></span></h1>
                </div>
                <div className={styles.mainSection__description}>
                   <p>Premier is a website where you can find <span>ideas</span> for your designs and <span>guidance</span> for your development.</p>
                </div>
            </div>
            <div className={styles.ideas}>
                <h3 className={styles.ideas__title}>The ideas</h3>
            </div>
            <div className={styles.tabsContainer}>
                <TabsContextProvider>
                    <Items />
                </TabsContextProvider>
            </div>
        </section>
    )
}

export default MainSection