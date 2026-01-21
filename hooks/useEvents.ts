import { filterEvents, getAllEvents } from "@/lib/events";
import { EVENTS_PER_PAGE } from "@/lib/constants";

type SearchParams = {
  query?: string | string[];
  from?: string | string[];
  to?: string | string[];
  page?: string | string[];
};

function normalizeParam(param?: string | string[]) {
  if (!param) return undefined;
  return Array.isArray(param) ? param[0] : param;
}

export async function useEvents(searchParams: SearchParams) {
  const query = normalizeParam(searchParams.query);
  const from = normalizeParam(searchParams.from);
  const to = normalizeParam(searchParams.to);

  let events = [];

  if (query || from || to) {
    events = await filterEvents(query, from, to);
  } else {
    events = await getAllEvents();
  }

  const pageString = normalizeParam(searchParams.page);
  const currentPage = pageString ? Math.max(1, Number(pageString) || 1) : 1;

  const totalPages = Math.max(1, Math.ceil(events.length / EVENTS_PER_PAGE));

  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const endIndex = startIndex + EVENTS_PER_PAGE;

  const paginatedEvents = events.slice(startIndex, endIndex);

  return {
    events: paginatedEvents,
    pagination: {
      currentPage,
      totalPages,
      totalItems: events.length,
    },
    filters: {
      query,
      from,
      to,
    },
  };
}
