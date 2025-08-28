"use client";

import { MainLinkComponent } from "@/app/[locale]/[username]/components/MainLinkComponent";
import { Link } from "@/app/[locale]/store/use-link-store";
import { Link as PrismaLink } from "@prisma/client";
import { useScroll } from "@reactuses/core";
import { useRef } from "react";

export function MainLinkScrollableContainer({
  link,
}: {
  link: Link | PrismaLink;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [_, y] = useScroll(containerRef, { throttle: 16 });

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-y-auto link-viewer-container w-full"
      style={{ scrollBehavior: "smooth" }}
    >
      <div className="min-h-screen">
        <MainLinkComponent link={link} isSticky={(y || 0) > 20} />
      </div>
    </div>
  );
}
