"use server";

import { sql } from "../../lib/db";
import type { Event } from "../../lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";

type EventPageProps = {
  params: Promise<{ eventId: string }>;
};

export async function deleteEvent(formData: FormData) {
  const eventId = formData.get("eventId") as string;
  await sql`
    DELETE FROM events
    WHERE id = ${eventId}
  `;

  redirect("/events");
}

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
        <form action={deleteEvent} className="mt-4">
          <input type="hidden" name="eventId" value={event.id} />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200 cursor-pointer"
          >
            Delete Event
          </button>
        </form>

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
