"use server";

import { MainLinkScrollableContainer } from "@/components/ScrollableContainer";
import { logError } from "@/lib/errorHandling";
import Head from "next/head";
import { notFound } from "next/navigation";
import { fetchSingleLink } from "../actions/fetchSingleLink";
import { incrementViews } from "./actions/incrementViews";

interface UserPageProps {
  params: Promise<{
    username: string;
    locale: string;
  }>;
}

export default async function UserName({ params }: UserPageProps) {
  let linkData;
  const { username, locale } = await params;

  try {
    linkData = await fetchSingleLink({ username });

    if (!linkData?.id || !linkData?.user?.id) {
      logError("Link ID or user ID not found:", {
        action: "profile/fetchSingleLink",
        errorType: "Link ID or user ID not found",
        username,
      });
      return notFound();
    }

    incrementViews(linkData.id);
  } catch (error) {
    logError(error, {
      action: "profile/fetchSingleLink",
      errorType:
        error instanceof Error ? error.constructor.name : "DatabaseError",
      username,
    });
    return notFound();
  }

  const processedLinkData = {
    ...linkData,
    blocks: linkData.blocks.map((block) => ({
      ...block,
      clicked: false,
    })),
  };

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/${username}`}
        />
      </Head>
      <MainLinkScrollableContainer link={processedLinkData} />
    </>
  );
}
