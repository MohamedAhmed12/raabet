import { useLinkStore } from "@/app/[locale]/store/use-link-store";
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
      if (!userId && !username) {
        throw new Error("User ID or username is required");
      }
      const response = await fetchSingleLink({ userId, username });

      if (!response) {
        throw new Error("No link attached to this userId");
      }

      // @ts-expect-error - We're ignoring this line because we trust the response matches the Link type
      replaceLink(response);
      setLinkRaw(response);

      return response;
    },
    enabled: !!(userId || username), // Only run the query if we have either userId or username
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

export default useFetchLink;
