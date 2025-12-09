import { sql } from "../../lib/db";
import type { Event } from "../../lib/types";
import Link from "next/link";
import DeleteButton from "@/app/ui/components/DeleteButton";

type EventPageProps = {
  params: Promise<{ eventId: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { eventId } = await params;
  const events = (await sql`
    SELECT *
    FROM events
    WHERE id = ${eventId}
  `) as Event[];

  const event = events.at(0);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <>
      <Link href="/events" className="text-purple-800 hover:text-purple-500">
        &larr; Back to Events
      </Link>
      <div>
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <p>{new Date(event.event_date).toLocaleDateString()}</p>
      </div>
      <div className="flex gap-4">
        <DeleteButton eventId={event.id.toString()} />

        <Link
          href={`/events/${event.id}/edit`}
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
        >
          Edit Event
        </Link>
      </div>
    </>
  );
}
