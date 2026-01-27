import "server-only";
import { prisma } from "@/lib/db/prisma";

export const createEvent = async (
  title: string,
  description: string,
  eventDate: string,
) => {
  const newEvent = await prisma.event.create({
    data: {
      title,
      description,
      eventDate: new Date(eventDate),
    },
  });

  return newEvent;
};
