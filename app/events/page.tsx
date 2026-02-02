import EventsClient from "./EventsClient";
import Filter from "@/components/Filter";
import SearchBar from "@/components/SearchBar";

export default async function EventsPage({
  params,
  searchParams,
}: {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{
    query?: string;
    from?: string;
    to?: string;
    page?: string;
  }>;
}) {
  const [resolvedParams, resolvedSearch] = await Promise.all([
    params,
    searchParams,
  ]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-6 justify-center items-center">
      <h1 className="font-semibold text-2xl text-gray-800">Events</h1>
      <SearchBar />
      <Filter />
      <EventsClient searchParams={resolvedSearch} />
    </div>
  );
}
