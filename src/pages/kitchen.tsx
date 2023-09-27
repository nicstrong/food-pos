import Head from "next/head";
import { PageLayout } from "~/components/layout";
import css from "./index.module.scss";
import { KitchenDisplay } from "~/components/KitchenDisplay/KitchenDisplay";

export default function Kitchen() {

  return (
    <>
      <Head>
        <title>Kitchen Display System</title>
        <meta name="description" content="POS App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <KitchenDisplay />
      </PageLayout>
    </>
  );
}

