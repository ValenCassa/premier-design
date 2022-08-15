import ArticleContainer from "components/Layout/ArticleContainer";
import CodeEditor from "components/Resources/CodeEditor";
import CodeMonoBlock, { CodeBlock } from "components/Resources/CodeMonoBlock";
import ComponentContainer from "components/Resources/ComponentContainer";
import Nav from "components/Ideas/Nav";
import Title from "components/Resources/Title";
import { NextPage } from "next";
import { content, activeTab } from "config/content/nav";

const NavbarAnimation: NextPage = () => {
  return (
    <ArticleContainer
      meta={{
        title: "Navbar Animation",
        description: "Animate the navbar",
      }}
    >
      <Title title="Navbar Animation" />
      <div className="shadow-container">
        <ComponentContainer
          sx={{
            background:
              "linear-gradient(254.44deg, #5E63C4 -1.59%, #8CA1D7 100.92%)",
          }}
        >
          <Nav />
        </ComponentContainer>
        <CodeEditor content={content} />
      </div>
      <div className="content-container">
        <p>
          This is a simple navbar animation. You can also achieve this effect
          with native Js, but I always use framer-motion in my projects so
          it&apos;s easier for me to do it this way:
        </p>
        <CodeMonoBlock content="npm install framer-motion --save-dev" />
        <p>
          You can use whichever arrow icon you want, you do not have to worry
          about that.
          <br />
          You may want to change the way the active condition works, since now
          it&apos;s not working as a navbar, it has no links. For example, you
          might want a tab to be active when its title is equal to the route you
          are in, so the Nav component could be like this:
        </p>
        <CodeBlock code={activeTab} language="tsx" />
        <p>
          You may also want to change the onClick event on the Tab component,
          since now it is setting a state. Just remove the setState thing and
          make it push to a route.
        </p>
        <p>
          If you are wondering how it works, framer-motion uses the layoutId
          param to &quot;link&quot; components, so, when the component tries to
          unmount, it will do the animation instead, it is the same component,
          so it does not trigger a re-render.{" "}
        </p>
      </div>
    </ArticleContainer>
  );
};

export default NavbarAnimation;
