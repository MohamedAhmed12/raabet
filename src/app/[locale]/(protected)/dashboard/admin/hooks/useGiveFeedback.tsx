import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { giveFeedback } from "../actions/giveFeedback";

export type CreateFeedbackParams = {
  linkId: string;
  rating: number;
  highlight: string;
  feedback: string;
};
type GiveFeedbackResponse = {
  success: boolean;
  promoCode: string | null;
};

export function useGiveFeedback(
  options?: Omit<
    UseMutationOptions<GiveFeedbackResponse, Error, CreateFeedbackParams>,
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
    }: CreateFeedbackParams): Promise<GiveFeedbackResponse> => {
      if (!linkId) {
        throw new Error("Link ID is required");
      }
      const result = await giveFeedback({
        linkId,
        rating,
        highlight,
        feedback,
      });

      if (!result?.success) {
        throw new Error("Failed to submit feedback");
      }

      return result;
    },
    ...options,
  });
}
