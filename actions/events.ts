"use server";
import { redirect } from "next/navigation";
import { createEvent, updateEvent, deleteEventById } from "@/lib/db/events";

export async function addNewEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const event_date = formData.get("event_date") as string;

  const newEvent = await createEvent(title, description, event_date);
  if (newEvent.length === 0) {
    throw new Error("Failed to add new event");
  } else {
    console.log("New event added:", newEvent);
    redirect("/events");
  }
}

export async function deleteEvent(formData: FormData) {
  const eventId = formData.get("eventId") as string;
  await deleteEventById(eventId);

  redirect("/events");
}

export async function editEvent(formData: FormData) {
  const eventId = formData.get("eventId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const event_date = formData.get("event_date") as string;
  await updateEvent(eventId, title, description, event_date);
  redirect(`/events/${eventId}`);
}
