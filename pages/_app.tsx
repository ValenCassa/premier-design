import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import { AnimatePresence } from 'framer-motion'
import Scrollbar from '../components/Scrollbar/Scrollbar'
import { useRouter } from 'next/router'
import CommandButton, { CommandModalComponent } from 'components/Resources/CommandButton'
import CommandContextProvider from 'contexts/CommandContext'

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()


  return (
    <CommandContextProvider>
      <CommandModalComponent />
      <Scrollbar />
      <Layout>
        <CommandButton />
        <AnimatePresence initial exitBeforeEnter>
          <Component {...pageProps} key={ pathname } />
        </AnimatePresence>
      </Layout>
    </CommandContextProvider>
  )
}

export default MyApp
