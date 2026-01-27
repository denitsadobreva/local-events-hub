import "server-only";
import { prisma } from "@/lib/db/prisma";

export const getEventById = async (eventId: number) => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });
  return event;
};
