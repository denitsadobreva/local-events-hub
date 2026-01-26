"use server";
import { redirect } from "next/navigation";
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
  if (newEvent == null) {
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

export async function editEvent(data: EditEventInput) {
  const { eventId, ...rest } = data;
  const { title, description, eventDate } = rest;

  await updateEvent(eventId, title, description, eventDate);
  redirect(`/events/${eventId}`);
}
