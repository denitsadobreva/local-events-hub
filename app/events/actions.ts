"use server";
import { sql } from "../lib/db";
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

export async function deleteEvent(formData: FormData) {
  const eventId = formData.get("eventId") as string;
  await sql`
    DELETE FROM events
    WHERE id = ${eventId}
  `;

  redirect("/events");
}

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
