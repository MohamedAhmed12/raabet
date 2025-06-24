"use client";

import { updateSingleLink } from "@/app/[locale]/actions/updateSingleLink";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { useThrottleFn } from "@reactuses/core";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

export function useUpdateLink() {
  const { link, setLink } = useLinkStore(
    useShallow((state) => ({
      link: state.link,
      setLink: state.setLink,
    }))
  );

  const { run: runThrottledUpdate } = useThrottleFn(
    async (key: keyof typeof link, value: string | boolean | number) => {
      setLink({ key, value });
    },
    180
  );

  const handleLinkPropertyValChange = useCallback(
    async (
      key: keyof typeof link,
      val: string | boolean | number,
      shouldPersistToDatabase = true
    ) => {
      if (shouldPersistToDatabase) {
        updateSingleLink(link?.id || "", key, val);
      }

      runThrottledUpdate(key, val);
    },
    [link, setLink]
  );

  return { link, handleLinkPropertyValChange };
}
