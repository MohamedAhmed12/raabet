import { useQuery } from "@tanstack/react-query";
import { getQRCodeList } from "../actions/getQRCodeList";
import { useGetLink } from "../../profile/links/hooks/useUpdateLink";

export function useQRCodeList() {
  const getLink = useGetLink();
  const link = getLink();
  const linkId = link?.id;

  return useQuery({
    queryKey: ["listQRCodes", linkId],
    queryFn: () => getQRCodeList({ linkId: linkId! }),
    enabled: !!linkId,
    staleTime: Infinity,
  });
}
