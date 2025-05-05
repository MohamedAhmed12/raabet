"use client";

import useFetchLink from "@/app/[locale]/[username]/useFetchLink";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import DashboardNotFound from "../../not-found";
import GeneralStylesSidebar from "./components/GeneralStylesSidebar/page";
import LinkBuilderSidebar from "./components/LinkBuilderSidebar/page";
import { LinkViewer } from "./components/LinkViewer/page";
import { useUpdateLink } from "./hooks/useUpdateLink";

export default function ProfileLinks() {
  const session = useSession();
  const { link } = useUpdateLink();
  const userId = session?.data?.user?.id?.id as string;
  const { isLoading, data, error } = useFetchLink({ userId });

  if (isLoading) return <Loading />;

  if (error) return <DashboardNotFound />;

  return (
    data && (
      <div className={"flex w-full justify-between max-h-full h-full"}>
        <LinkBuilderSidebar />
        <LinkViewer link={link} />
        <GeneralStylesSidebar />
      </div>
    )
  );
}
