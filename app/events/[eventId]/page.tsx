import { sql } from "../../lib/db";
import type { Event } from "../../lib/types";
import Link from "next/link";

type EventPageProps = {
  params: { eventId: string };
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
    </>
  );
}
