import { useMutation } from "@tanstack/react-query";
import { incrementBlockClicks } from "../actions/incrementBlockClicks";

export function useIncrementBlockClicks() {
  return useMutation({
    mutationKey: ["incrementBlockClicks"],
    mutationFn: async ({
      id,
      linkId,
    }: {
      id: string;
      linkId: string;
    }) => {
      if (!id || !linkId) {
        throw new Error("Entity ID and Link ID are required");
      }
      return incrementBlockClicks(id, linkId);
    },
  });
}
