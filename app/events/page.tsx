import EventsClient from "./EventsClient";
import EventsHeader from "./EventsHeader";

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
      <EventsHeader />
      <EventsClient searchParams={resolvedSearch} />
    </div>
  );
}
