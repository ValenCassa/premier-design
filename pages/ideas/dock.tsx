import ArticleContainer from "components/Layout/ArticleContainer";
import ComponentContainer from "components/Resources/ComponentContainer";
import Title from "components/Resources/Title";
import { NextPage } from "next";
import DockComponent from "components/Ideas/Dock";
import CodeEditor from "components/Resources/CodeEditor";
import { content } from "config/content/dock";

const DockPage: NextPage = () => {
  return (
    <>
      <ArticleContainer
        meta={{
          title: "Dock",
          description: "Apple style dock",
        }}
      >
        <Title title="Dock" />
        <div className="shadow-container">
          <ComponentContainer>See dock on the bottom</ComponentContainer>
          <CodeEditor content={content} />
        </div>
      </ArticleContainer>
      <DockComponent />
    </>
  );
};

export default DockPage;
