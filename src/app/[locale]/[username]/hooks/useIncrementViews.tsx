import { Link } from "@prisma/client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { incrementViews } from "../actions/incrementViews";

export function useIncrementViews(
  options?: Omit<
    UseMutationOptions<Link, Error, string>,
    "mutationKey" | "mutationFn"
  >
) {
  return useMutation<Link, Error, string>({
    mutationKey: ["incrementViews"],
    mutationFn: async (id: string) => {
      if (!id) {
        throw new Error("Link ID is required");
      }
      return incrementViews(id);
    },
    ...options,
  });
}
