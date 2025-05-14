"use client";

import useFetchLink from "@/app/[locale]/[username]/useFetchLink";
import Loading from "@/app/loading";
import {useSession} from "next-auth/react";
import DashboardNotFound from "../../not-found";
import {useIsScreenWidthLessThan} from "@/hooks/use-is-screen-width-less-than.ts";
import {cn} from "@/lib/utils";
import dynamic from "next/dynamic";
import {LinkViewer} from "./components/LinkViewer";
import {useUpdateLink} from "./hooks/useUpdateLink";
const LinkBuilderSidebar = dynamic(
  () => import("./components/LinkBuilderSidebar/page"),
  {ssr: false}
);
const GeneralStylesSidebar = dynamic(
  () => import("./components/GeneralStylesSidebar/page"),
  {ssr: false}
);
const SmallScreenTabs = dynamic(() => import("./components/SmallScreenTabs"), {
  ssr: false,
});

export default function ProfileLinks() {
  const session = useSession();
  const {link} = useUpdateLink();
  const hideGeneralStylesSidebar = useIsScreenWidthLessThan(1200) ?? true;
  const hideLinkBuilderSidebar = useIsScreenWidthLessThan(800) ?? true;
  const smallScreen = useIsScreenWidthLessThan(800) ?? false;
  // @ts-expect-error: [to access user data in session it exists in id]
  const userId = session?.data?.user?.id?.id as string;
  const {isLoading, data, error} = useFetchLink({userId});

  if (isLoading) return <Loading />;

  if (error) return <DashboardNotFound />;

  return (
    !isLoading &&
    data && (
      <div
        className={cn(
          "flex flex-col w-full justify-between h-screen max-h-full overflow-scroll",
          "md:flex-row md:overflow-hidden"
        )}
      >
        {/* large screen UI (sidebars) */}
        {!hideLinkBuilderSidebar && <LinkBuilderSidebar />}
        <LinkViewer link={link} />
        {!hideGeneralStylesSidebar && <GeneralStylesSidebar />}

        {/* small screen (tabs)  */}
        {smallScreen && <SmallScreenTabs />}
      </div>
    )
  );
}
