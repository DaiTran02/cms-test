import type { AppProps } from 'next/app';
import '../css/base.css';
import '../css/embla.css';
import './globals.css';
import TanstackProviders from './providers';
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TanstackProviders>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <Component {...pageProps} />
    </TanstackProviders>
  );
}
