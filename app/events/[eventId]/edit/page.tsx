import type { Event } from "../../../lib/types";
import { sql } from "../../../lib/db";
import { editEvent } from "../../actions";
import { getEventById } from "../../../lib/events";

export default async function EditPage({
  params,
}: {
  params: { eventId: string };
}) {
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
    <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-6 justify-center items-center">
      <h1 className="font-semibold text-2xl text-gray-800">Edit Event</h1>
      <form
        action={editEvent}
        className="flex flex-col gap-6 max-w-md w-full p-8 border border-gray-300 bg-white shadow-lg rounded-xl"
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm text-gray-600">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={event.title}
            required
            className="rounded-md px-3 py-1.5 outline-1 outline-gray-300 text-gray-900 mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm text-gray-600">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={event.description || ""}
            required
            className="rounded-md px-3 py-1.5 outline-1 outline-gray-300 text-gray-900 mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="event_date" className="text-sm text-gray-600">
            Event Date:
          </label>
          <input
            type="date"
            id="event_date"
            name="event_date"
            defaultValue={
              new Date(event.event_date).toISOString().split("T")[0]
            }
            required
            className="rounded-md px-3 py-1.5 outline-1 outline-gray-300 text-gray-900 mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <input type="hidden" name="eventId" value={event.id} />
        <button
          type="submit"
          className="cursor-pointer mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200 "
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
