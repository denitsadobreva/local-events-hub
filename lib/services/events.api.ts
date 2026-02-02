import { Event } from "@/lib/core";

type Filters = {
  query?: string;
  from?: string;
  to?: string;
};

export async function fetchEvents(filters: Filters): Promise<Event[]> {
  const params = new URLSearchParams();

  if (filters.query) params.set("query", filters.query);
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);

  const res = await fetch(`/api/events?${params.toString()}`);
  return res.ok ? res.json() : [];
}
