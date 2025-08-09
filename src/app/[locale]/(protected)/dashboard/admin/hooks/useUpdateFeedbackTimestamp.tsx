import { useMutation } from "@tanstack/react-query";
import { updateFeedbackTimestamp } from "../actions/updateFeedbackTimestamp";

export function useUpdateFeedbackTimestamp() {
  return useMutation({
    mutationKey: ["useUpdateFeedbackTimestamp"],
    mutationFn: async ({ linkId }: { linkId: string }) => {
      if (!linkId) {
        throw new Error("Link ID is required");
      }

      return updateFeedbackTimestamp({ linkId });
    },
  });
}
