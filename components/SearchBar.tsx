"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "@/lib/utils/debounce";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromDate = searchParams.get("from") || "";
  const toDate = searchParams.get("to") || "";

  const getQueryString = (query: string) => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (fromDate) params.append("from", fromDate);
    if (toDate) params.append("to", toDate);
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  };

  const debouncedFn = debounce((query: string) => {
    router.push(`/events${getQueryString(query)}`);
  }, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value || "";
    debouncedFn(query);
  };

  return (
    <div className="w-full" onChange={onChange}>
      <input
        type="text"
        placeholder="Search events..."
        defaultValue={searchParams.get("query") || ""}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
