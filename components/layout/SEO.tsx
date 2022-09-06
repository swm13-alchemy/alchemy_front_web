import Head from 'next/head'

interface Props {
  title: string
}

function SEO({ title }: Props) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default SEO
