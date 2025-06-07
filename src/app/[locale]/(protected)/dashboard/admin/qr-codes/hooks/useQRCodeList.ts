import { useQuery } from "@tanstack/react-query";
import { getQRCodeList } from "../actions/getQRCodeList";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";

export function useQRCodeList() {
  const linkId = useLinkStore((state) => state.link.id);

  return useQuery({
    queryKey: ["listQRCodes"],
    queryFn: () => getQRCodeList({ linkId }),
    enabled: !!linkId,
    staleTime: Infinity,
  });
}
