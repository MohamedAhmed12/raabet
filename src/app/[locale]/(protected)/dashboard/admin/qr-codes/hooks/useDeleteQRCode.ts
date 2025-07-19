import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQRCode } from "../actions/deleteQRCode";

export function useDeleteQRCode() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string }>({
    mutationKey: ["listQRCodes"],
    mutationFn: async ({ id }) => {
      await deleteQRCode(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listQRCodes"] });
    },
  });
}
