import { useEffect, useRef, useState } from "react";
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

  const fetchLink = async (withLoading = true) => {
    if (withLoading) setIsLoading(true);
    setError(null);

    try {
      const response = await fetchSingleLink({ userId, username });

      if (response) {
        setData(response);
        // @ts-ignore - We're ignoring this line because we trust the response matches the Link type
        replaceLink(response);

        hasFetchedRef.current = true; // Mark as fetched
      } else {
        const e = `No link attached to this userId`;
        console.debug(e);
        setError(e);
      }
    } catch (err) {
      setError("Failed to fetch data");
      console.debug(err);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchLink(false);
  };

  useEffect(() => {
    if (!userId && !username) return; // Don't fetch if userId is missing or data already fetched

    fetchLink();
  }, [userId, username, replaceLink]);

  return { isLoading, data, error, refetch };
};

export default useFetchLink;
