import { updateSingleLink } from "@/app/[locale]/actions/updateSingleLink";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useFetchLink from "@/app/[locale]/[username]/useFetchLink";
import { Link } from "@/app/[locale]/store/use-link-store";

/**
 * Hook to update link field with cache + database persistence
 * Replaces the old handleLinkPropertyValChange pattern
 * Updates cache immediately for instant UI, then persists to DB
 * Can also be used for cache-only updates (set persistToDb: false)
 * Automatically gets linkId from React Query cache
 */
export function useUpdateLinkField() {
  const queryClient = useQueryClient();

  return async (
    key: string,
    value: string | boolean | number | any,
    persistToDb: boolean = true
  ) => {
    // Update cache immediately for instant UI feedback
    queryClient.setQueryData(["link"], (old: any) => {
      // If old data exists, merge the update
      if (old) {
        return {
          ...old,
          [key]: value,
        };
      }
      // If no old data, return the new value (query will be created)
      return { [key]: value };
    });

    // Persist to database if needed (only for primitive types)
    // Arrays/objects should use their own specific actions (e.g., updateSocials, updateBlocks)
    if (
      persistToDb &&
      (typeof value === "string" ||
        typeof value === "boolean" ||
        typeof value === "number")
    ) {
      // Get linkId from cache only when we need to persist
      const link = queryClient.getQueryData(["link"]) as any;
      const linkId = link?.id;

      if (linkId) {
        await updateSingleLink(linkId, key, value);
      }
    }
  };
}

/**
 * Hook to get link data from React Query cache with subscription
 * Automatically gets userId from session - no parameters needed
 * Uses useFetchLink under the hood for consistency
 * Will fetch if data doesn't exist, subscribes to cache updates
 *
 * @returns Function that returns link data (properly typed)
 */
export function useGetLink(): () => Link | undefined {
  const session = useSession();
  // @ts-expect-error: [to access user data in session it exists in id]
  const userId = session?.data?.user?.id?.id as string;

  // Use useFetchLink which handles fetching and caching properly
  // React Query will deduplicate queries with the same key ["link"]
  const { data } = useFetchLink({ userId });

  // Return a function for backward compatibility with existing code
  // Properly typed to return Link | undefined
  return () => (data as Link | undefined) ?? undefined;
}
