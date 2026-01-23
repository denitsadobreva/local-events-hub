import { prisma } from "@/lib/db/prisma";
import { parseId } from "@/lib/utils";

export const getEventById = async (eventId: string) => {
  const id = parseId(eventId, "Event");

  const event = await prisma.events.findUnique({
    where: {
      id,
    },
  });
  return event;
};
