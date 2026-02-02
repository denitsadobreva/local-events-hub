"use server";

import { createEvent, updateEvent, deleteEventById } from "@/lib/db/events";

type EditEventInput = {
  eventId: string;
  title: string;
  description: string;
  eventDate: string;
};

export async function addNewEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const eventDate = formData.get("eventDate") as string;

  const newEvent = await createEvent(title, description, eventDate);

  if (!newEvent) {
    return { ok: false, message: "Failed to add new event" };
  }

  return { ok: true, message: "Event created successfully" };
}

export async function deleteEvent({ eventId }: { eventId: string }) {
  await deleteEventById(eventId);
  return { ok: true, message: "Event deleted" };
}

export async function editEvent(data: EditEventInput) {
  const { eventId, title, description, eventDate } = data;

  const updatedEvent = await updateEvent(
    eventId,
    title,
    description,
    eventDate,
  );

  if (!updatedEvent) {
    return { ok: false, message: "Failed to update event" };
  }

  return { ok: true, message: "Event updated successfully" };
}
