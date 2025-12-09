"use server";

import type { Event } from "../../../lib/types";
import { sql } from "../../../lib/db";
import { redirect } from "next/navigation";

export async function editEvent(formData: FormData) {
  const eventId = formData.get("eventId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const event_date = formData.get("event_date") as string;
  await sql`
    UPDATE events
    SET title = ${title}, description = ${description}, event_date = ${event_date}
    WHERE id = ${eventId}
  `;
  redirect(`/events/${eventId}`);
}

export default async function EditPage({
  params,
}: {
  params: { eventId: string };
}) {
  const { eventId } = await params;

  const events = (await sql`
        SELECT *
        FROM events
        WHERE id = ${eventId}
      `) as Event[];

  const event = events.at(0) as Event;

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      <h1>Edit Event</h1>
      <form action={editEvent}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={event.title}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            defaultValue={event.description || ""}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="event_date">Event Date:</label>
          <input
            type="date"
            id="event_date"
            name="event_date"
            defaultValue={
              new Date(event.event_date).toISOString().split("T")[0]
            }
            required
          />
        </div>
        <input type="hidden" name="eventId" value={event.id} />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
