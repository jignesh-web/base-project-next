import { AuthHandler, Layout } from "@/components";
import { persistor, store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastProvider } from "@/components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider />
        <AuthHandler>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthHandler>
      </PersistGate>
    </Provider>
  );
}
