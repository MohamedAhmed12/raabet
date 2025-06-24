import { useMutation } from "@tanstack/react-query";
import { incrementBlockClicks } from "../actions/incrementBlockClicks";

export function useIncrementBlockClicks() {
  return useMutation({
    mutationKey: ["incrementBlockClicks"],
    mutationFn: async (id: string) => {
      if (!id) {
        throw new Error("Block ID is required");
      }
      return incrementBlockClicks(id);
    },
  });
}
