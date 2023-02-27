import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.css";
import "@/styles/sortableList.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/NavBar";
import { SSRProvider } from "react-bootstrap";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SSRProvider>
        <Navbar />
        <Component {...pageProps} />
      </SSRProvider>
    </>
  );
}
