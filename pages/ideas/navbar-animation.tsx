import ArticleContainer from "components/Layout/ArticleContainer";
import CodeEditor from "components/Resources/CodeEditor";
import CodeMonoBlock from "components/Resources/CodeMonoBlock";
import ComponentContainer from "components/Resources/ComponentContainer";
import Nav from "components/Resources/Nav";
import Title from "components/Resources/Title";
import { LayoutGroup } from "framer-motion";
import { NextPage } from "next";

const exampleTsxCode = `const Tab = ({ name }: { name: string }) => {
    const [hover, setHover] = useState(false)

    return (
        <div className={styles.tab} 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
            >
            <p>{name}</p>
            <AnimatePresence initial exitBeforeEnter>
                {hover
                ? <motion.div 
                    layoutId='hoverTabEditor' 
                    className={styles.onHover} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    />
                : null
                }
            </AnimatePresence>
            
        </div>
    )
}`

const exampleCSSCode = `.tab {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}`

const NavbarAnimation: NextPage = () => {
    return (
        <ArticleContainer>
            <Title title="Navbar Animation"/>
            <div className="shadow-container">
                <ComponentContainer
                    sx={{
                        background: 'linear-gradient(254.44deg, #5E63C4 -1.59%, #8CA1D7 100.92%)'
                    }}
                >
                    <Nav />
                </ComponentContainer>
                <CodeEditor 
                    content={{
                        tsxContent: {
                            code: exampleTsxCode,
                            tabName: 'Nav.tsx'
                        },
                        cssContent: {
                            code: exampleCSSCode,
                            tabName: 'Nav.module.css'
                        }
                    }}
                />
            </div>
            <div className="content-container">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti facere hic, natus recusandae non eius a mollitia laudantium quis ad cupiditate velit eligendi, quasi aliquam magni quisquam? Molestiae illum placeat dolore, quos, adipisci modi dolores repellendus tempore blanditiis animi alias.</p>
                    <CodeMonoBlock content="npm install framer-motion --save-dev" />
            </div>
        </ArticleContainer>
    )
}

export default NavbarAnimation;