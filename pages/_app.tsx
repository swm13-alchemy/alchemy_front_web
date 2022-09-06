import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@fortawesome/fontawesome-svg-core/styles.css' // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core'
import Layout from '../components/layout/Layout'
import CssBaseline from '@mui/material/CssBaseline'
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <CssBaseline />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
