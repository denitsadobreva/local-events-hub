import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { getEventById } from "@/lib/db/events";
import type { Event } from "@/lib/types/types";

type EventPageProps = {
  params: Promise<{ eventId: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { eventId } = await params;
  const event = (await getEventById(eventId)) as Event;

  if (!event) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8 flex justify-center items-center">
        Event not found
      </div>
    );
  }

  return (
    <>
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
