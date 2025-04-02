// import { useLinkStore } from "@/app/store/use-link-store";

// export  function UpdateLinkData() {

//   const { link, setLink } = useLinkStore((state) => state);

//     // move this to a custom hook and call action inside it UpdateSingleLInk
//     const handleLinkPropertyValChange = (
//       key: keyof Link,
//       val: string | boolean | number
//     ) => {
//       setLink({ [key]: val });
//       // call database to update link table to set the new link object form store into DB
//     };
// }

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
    console.log("Result from updateSingleLink:", result);

    if (!result?.success) {
      console.error("Failed to update link:", result?.error);
    }
  };

  return { link,handleLinkPropertyValChange };
}
