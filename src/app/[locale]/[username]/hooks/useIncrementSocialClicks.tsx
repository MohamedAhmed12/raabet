import { useMutation } from "@tanstack/react-query";
import { incrementSocialClicks } from "../actions/incrementSocialClicks";

export function useIncrementSocialClicks() {
  return useMutation({
    mutationKey: ["incrementSocialClicks"],
    mutationFn: async (id: string) => {
      if (!id) {
        throw new Error("Social ID is required");
      }
      return incrementSocialClicks(id);
    },
  });
}
