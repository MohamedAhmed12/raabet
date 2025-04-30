"use client";

import {useLinkStore} from "@/app/store/use-link-store";
import {updateSingleLink} from "@/app/actions/updateSingleLink";

export function useUpdateLink() {
  const {link, setLink} = useLinkStore((state) => state);

  const handleLinkPropertyValChange = async (
    key: keyof typeof link,
    val: string | boolean | number
  ) => {
    const updatedLink = {...link, [key]: val};

    // Only update if the new value differs
    if (JSON.stringify(updatedLink) !== JSON.stringify(link)) {
      const result = await updateSingleLink(link.id, key, val);

      if (result?.success) {
        setLink(updatedLink);
      } else {
        console.error("Failed to update link:", result?.error);
      }
    }
  };

  return {link, handleLinkPropertyValChange};
}
