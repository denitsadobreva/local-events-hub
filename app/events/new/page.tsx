"use server";

import { sql } from "../../lib/db";
import { redirect } from "next/navigation";

export async function addNewEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const event_date = formData.get("event_date") as string;
  const newEvent =
    await sql`INSERT INTO events (title, description, event_date) VALUES (${title}, ${description}, ${event_date}) RETURNING *`;
  if (newEvent.length === 0) {
    throw new Error("Failed to add new event");
  } else {
    console.log("New event added:", newEvent);
    redirect("/events");
  }
}

export default async function NewEventPage() {
  return (
    <div>
      <h1>Add New Event</h1>
      <p>On this page you can add a new event.</p>
      <form action={addNewEvent} className="flex flex-col gap-4">
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" required></textarea>
        </div>
        <div>
          <label htmlFor="event_date">Event Date:</label>
          <input type="date" id="event_date" name="event_date" required />
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}
