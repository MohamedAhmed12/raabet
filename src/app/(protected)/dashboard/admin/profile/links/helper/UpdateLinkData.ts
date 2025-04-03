"use client";

import { useLinkStore } from "@/app/store/use-link-store";
import { updateSingleLink } from "@/app/actions/updateSingleLink";

export function useUpdateLink() {
  const { link, setLink } = useLinkStore((state) => state);

  const handleLinkPropertyValChange = async (
    key: keyof typeof link,
    val: string | boolean | number
  ) => {
    const updatedLink = { ...link, [key]: val };
    setLink(updatedLink);

    const result = await updateSingleLink(link.id, key, val);

    if (!result?.success) {
      console.error("Failed to update link:", result?.error);
    }
  };

  return { link,handleLinkPropertyValChange };
}
