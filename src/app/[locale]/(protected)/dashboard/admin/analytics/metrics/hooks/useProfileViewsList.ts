"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { listProfileViews } from "../actions/listProfileViews";

type UseProfileViewsListOptions = {
  dateRange?: number;
};

export function useProfileViewsList(options: UseProfileViewsListOptions = {}) {
  const { dateRange = 0 } = options;

  // Get linkId from link store
  const { linkId } = useLinkStore(
    useShallow((state) => ({
      linkId: state.link.id,
    }))
  );

  return useQuery({
    queryKey: ["profile-views", linkId, dateRange],
    queryFn: async () => {
      if (!linkId) throw new Error("Link ID is required");

      return listProfileViews({ linkId });
    },
    enabled: !!linkId,
    staleTime: 60 * 1000, // 1 minute - balances freshness and performance
    gcTime: 5 * 60 * 1000, // 5 minutes - keeps data in cache for quick navigation
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
}
