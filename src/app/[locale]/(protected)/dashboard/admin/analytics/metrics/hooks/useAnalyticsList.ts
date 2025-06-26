"use client";

import { useQuery } from "@tanstack/react-query";
import { listAnalytics } from "../actions/listAnalytics";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { useShallow } from "zustand/react/shallow";

export function useAnalyticsList(dateRange: number = 0) {
  // Get linkId from link store
  const { linkId } = useLinkStore(
    useShallow((state) => ({
      linkId: state.link.id,
    }))
  );

  return useQuery({
    queryKey: ["analytics", dateRange],
    queryFn: () => {
      if (!linkId) throw new Error("Link ID is required");

      return listAnalytics({
        linkId,
        dateRange,
      });
    },
    enabled: !!linkId,
    staleTime: 20 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
}
