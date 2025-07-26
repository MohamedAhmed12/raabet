import { useCallback, useEffect, useRef, useState } from "react";
import { fetchSingleLink } from "../actions/fetchSingleLink";
import { useLinkStore } from "../store/use-link-store";

const useFetchLink = ({
  userId,
  username,
}: {
  userId?: string | undefined;
  username?: string;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const replaceLink = useLinkStore((state) => state.replaceLink);

  // Use ref to track if the data has been fetched already
  const hasFetchedRef = useRef<boolean>(false);

  const fetchLink = useCallback(
    async (withLoading = true) => {
      if (withLoading) setIsLoading(true);
      setError(null);

      try {
        const response = await fetchSingleLink({ userId, username });

        if (response) {
          setData(response);
          // @ts-expect-error - We're ignoring this line because we trust the response matches the Link type
          replaceLink(response);

          hasFetchedRef.current = true; // Mark as fetched
        } else {
          const e = `No link attached to this userId`;
          console.error(e);
          setError(e);
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [userId, username, replaceLink]
  );

  const refetch = () => {
    fetchLink(false);
  };

  useEffect(() => {
    if (!userId && !username) return; // Don't fetch if userId is missing or data already fetched

    fetchLink();
  }, [fetchLink, userId, username]);

  return { isLoading, data, error, refetch };
};

export default useFetchLink;
