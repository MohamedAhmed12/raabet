import { useEffect, useState } from "react";
import { fetchSingleLink } from "../actions/fetchSingleLink";
import { useLinkStore } from "../store/use-link-store";

const useFetchLink = (username: string | undefined) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { setLink } = useLinkStore((state) => state);

  useEffect(() => {
    if (!username) return;

    const fetchLink = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchSingleLink(username);

        if (response) {
          setData(response);
          setLink(response);
        } else {
          const e = `No record matches this username`;
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

    fetchLink();
  }, [username]);

  return { isLoading, data, error };
};

export default useFetchLink;
