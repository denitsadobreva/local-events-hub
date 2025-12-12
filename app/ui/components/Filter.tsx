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

  return (
    <div>
      <h2>Filter Component</h2>
      <form onSubmit={handleFilterSubmit}>
        <label htmlFor="from">Start Date:</label>
        <input
          type="date"
          name="from"
          defaultValue={fromDate}
          max={toDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <label htmlFor="to">End Date:</label>
        <input
          type="date"
          name="to"
          defaultValue={toDate}
          min={fromDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <button type="submit">Apply Filter</button>
      </form>
    </div>
  );
}
