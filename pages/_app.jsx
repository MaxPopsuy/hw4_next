import Head from "next/head";
import NavBar from "../components/NavBar/NavBar";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="SAM" />
        {Component.title ? <title>{Component.title}</title> : <title>Movie search</title>}
      </Head>
      <NextNProgress
        color="#7858A6"
        showOnShallow={true}
      />
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;