import TextGradient from "components/Ideas/TextGradient";
import ArticleContainer from "components/Layout/ArticleContainer";
import CodeEditor from "components/Resources/CodeEditor";
import ComponentContainer from "components/Resources/ComponentContainer";
import Title from "components/Resources/Title";
import { NextPage } from "next";
import { content } from "config/content/text-gradient";

const GradientTextPage: NextPage = () => {
  return (
    <ArticleContainer
      meta={{
        title: "Gradient Text",
        description: "A text with a gradient",
      }}
    >
      <Title title="Gradient Text" />
      <div className="shadow-container">
        <ComponentContainer>
          <TextGradient />
        </ComponentContainer>
        <CodeEditor content={content} />
      </div>
      <div className="content-container">
        <p>
          This is really simple. The background-clip and the text-fill-color
          thing do what their names describe.
        </p>
      </div>
    </ArticleContainer>
  );
};

export default GradientTextPage;
