import type { PropsWithChildren } from "react";
import css from './layout.module.scss';

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        {props.children}
      </div>
    </main>
  );
};