import { useMutation } from "@tanstack/react-query";
import { giveFeedback } from "../actions/giveFeedback";
import { type UseMutationOptions } from "@tanstack/react-query";

export function useGiveFeedback(
  options?: Omit<
    UseMutationOptions<
      { success: boolean },
      Error,
      { linkId: string; rating: number; highlight: string; feedback: string }
    >,
    "mutationKey" | "mutationFn"
  >
) {
  return useMutation({
    mutationKey: ["useGiveFeedback"],
    mutationFn: async ({
      linkId,
      rating,
      highlight,
      feedback,
    }: {
      linkId: string;
      rating: number;
      highlight: string;
      feedback: string;
    }) => {
      if (!linkId) {
        throw new Error("Link ID is required");
      }
      return giveFeedback({ linkId, rating, highlight, feedback });
    },
    ...options,
  });
}
