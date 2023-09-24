import Head from "next/head";
import { PageLayout } from "~/components/layout";
import css from "./index.module.scss";
import { Pos } from "~/components/Pos/Pos";

export default function Home() {

  return (
    <>
      <Head>
        <title>Food POS</title>
        <meta name="description" content="POS App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <Pos />
      </PageLayout>
    </>
  );
}

