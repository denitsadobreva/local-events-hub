import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import { useEvents } from "@/hooks/useEvents";
import type { events as Event } from "@prisma/client";

type UseEventsResult = {
  events: Event[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};

export default async function EventsPage({
  params,
  searchParams,
}: {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [resolvedParams, resolvedSearch] = await Promise.all([
    params,
    searchParams,
  ]);
  const { events, pagination }: UseEventsResult =
    await useEvents(resolvedSearch);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-6 justify-center items-center">
      <h1 className="font-semibold text-2xl text-gray-800">Events</h1>
      <SearchBar />
      <Filter />

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div>
          <ul className="grid gap-6 w-full grid-cols-3">
            {events.map((event) => (
              <li
                key={event.id}
                className="mb-4 flex flex-col gap-2 max-w-md w-full p-8 border border-gray-300 bg-white shadow-lg rounded-xl"
              >
                <Link href={`/events/${event.id}`}>
                  <h2 className="text-lg font-semibold">{event.title}</h2>
                </Link>
                <p>{event.description}</p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(event.event_date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            searchParams={resolvedSearch}
          />
        </div>
      )}
    </div>
  );
}
