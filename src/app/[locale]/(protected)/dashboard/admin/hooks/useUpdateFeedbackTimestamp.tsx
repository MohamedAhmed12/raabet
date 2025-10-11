import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { updateFeedbackTimestamp } from "../actions/updateFeedbackTimestamp";

export function useUpdateFeedbackTimestamp(
  options?: Omit<
    UseMutationOptions<{ success: boolean }, Error, { linkId: string }>,
    "mutationKey" | "mutationFn"
  >
) {
  return useMutation({
    mutationKey: ["useUpdateFeedbackTimestamp"],
    mutationFn: async ({ linkId }: { linkId: string }) => {
      if (!linkId) {
        throw new Error("Link ID is required");
      }

      return await updateFeedbackTimestamp({ linkId });
    },
    ...options,
  });
}
