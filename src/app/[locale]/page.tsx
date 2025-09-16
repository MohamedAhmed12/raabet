import { getLocale } from "next-intl/server";
import Head from "next/head";
import Home from "./Home/page";

export default async function App() {
  const locale = await getLocale();

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`}
        />
      </Head>
      <Home />
    </>
  );
}
