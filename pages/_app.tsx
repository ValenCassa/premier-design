import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { AnimatePresence } from "framer-motion";
import Scrollbar from "../components/Scrollbar/Scrollbar";
import Router, { useRouter } from "next/router";
import CommandButton, {
  CommandModalComponent,
} from "components/Resources/CommandButton";
import CommandContextProvider from "contexts/CommandContext";
import DockComponent from "components/Ideas/Dock";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const routeChange = () => {
    const tempFix = () => {
      const allStyleElems = document.querySelectorAll('style[media="x"]');
      allStyleElems.forEach((elem) => {
        elem.removeAttribute("media");
      });
    };
    tempFix();
  };

  Router.events.on("routeChangeComplete", routeChange);
  Router.events.on("routeChangeStart", routeChange);

  return (
    <CommandContextProvider>
      <CommandModalComponent />
      <Scrollbar />
      <Layout>
        <CommandButton />
        <AnimatePresence initial exitBeforeEnter>
          <Component {...pageProps} key={pathname} />
        </AnimatePresence>
      </Layout>
      <div id="dock-portal" />
    </CommandContextProvider>
  );
}

export default MyApp;
