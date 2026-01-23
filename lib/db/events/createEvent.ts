import { prisma } from "@/lib/db/prisma";

export const createEvent = async (
  title: string,
  description: string,
  eventDate: string,
) => {
  const newEvent = await prisma.events.create({
    data: {
      title,
      description,
      event_date: new Date(eventDate),
    },
  });

  return newEvent;
};
