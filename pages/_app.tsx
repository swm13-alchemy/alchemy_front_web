import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import CssBaseline from '@mui/material/CssBaseline'
import { SessionProvider } from 'next-auth/react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoadingCircular from '../components/layout/LoadingCircular'
// import '@fortawesome/fontawesome-svg-core/styles.css' // import Font Awesome CSS
// import { config } from '@fortawesome/fontawesome-svg-core'
// config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  //
  // // 이벤트(유입, 이탈) 유형에 따라 조회수를 측정
  // useEffect(() => {
  //   const handleRouteChange = (url: any) => {
  //     // @ts-ignore
  //     // eslint-disable-next-line no-undef
  //     gtag.pageview(url)
  //   }
  //   router.events.on('routeChangeComplete', handleRouteChange)
  //   router.events.on('hashChangeComplete', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //     router.events.off('hashChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])

  // 페이지 이동 시 로딩 처리를 위한 부분
  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true))
    router.events.on('routeChangeComplete', () => setLoading(false))
    router.events.on('routeChangeError', () => setLoading(false))
    return () => {
      router.events.off('routeChangeStart', () => setLoading(true))
      router.events.off('routeChangeComplete', () => setLoading(false))
      router.events.off('routeChangeError', () => setLoading(false))
    }
  }, [])

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy='afterInteractive'
        src='https://www.googletagmanager.com/gtag/js?id=G-2SWBXTD4G9'
      />

      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2SWBXTD4G9', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      {/* App */}
      <Layout>
        <CssBaseline />
        <SessionProvider session={pageProps.session}>
          {loading ? (
            <LoadingCircular />
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
      </Layout>

    </>
  )
}

export default MyApp
