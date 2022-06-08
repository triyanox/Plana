import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";
import Head from "next/head";
import { ReactNode } from "react";

type MainProps = {
  pageTitle?: string;
  siteName?: string;
  description?: string;
  children?: ReactNode;
};

export default function Main(props: MainProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="follow, index" />
        <title>{props.pageTitle}</title>
        <meta
          name="description"
          content={props.description || "Minimal To-Do app"}
        />
        <meta name="author" content="Mohamed Achaq" />
        <meta
          property="og:site_name"
          content={props.siteName}
          key="ogsitename"
        />
        <meta property="og:title" content={props.pageTitle} key="ogtitle" />
        <meta
          property="og:description"
          content={props.description}
          key="ogdesc"
        />
        <meta
          name="keywords"
          content="Mohamed Achaq, Plana, HTML, CSS, JavaScript, React, Typescript, NodeJs, Python"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://plana.achaq.codes/" />
        <meta property="og:title" content={props.pageTitle} />
        <meta property="og:description" content={props.description} />
      </Head>
      <main className="w-full h-screen">
        <Navbar />
        {props.children}
        <Footer />
      </main>
    </>
  );
}
