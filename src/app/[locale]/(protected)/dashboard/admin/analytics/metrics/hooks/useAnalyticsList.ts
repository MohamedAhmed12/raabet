"use client";

import { useQuery } from "@tanstack/react-query";
import { listAnalytics } from "../actions/listAnalytics";
import { useGetLink } from "../../../profile/links/hooks/useUpdateLink";
import { Link } from "@/app/[locale]/store/use-link-store";

export function useAnalyticsList(dateRange: number = 0) {
  // Get linkId from getLink method
  const getLink = useGetLink();
  const link = getLink();

  const linkId = link?.id;

  return useQuery({
    queryKey: ["analytics", dateRange, linkId],
    queryFn: () => {
      return listAnalytics({
        linkId: linkId!,
        dateRange,
      });
    },
    enabled: !!linkId,
    staleTime: 20 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
}
