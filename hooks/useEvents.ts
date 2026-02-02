"use client";

import { useEffect, useMemo, useState } from "react";
import { EVENTS_PER_PAGE } from "@/lib/core";
import { Event } from "@/lib/core";
import { fetchEvents } from "@/lib/services/events.api";

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
    setLoading(true);

    fetchEvents(filters)
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
