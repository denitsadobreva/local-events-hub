import { prisma } from "@/lib/db/prisma";
import { parseId } from "@/lib/utils";

export const updateEvent = async (
  eventId: string,
  title: string,
  description: string,
  eventDate: string,
) => {
  const id = parseId(eventId, "Event");

  const updatedEvent = await prisma.events.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      event_date: new Date(eventDate),
    },
  });

  return updatedEvent;
};
