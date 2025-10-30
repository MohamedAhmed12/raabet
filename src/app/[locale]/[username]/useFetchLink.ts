import { useLinkStore, type Link } from "@/app/[locale]/store/use-link-store";
import { logError } from "@/lib/errorHandling";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleLink } from "../actions/fetchSingleLink";
import { useShallow } from "zustand/shallow";

const useFetchLink = ({
  userId,
  username,
}: {
  userId?: string | undefined;
  username?: string;
}) => {
  const { replaceLink, setLinkRaw } = useLinkStore(
    useShallow((state) => ({
      replaceLink: state.replaceLink,
      setLinkRaw: state.setLinkRaw,
    }))
  );

  return useQuery({
    queryKey: ["link", { userId, username }],
    queryFn: async () => {
      try {
        if (!userId && !username) {
          const error = new Error("User ID or username is required");
          logError(error, {
            action: "useFetchLink/validation",
            userId: userId || "undefined",
            username: username || "undefined",
          });
          throw error;
        }

        const response = await fetchSingleLink({ userId, username });

        if (!response) {
          const error = new Error("No link attached to this userId");
          logError(error, {
            action: "useFetchLink/notFound",
            userId: userId || "undefined",
            username: username || "undefined",
          });
          throw error;
        }

        try {
          // @ts-expect-error - response structure differs from Link type (qrcodes field is partial)
          const linkData = response as Link;
          replaceLink(linkData);
          setLinkRaw(linkData);
        } catch (storeError) {
          logError(storeError, {
            action: "useFetchLink/storeUpdate",
            userId: userId || "undefined",
            username: username || "undefined",
            linkId: response.id,
          });
          // Don't throw - continue with response even if store update fails
        }

        return response;
      } catch (error) {
        logError(error, {
          action: "useFetchLink/error",
          userId: userId || "undefined",
          username: username || "undefined",
          errorMessage: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        });
        throw error;
      }
    },
    enabled: !!(userId || username), // Only run the query if we have either userId or username
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: false,
    retry: 1,
  });
};

export default useFetchLink;
