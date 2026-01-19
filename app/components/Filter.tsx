"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const [fromDate, setFromDate] = useState(searchParams.get("from") || "");
  const [toDate, setToDate] = useState(searchParams.get("to") || "");

  const getQueryString = () => {
    const params = new URLSearchParams();
    if (queryParam) params.append("query", queryParam);
    if (fromDate) params.append("from", fromDate);
    if (toDate) params.append("to", toDate);
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`${pathname}${getQueryString()}`);
  };

  const showPicker = (e: any) => {
    e.target.showPicker();
  };

  return (
    <div>
      <form
        onSubmit={handleFilterSubmit}
        className="w-full flex justify-between items-center gap-4"
      >
        <label htmlFor="from" className="flex-shrink-0">
          Start Date:
        </label>
        <input
          type="date"
          name="from"
          defaultValue={fromDate}
          max={toDate}
          onChange={(e) => setFromDate(e.target.value)}
          onClick={showPicker}
          className="cursor-pointer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="to" className="flex-shrink-0">
          End Date:
        </label>
        <input
          type="date"
          name="to"
          defaultValue={toDate}
          min={fromDate}
          onChange={(e) => setToDate(e.target.value)}
          onClick={showPicker}
          className="cursor-pointer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="flex-shrink-0 px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors rounded cursor-pointer"
        >
          Apply Filter
        </button>
      </form>
    </div>
  );
}
