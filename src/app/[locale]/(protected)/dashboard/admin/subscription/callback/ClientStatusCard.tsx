"use client";

import CallbackStatusCard from "./CallbackStatusCard";

export default function ClientStatusCard({
  title,
  tryAgainMsg,
}: {
  title: string;
  tryAgainMsg?: string;
}) {
  return <CallbackStatusCard title={title} tryAgainMsg={tryAgainMsg} />;
}
