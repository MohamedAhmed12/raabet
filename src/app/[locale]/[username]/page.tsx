"use client";

import { cn } from "@/lib/cn";
import { notFound, useParams } from "next/navigation";
import { useEffect } from "react";
import Loading from "../../loading";
import { useLinkStore } from "../store/use-link-store";
import LinksBlocks from "./components/LinksBlocks";
import LinksFooter from "./components/LinksFooter";
import { LinksHeader } from "./components/LinksHeader";
import LinksNavbar from "./components/LinksHeader/LinksNavbar";
import LinksSocialIcons from "./components/LinksSocialIcons";
import useFetchLink from "./useFetchLink";

export default function UserName() {
  const {username}: {username: string} = useParams();
  const {setLink, link} = useLinkStore((state) => state);

  // useFetchLink is setting link data from DB in linkStore internally
  const {isLoading, error} = useFetchLink({username});

  useEffect(() => {
    const handleMessage = (event: MessageEvent<any>) => {
      // Access the data sent from the parent
      const receivedData = event.data;

      if (receivedData?.type != "linkData") return;
      if (receivedData?.data) setLink(receivedData.data);
    };

    // Add event listener for receiving the message
    window.addEventListener("message", handleMessage);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setLink]);

  /*
   * propsLink exists when using profile link viewer
   * store link
   */
  if ((!username && !link) || error) return notFound();

  if (isLoading) return <Loading />;

  return (
    link.id && (
      <div
        className={cn("flex justify-center")}
        style={{
          backgroundColor: link?.general_styles_desktop_bgcolor,
          borderRadius: "inherit",
        }}
      >
        <div
          className={cn(
            "w-full flex flex-col max-w-[530px] min-h-[calc(100vh+60px)]",
            "shadow-[0px_7px_29px_0px_rgba(100,100,111,0.15)]"
          )}
          style={{
            color: link?.general_styles_primary_text_color,
            backgroundColor: link?.general_styles_primary_bgcolor,
            borderRadius: "inherit",
          }}
        >
          <div
            className={cn(
              "flex flex-col h-full p-[33px]",
              link?.general_styles_is_secondary_bgcolor &&
                "pt-[18px] mt-[210px]"
            )}
            style={{
              backgroundColor: link?.general_styles_is_secondary_bgcolor
                ? link?.general_styles_secondary_bgcolor
                : link?.general_styles_primary_bgcolor,
            }}
          >
            <LinksNavbar />

            <div
              className={cn(
                "flex flex-col flex-1",
                link?.general_styles_is_secondary_bgcolor && "mt-[25px]"
              )}
            >
              <LinksHeader />
              <LinksSocialIcons />
              <LinksBlocks />
            </div>

            <LinksFooter />
          </div>
        </div>
      </div>
    )
  );
}
