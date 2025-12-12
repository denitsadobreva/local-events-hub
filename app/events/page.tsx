import Link from "next/link";
import { getAllEvents, searchEvents } from "../lib/events";
import SearchBar from "../ui/components/SearchBar";

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

  console.log("Params:", resolvedParams);
  console.log("Search Params:", resolvedSearch);

  let events = [];
  if (resolvedSearch.query) {
    events = await searchEvents(resolvedSearch.query as string);
  } else {
    events = await getAllEvents();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-6 justify-center items-center">
      <h1 className="font-semibold text-2xl text-gray-800">Events</h1>
      <SearchBar />
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
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
      )}
    </div>
  );
}
