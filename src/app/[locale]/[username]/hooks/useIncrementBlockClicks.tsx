import { useMutation } from "@tanstack/react-query";
import { incrementBlockClicks } from "../actions/incrementBlockClicks";

export function useIncrementBlockClicks() {
  return useMutation({
    mutationKey: ["incrementBlockClicks"],
    mutationFn: async ({
      entityId,
      linkId,
    }: {
      entityId: string;
      linkId: string;
    }) => {
      if (!entityId || !linkId) {
        throw new Error("Entity ID and Link ID are required");
      }
      return incrementBlockClicks(entityId, linkId);
    },
  });
}
