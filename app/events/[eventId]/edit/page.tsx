import { getEventById } from "@/lib/db/events";
import EditEventForm from "./EditEventForm";
import { parseId } from "@/lib/utils";

export default async function EditPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const event = await getEventById(parseId(eventId, "Event"));

  if (!event) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8 flex justify-center items-center">
        Event not found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-6 items-center">
      <h1 className="font-semibold text-2xl text-gray-800">Edit Event</h1>

      <EditEventForm
        eventId={event.id.toString()}
        defaultValues={{
          title: event.title,
          description: event.description ?? "",
          eventDate: event.eventDate.toISOString().split("T")[0],
        }}
      />
    </div>
  );
}
