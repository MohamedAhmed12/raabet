import { useMutation } from "@tanstack/react-query";
import { incrementViews } from "../actions/incrementViews";

export function useIncrementViews() {
  return useMutation({
    mutationKey: ["incrementViews"],
    mutationFn: async (id: string) => {
      if (!id) {
        throw new Error("Link ID is required");
      }
      return incrementViews(id);
    },
  });
}
