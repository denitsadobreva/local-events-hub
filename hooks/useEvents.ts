"use client";

import { useEffect, useMemo, useState } from "react";
import { EVENTS_PER_PAGE } from "@/lib/config/constants";
import { Event } from "@/lib/types";

type Filters = {
  query?: string;
  from?: string;
  to?: string;
  page?: number;
};

export function useEvents(filters: Filters) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const currentPage = filters.page ?? 1;

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.query) params.set("query", filters.query);
    if (filters.from) params.set("from", filters.from);
    if (filters.to) params.set("to", filters.to);

    setLoading(true);

    fetch(`/api/events?${params.toString()}`)
      .then((res) => res.json())
      .then(setEvents)
      .finally(() => setLoading(false));
  }, [filters.query, filters.from, filters.to]);

  const pagination = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(events.length / EVENTS_PER_PAGE));

    const start = (currentPage - 1) * EVENTS_PER_PAGE;
    const end = start + EVENTS_PER_PAGE;

    return {
      currentPage,
      totalPages,
      paginatedEvents: events.slice(start, end),
    };
  }, [events, currentPage]);

  return {
    events: pagination.paginatedEvents,
    pagination,
    loading,
  };
}
