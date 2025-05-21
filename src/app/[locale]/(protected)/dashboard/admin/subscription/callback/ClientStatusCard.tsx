"use client";

import StatusCard from "./StatusCard";

export default function ClientStatusCard({
  title,
  tryAgainMsg,
}: {
  title: string;
  tryAgainMsg?: string;
}) {
  return <StatusCard title={title} tryAgainMsg={tryAgainMsg} />;
}
