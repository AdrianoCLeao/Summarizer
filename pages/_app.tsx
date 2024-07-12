import "@/styles/globals.css";
import 'regenerator-runtime/runtime';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
