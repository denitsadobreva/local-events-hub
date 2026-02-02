import "server-only";
import { prisma } from "@/lib/db/prisma";
import { parseId } from "@/lib/core";

export const updateEvent = async (
  eventId: string,
  title: string,
  description: string,
  eventDate: string,
) => {
  const id = parseId(eventId, "Event");

  const updatedEvent = await prisma.event.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      eventDate: new Date(eventDate),
    },
  });

  return updatedEvent;
};
