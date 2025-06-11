"use client";

import { useWindowScroll } from "@reactuses/core";
import MainLinkComponent from "./components/MainLinkComponent";

export default function UserName() {
  const state = useWindowScroll();

  return <MainLinkComponent isSticky={state.y > 20} />;
}
