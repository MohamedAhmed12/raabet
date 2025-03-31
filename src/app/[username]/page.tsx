"use client";

import { cn } from "@/lib/cn";
import { notFound, useParams } from "next/navigation";
import Loading from "../loading";
import LinksFooter from "./components/LinksFooter";
import LinksNavbar from "./components/LinksHeader/LinksNavbar";
import { LinksHeader } from "./components/LinksHeader/page";
import LinksSocialIcons from "./components/LinksSocialIcons";
import useFetchLink from "./useFetchLink";

export default function UserName() {
  const { username } = useParams();

  // You can validate or fetch data based on the username
  if (!username) return notFound();

  const { isLoading, data, error } = useFetchLink("johndoe");

  if (error) return notFound();

  if (isLoading) return <Loading />;

  return (
    data && (
      <div
        className={cn("flex justify-center")}
        style={{
          backgroundColor: data?.general_styles_desktop_bgcolor,
          color: data?.general_styles_primary_text_color,
        }}
      >
        <div
          className={cn(
            "w-full flex flex-col text-red-800 max-w-[530px] min-h-[calc(100vh+60px)]",
            "pt-[33px] pb-[33px] px-[33px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.15)]"
          )}
          style={{
            backgroundColor: data?.general_styles_primary_bgcolor,
          }}
        >
          <LinksNavbar />

          <div className="flex flex-col flex-1">
            <LinksHeader />
            <LinksSocialIcons />
          </div>

          <LinksFooter />
        </div>
      </div>
    )
  );
}
