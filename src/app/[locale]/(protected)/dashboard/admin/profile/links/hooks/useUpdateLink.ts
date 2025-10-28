"use client";

import { updateSingleLink } from "@/app/[locale]/actions/updateSingleLink";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { useCallback } from "react";

export function useUpdateLink() {
  const setLink = useLinkStore((state) => state.setLink);

  const handleLinkPropertyValChange = useCallback(
    (
      key: string,
      val: string | boolean | number,
      shouldPersistToDatabase = true
    ) => {
      
      setLink({ key: key as any, value: val });

      if (shouldPersistToDatabase) {
        const currentLink = useLinkStore.getState().link;
        updateSingleLink(currentLink?.id || "", key as any, val);
      }
    },
    [setLink]
  );

  return { handleLinkPropertyValChange };
}
