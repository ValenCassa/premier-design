import MainSection from 'components/MainSection/MainSection'
import type { NextPage } from 'next'
import { motion } from 'framer-motion'


const Home: NextPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, type: 'easeInOut' }}
    >
      <MainSection />
    </motion.div>
  )
}

export default Home
