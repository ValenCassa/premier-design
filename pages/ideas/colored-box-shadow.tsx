import ColoredBoxShadow from "components/Ideas/ColoredBoxShadow";
import ArticleContainer from "components/Layout/ArticleContainer";
import CodeEditor from "components/Resources/CodeEditor";
import ComponentContainer from "components/Resources/ComponentContainer";
import Title from "components/Resources/Title";
import { NextPage } from "next";
import { content } from "config/content/colored-box-shadow";

const ColoredBoxShadowPage: NextPage = () => {
  return (
    <ArticleContainer
      meta={{
        title: "Colored Box Shadow",
        description: "A box shadow with a color gradient",
      }}
    >
      <Title title="Coloured Box Shadow" />
      <div className="shadow-container">
        <ComponentContainer>
          <ColoredBoxShadow />
        </ComponentContainer>
        <CodeEditor content={content} />
      </div>
      <div className="content-container">
        <p>
          This is a quite easy thing to do, but not so many people knows how to
          do. Change the linear-gradient to whatever you want, and you&apos;ll
          be able to make a nice box shadow.
        </p>
      </div>
    </ArticleContainer>
  );
};

export default ColoredBoxShadowPage;
