"use client";

import useFetchLink from "@/app/[username]/useFetchLink";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import GeneralStylesSidebar from "./components/GeneralStylesSidebar/page";
import LinkBuilderSidebar from "./components/LinkBuilderSidebar/page";
import { LinkViewer } from "./components/LinkViewer/page";

export default function ProfileLinks() {
  const session = useSession();
  const userId = session?.data?.id as string;

  const { isLoading, data, error } = useFetchLink({ userId });

  if (error) return notFound();

  if (isLoading) return <Loading />;

  return (
    data && (
      <div className={"flex w-full h-full justify-between"}>
        <LinkBuilderSidebar />
        <LinkViewer />
        <GeneralStylesSidebar />
      </div>
    )
  );
}
