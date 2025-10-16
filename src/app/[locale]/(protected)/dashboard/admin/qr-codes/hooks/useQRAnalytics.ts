import { useQuery } from "@tanstack/react-query";
import { getQRAnalytics } from "../actions/getQRAnalytics";

export function useQRAnalytics(qrCodeId: string,dateRange: number = 0) {
  return useQuery({
    queryKey: ["qrAnalytics", qrCodeId,dateRange],
    queryFn: () => getQRAnalytics(qrCodeId,dateRange),
    enabled: !!qrCodeId,
  });
}
