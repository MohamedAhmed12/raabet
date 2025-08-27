"use server";

import { logError } from "@/lib/errorHandling";
import { notFound } from "next/navigation";
import { fetchSingleLink } from "../actions/fetchSingleLink";
import { incrementViews } from "./actions/incrementViews";
import { MainLinkComponent } from "./components/MainLinkComponent";

interface UserPageProps {
  params: {
    username: string;
    locale: string;
  };
}

export default async function UserName({ params }: UserPageProps) {
  let linkData;
  const { username } = params;

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

  return <MainLinkComponent link={linkData} isSticky={false} />;
}
