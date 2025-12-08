import { sql } from "../lib/db";
import Link from "next/link";

export default async function EventsPage() {
  const events = await sql`
    SELECT id, title, description, event_date 
    FROM events 
    ORDER BY id DESC
  `;

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-4">
            <Link href={`/events/${event.id}`}>
              <h2 className="text-lg font-semibold">{event.title}</h2>
            </Link>
            <p>{event.description}</p>
            <p className="text-sm text-gray-600">
              Date: {new Date(event.event_date).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
