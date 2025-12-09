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
      <Link
        href="/events"
        className="text-gray-800 hover:text-gray-600 ml-10 mb-4"
      >
        &larr; Back to All Events
      </Link>
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-6 justify-center items-center">
        <h1 className="font-semibold text-2xl text-gray-800">{event.title}</h1>
        <p>{event.description}</p>
        <p>{new Date(event.event_date).toLocaleDateString()}</p>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <DeleteButton eventId={event.id.toString()} />

        <Link
          href={`/events/${event.id}/edit`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
        >
          Edit Event
        </Link>
      </div>
    </>
  );
}
