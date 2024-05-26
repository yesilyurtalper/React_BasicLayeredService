
import useSWR from "swr";

export default function useDataFromCache(key) {
  const { data } = useSWR(key, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  
  return data
}
