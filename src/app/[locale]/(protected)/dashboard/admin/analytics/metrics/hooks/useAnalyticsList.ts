"use client";

import { useQuery } from "@tanstack/react-query";
import { listAnalytics } from "../actions/listAnalytics";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { useShallow } from "zustand/react/shallow";

export function useAnalyticsList(dateRange: number = 0) {
  // Get blocks and socials from link store
  const { linkId, profile_views } = useLinkStore(
    useShallow((state) => ({
      linkId: state.link.id,
      profile_views: state.link.profile_views,
    }))
  );

  return useQuery({
    queryKey: ["analytics", dateRange],
    queryFn: () => {
      if (!linkId) throw new Error("Link ID is required");

      return listAnalytics({
        linkId,
        dateRange,
        profile_views: profile_views || 0,
      });
    },
    enabled: !!linkId,
    staleTime: 20 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
}
