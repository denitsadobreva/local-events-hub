import EventsClient from "./EventsClient";

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

  return <EventsClient searchParams={resolvedSearch} />;
}
