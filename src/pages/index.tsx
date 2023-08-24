import Head from "next/head";
import { Order } from "~/components/Order";
import { PosItems } from "~/components/PosItems";
import { PageLayout } from "~/components/layout";
import css from "./index.module.scss";

export default function Home() {
  
  return (
    <>
      <Head>
        <title>Food POS</title>
        <meta name="description" content="POS App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div className={css.content}>
          <nav className={css.nav}></nav>
          <div className={css.items}>
            <PosItems />
          </div>
          <div className={css.order}>
            <Order/>
          </div>
        </div>
      </PageLayout>
    </>
  );
}

