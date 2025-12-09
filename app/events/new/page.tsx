import { addNewEvent } from "../actions";

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
