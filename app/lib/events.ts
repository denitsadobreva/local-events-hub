import { sql } from "./db";

export const getAllEvents = async () => {
  const events = await sql`SELECT * FROM events ORDER BY event_date DESC`;
  return events;
};

export const getEventById = async (eventId: string) => {
  const events = await sql`
    SELECT * FROM events
    WHERE id = ${eventId}
  `;
  return events[0];
};

export const createEvent = async (
  title: string,
  description: string,
  event_date: string
) => {
  const newEvent = await sql`
    INSERT INTO events (title, description, event_date)
    VALUES (${title}, ${description}, ${event_date})
    RETURNING *
  `;
  return newEvent[0];
};

export const updateEvent = async (
  eventId: string,
  title: string,
  description: string,
  event_date: string
) => {
  await sql`
    UPDATE events
    SET title = ${title}, description = ${description}, event_date = ${event_date}
    WHERE id = ${eventId}
  `;
};

export const deleteEventById = async (eventId: string) => {
  await sql`
    DELETE FROM events
    WHERE id = ${eventId}
  `;
};

export const filterEvents = async (
  query: string = "",
  from: string,
  to: string
) => {
  const hasQuery = !!(query && query.trim().length > 0);
  const hasFrom = !!(from && from.trim().length > 0);
  const hasTo = !!(to && to.trim().length > 0);

  const searchString = hasQuery ? `%${query}%` : "";

  const events = await sql`
    SELECT *
    FROM events
    WHERE
      (
        ${hasQuery} = false
        OR title ILIKE ${searchString}
        OR description ILIKE ${searchString}
      )
      AND (
        ${hasFrom} = false
        OR event_date >= ${from}
      )
      AND (
        ${hasTo} = false
        OR event_date <= ${to}
      )
    ORDER BY event_date DESC
  `;

  return events;
};
