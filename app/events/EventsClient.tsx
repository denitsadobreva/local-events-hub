"use client";

import { useEvents } from "@/hooks/useEvents";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";

export default function EventsClient({
  searchParams,
}: {
  searchParams: {
    query?: string;
    from?: string;
    to?: string;
    page?: string;
  };
}) {
  const { events, pagination, loading } = useEvents({
    query: searchParams.query,
    from: searchParams.from,
    to: searchParams.to,
    page: Number(searchParams.page) || 1,
  });

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
                  Date: {new Date(event.eventDate).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            searchParams={searchParams}
          />
        </div>
      )}
    </div>
  );
}
