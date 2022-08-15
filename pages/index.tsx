import MainSection from "components/MainSection/MainSection";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import Meta from "components/Resources/Meta";

const Home: NextPage = () => {
  return (
    <>
      <Meta
        title="Premier Design"
        description="Premier is a website where you can find ideas for your designs and guidance for your development."
        homepage
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, type: "easeInOut" }}
      >
        <MainSection />
      </motion.div>
    </>
  );
};

export default Home;
