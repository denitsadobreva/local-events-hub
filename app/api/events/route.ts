import { filterEvents, getAllEvents } from "@/lib/db/events";

function normalizeParam(param: string | null) {
  return param ?? undefined;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = normalizeParam(searchParams.get("query"));
  const from = normalizeParam(searchParams.get("from"));
  const to = normalizeParam(searchParams.get("to"));

  const events =
    query || from || to
      ? await filterEvents(query, from, to)
      : await getAllEvents();

  return Response.json(events);
}
