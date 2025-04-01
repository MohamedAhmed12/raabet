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
  const username = session?.data?.fullname as string;
  // You can validate or fetch data based on the username
  if (!username && session.status == "authenticated") return notFound();

  const { isLoading, data, error } = useFetchLink(username);

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
