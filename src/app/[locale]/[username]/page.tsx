"use client";

import { useWindowScroll } from "@reactuses/core";
import { notFound, useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Loading from "../../loading";
import { MainLinkComponent } from "./components/MainLinkComponent";
import { useIncrementViews } from "./hooks/useIncrementViews";
import useFetchLink from "./useFetchLink";

export default function UserName() {
  const state = useWindowScroll();
  const { username }: { username: string } = useParams();
  const { data, isLoading, error } = useFetchLink({ username });
  const hasIncremented = useRef(false);
  const { mutateAsync: incrementViews } = useIncrementViews();

  useEffect(() => {
    // Only increment if:
    // 1. We have data
    // 2. We haven't incremented yet this session
    if (data?.id && !hasIncremented.current) {
      // Mark as incremented before making the API call to prevent duplicates
      hasIncremented.current = true;

      // Don't await here to avoid blocking render
      incrementViews(data.id);
    }
  }, [data, incrementViews]);

  /*
   * propsLink exists when using profile link viewer
   * store link
   */
  if ((!username && !data) || error) return notFound();

  if (isLoading) return <Loading />;

  return <MainLinkComponent link={data} isSticky={state.y > 20} />;
}
