import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { giveFeedback } from "../actions/giveFeedback";

export type CreateFeedbackParams = {
  userStripeCustomerId: string | null;
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
      userStripeCustomerId,
      linkId,
      rating,
      highlight,
      feedback,
    }: CreateFeedbackParams): Promise<GiveFeedbackResponse> => {
      if (!userStripeCustomerId || !linkId) {
        throw new Error("userStripeCustomerId and Link ID is required");
      }
      const result = await giveFeedback({
        userStripeCustomerId,
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
