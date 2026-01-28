"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Input, Button } from "./form";

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
      <form
        onSubmit={handleFilterSubmit}
        className="w-full flex items-center gap-4"
      >
        <Input
          label="Start Date:"
          type="date"
          name="from"
          defaultValue={fromDate}
          max={toDate}
          onChange={(e) => setFromDate(e.target.value)}
          direction="row"
          className="cursor-pointer"
        />

        <Input
          label="End Date:"
          type="date"
          name="to"
          defaultValue={toDate}
          min={fromDate}
          onChange={(e) => setToDate(e.target.value)}
          direction="row"
          className="cursor-pointer"
        />

        <Button type="submit">Apply Filter</Button>
      </form>
    </div>
  );
}
