import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import { filterEvents, getAllEvents } from "@/lib/db/events";
import { EVENTS_PER_PAGE } from "@/lib/config/constants";

function normalizeParam(param?: string | string[]) {
  if (!param) return undefined;
  return Array.isArray(param) ? param[0] : param;
}

export default async function EventsPage({
  params,
  searchParams,
}: {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{
    query?: string | string[];
    from?: string | string[];
    to?: string | string[];
    page?: string | string[];
  }>;
}) {
  const [resolvedParams, resolvedSearch] = await Promise.all([
    params,
    searchParams,
  ]);

  let events = [];
  const query = normalizeParam(resolvedSearch.query);
  const from = normalizeParam(resolvedSearch.from);
  const to = normalizeParam(resolvedSearch.to);
  if (query || from || to) {
    events = await filterEvents(query, from, to);
  } else {
    events = await getAllEvents();
  }

  const rawPage = resolvedSearch.page;
  const pageString = Array.isArray(rawPage) ? rawPage[0] : rawPage;
  const currentPage = pageString ? Math.max(1, Number(pageString) || 1) : 1;

  const totalPages = Math.max(1, Math.ceil(events.length / EVENTS_PER_PAGE));

  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const endIndex = startIndex + EVENTS_PER_PAGE;
  const paginatedEvents = events.slice(startIndex, endIndex);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-6 justify-center items-center">
      <h1 className="font-semibold text-2xl text-gray-800">Events</h1>
      <SearchBar />
      <Filter />

      {paginatedEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div>
          <ul className="grid gap-6 w-full grid-cols-3">
            {paginatedEvents.map((event) => (
              <li
                key={event.id}
                className="mb-4 flex flex-col gap-2 max-w-md w-full p-8 border border-gray-300 bg-white shadow-lg rounded-xl"
              >
                <Link href={`/events/${event.id}`}>
                  <h2 className="text-lg font-semibold">{event.title}</h2>
                </Link>
                <p>{event.description}</p>
                <p className="text-sm text-gray-600">
                  Date: {event.eventDate.toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={resolvedSearch}
          />
        </div>
      )}
    </div>
  );
}
