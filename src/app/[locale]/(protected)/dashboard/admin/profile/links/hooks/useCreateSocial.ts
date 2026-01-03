import { iconNameType } from "@/assets/icons";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { createSocial } from "../actions/createSocial";
import { useGetLink } from "./useUpdateLink";

interface CreateSocialResponse {
  success: boolean;
  socials?: any[];
  error?: string;
}

export function useCreateSocial(
  options?: Omit<
    UseMutationOptions<CreateSocialResponse, Error, { icon: iconNameType }>,
    "mutationKey" | "mutationFn"
  >
) {
  const queryClient = useQueryClient();
  const getLink = useGetLink();
  const link = getLink();
  const linkId = link?.id;

  

  return useMutation<CreateSocialResponse, Error, { icon: iconNameType }>({
    mutationKey: ["createSocial"],
    mutationFn: async ({ icon }) => {
      if (!linkId) {
        throw new Error("Link ID is required");
      }
      const result = await createSocial({ linkId, icon });
      if (!result.success) {
        throw new Error(result.error || "Failed to create social");
      }
      return result;
    },
    onSuccess: (data) => {
      // Update cache with fresh socials from database
      if (data.socials) {
        queryClient.setQueryData(["link"], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            socials: data.socials,
          };
        });
      }
    },
    ...options,
  });
}

