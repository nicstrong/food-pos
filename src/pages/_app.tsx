import '@mantine/core/styles.css';

import { ClerkProvider } from "@clerk/nextjs";
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from "@mantine/notifications";
import { Provider as JotaiProver, createStore } from "jotai";
import { DevTools, useAtomsDebugValue } from "jotai-devtools";
import { type AppType } from "next/app";
import "~/styles/globals.css";
import "~/styles/theme.scss";
import { api } from "~/utils/api";
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import dayjs from 'dayjs';

dayjs.extend(relativeTime)
dayjs.extend(duration)

const theme = createTheme({
  colors: {
    slate: [
      "var(--theme-primary-50)",
      "var(--theme-primary-100)",
      "var(--theme-primary-200)",
      "var(--theme-primary-300)",
      "var(--theme-primary-400)",
      "var(--theme-primary-500)",
      "var(--theme-primary-600)",
      "var(--theme-primary-800)",
      "var(--theme-primary-700)",
      "var(--theme-primary-900)",
    ],
  },
});

const customStore = createStore();

const DebugAtoms = () => {
  useAtomsDebugValue();
  return null;
};

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <MantineProvider withCssVariables theme={theme}>
        <JotaiProver store={customStore}>
          <DevTools store={customStore} />
          {/* <DebugAtoms /> */}
          <Notifications position="bottom-right" />
          <Component {...pageProps} />
        </JotaiProver>
      </MantineProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
