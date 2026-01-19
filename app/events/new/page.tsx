import { addNewEvent } from "@/actions/events";

export default async function NewEventPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-6 justify-center items-center">
      <h1 className="font-semibold text-2xl text-gray-800">Add New Event</h1>
      <form
        action={addNewEvent}
        className="flex flex-col gap-6 max-w-md w-full p-8 border border-gray-300 bg-white shadow-lg rounded-xl "
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm text-gray-600">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
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
            required
            className="rounded-md px-3 py-1.5 outline-1 outline-gray-300 text-gray-900 mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 "
        >
          Add Event
        </button>
      </form>
    </div>
  );
}
