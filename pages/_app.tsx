import "bootstrap/dist/css/bootstrap.min.css";
import { LogContextProvider } from "../context/log-context";
import { useEffect } from "react";
import "../styles/back.css";
import Navbar from "@/components/navbar";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="back-ground">
      {" "}
      <LogContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </LogContextProvider>
    </div>
  );
}
export default MyApp;
