import Document, { Head, Html, Main, NextScript } from 'next/document'
import ServerStyleSheets from '@mui/styles/ServerStyleSheets'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap'
            rel='stylesheet'
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"
            rel="stylesheet"
          />
          <link
            href='/favicon.ico'
            rel='shortcut icon'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const materialSheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => materialSheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)
  return {
    ...initialProps,
    styles: <>{initialProps.styles}</>
  }
}