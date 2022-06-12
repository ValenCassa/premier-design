import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import { AnimatePresence } from 'framer-motion'
import Scrollbar from '../components/Scrollbar/Scrollbar'
import { useRouter } from 'next/router'
import CommandButton from 'components/Resources/CommandButton'

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  return (
    <>
    <Scrollbar />
    <Layout>
      <CommandButton />
      <AnimatePresence initial exitBeforeEnter>
        <Component {...pageProps} key={ pathname } />
      </AnimatePresence>
    </Layout>
    </>
  )
}

export default MyApp
