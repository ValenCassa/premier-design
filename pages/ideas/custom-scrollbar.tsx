import ArticleContainer from "components/Layout/ArticleContainer"
import CodeEditor from "components/Resources/CodeEditor"
import ComponentContainer from "components/Resources/ComponentContainer"
import Title from "components/Resources/Title"
import { NextPage } from "next"
import * as content from "config/content/custom-scrollbar"

const CustomScrollbar: NextPage = () => {
    return (
        <ArticleContainer
            meta={{
                title: "Custom Scrollbar",
                description: "How to customize the scrollbar"
            }}
        >
            <Title title="Custom Scrollbar" />
            <div className="shadow-container">
                <ComponentContainer>
                    <p>See the scrollbar on the right side</p>
                </ComponentContainer>
                <CodeEditor 
                    content={{
                        tsxContent: {
                            code: content.tsxContent,
                            tabName: "Scrollbar.tsx"
                        },
                        cssContent: {
                            code: content.cssContent,
                            tabName: "Scrollbar.module.css"
                        }
                    }}
                />
            </div>
            <div className="content-container">
                <p>You will also have to deactivate the scrollback of the html. The onScroll function detects the progress of the scroll related to the size of the body. Then, the useEffect just listens to that function when you scroll. The height of the fill depends on the progress state.</p>
            </div>
        </ArticleContainer>
    )
}

export default CustomScrollbar