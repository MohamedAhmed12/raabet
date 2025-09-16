import { getLocale } from "next-intl/server";
import Head from "next/head";
import Home from "./Home/page";

export default async function App() {
  const locale = await getLocale();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rabetlink.com';

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${baseUrl}/${locale}`}
        />
      </Head>
      <Home />
    </>
  );
}
