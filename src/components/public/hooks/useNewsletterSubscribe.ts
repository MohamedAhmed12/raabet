import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { newsletterSubscribe } from "../actions/newsletterSubscribe";

export function useNewsletterSubscribe(
  options?: Omit<
    UseMutationOptions<
      { success: boolean; message: string },
      Error,
      { email: string }
    >,
    "mutationKey" | "mutationFn"
  >
) {
  return useMutation<
    { success: boolean; message: string },
    Error,
    { email: string }
  >({
    mutationKey: ["newsletterSubscribe"],
    mutationFn: async ({ email }) => {
      return await newsletterSubscribe({ email });
    },
    ...options,
  });
}
