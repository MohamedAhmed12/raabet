"use client";

import { useWindowScroll } from "@reactuses/core";
import { useParams } from "next/navigation";
import { MainLinkComponent } from "./components/MainLinkComponent";
import useFetchLink from "./useFetchLink";
import { notFound } from "next/navigation";
import Loading from "../../loading";

export default function UserName() {
  const state = useWindowScroll();
  const { username }: { username: string } = useParams();
  const { data, isLoading, error } = useFetchLink({ username });
  /*
   * propsLink exists when using profile link viewer
   * store link
   */
  if ((!username && !data) || error) return notFound();

  if (isLoading) return <Loading />;

  return <MainLinkComponent link={data} isSticky={state.y > 20} />;
}
