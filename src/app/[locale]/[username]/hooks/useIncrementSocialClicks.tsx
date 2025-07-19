import { useMutation } from "@tanstack/react-query";
import { incrementSocialClicks } from "../actions/incrementSocialClicks";

export function useIncrementSocialClicks() {
  return useMutation({
    mutationKey: ["incrementSocialClicks"],
    mutationFn: async ({
      socialId,
      linkId,
    }: {
      socialId: string;
      linkId: string;
    }) => {
      if (!socialId || !linkId) {
        throw new Error("Entity ID and Link ID are required");
      }
      return incrementSocialClicks(socialId, linkId);
    },
  });
}
