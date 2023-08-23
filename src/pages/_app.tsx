import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ClerkProvider } from "@clerk/nextjs";
import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import "~/styles/theme.scss";
import { api } from "~/utils/api";

const colors = {
  brand: {
    900: 'var(--theme-primary-900)',
    800: 'var(--theme-primary-800)',
    700: 'var(--theme-primary-700)',
    600: 'var(--theme-primary-600)',
    500: 'var(--theme-primary-500)',
    400: 'var(--theme-primary-400)',
    300: 'var(--theme-primary-300)',
    200: 'var(--theme-primary-200)',
    100: 'var(--theme-primary-100)',
    50: 'var(--theme-primary-50)',
  },
}
export const theme = extendTheme({ colors })


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <ChakraProvider  theme={theme}>
        <Toaster position="bottom-right" />
        <Component {...pageProps} />
      </ChakraProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
