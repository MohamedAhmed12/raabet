"use client";

import { useQuery } from "@tanstack/react-query";
import { getCoupon } from "../actions/getCoupon";

export function useCoupon(userId: string) {
  return useQuery({
    queryKey: ["getCoupon", { userId }],
    queryFn: async () => getCoupon(userId),
    enabled: !!userId,
  });
}
