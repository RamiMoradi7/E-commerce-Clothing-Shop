import { useSearchParams } from "react-router-dom";

export default function useExtractSearchParams() {
  const [searchParams] = useSearchParams();
  return Object.fromEntries(searchParams.entries());
}
