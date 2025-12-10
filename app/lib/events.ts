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
