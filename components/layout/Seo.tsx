import Head from "next/head";

interface Props {
  title: string;
}

function Seo({ title }: Props) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}

export default Seo;