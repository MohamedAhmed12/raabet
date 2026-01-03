import { logError } from "@/lib/errorHandling";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleLink } from "../actions/fetchSingleLink";
// Note: We don't explicitly type the return value because fetchSingleLink returns
// a Link with partially selected qrcodes (only { url }), which doesn't match
// the full LinkWithRelations type. TypeScript will infer the correct type from
// the queryFn return value.

const useFetchLink = ({
  userId,
  username,
}: {
  userId?: string | undefined;
  username?: string;
}) => {
  return useQuery({
    queryKey: ["link"],
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
    retry: 1,
  });
};

export default useFetchLink;
