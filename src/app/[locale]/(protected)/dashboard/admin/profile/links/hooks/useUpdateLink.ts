"use client";

import { updateSingleLink } from "@/app/[locale]/actions/updateSingleLink";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { useCallback, useTransition } from "react";

export function useUpdateLink() {
  const setLink = useLinkStore((state) => state.setLink);
  const [, startTransition] = useTransition();

  const handleLinkPropertyValChange = useCallback(
    (
      key: string,
      val: string | boolean | number,
      shouldPersistToDatabase = true
    ) => {
      // Update store immediately for instant UI feedback
      setLink({ key: key as any, value: val });

      if (shouldPersistToDatabase) {
        // Use startTransition to make database update non-blocking
        startTransition(() => {
          const currentLink = useLinkStore.getState().link;
          updateSingleLink(currentLink?.id || "", key as any, val);
        });
      }
    },
    [setLink, startTransition]
  );

  return { handleLinkPropertyValChange };
}
