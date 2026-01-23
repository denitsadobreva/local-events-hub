import { prisma } from "@/lib/db/prisma";
import { parseId } from "@/lib/utils";

export const deleteEventById = async (eventId: string) => {
  const id = parseId(eventId, "Event");

  await prisma.events.delete({
    where: {
      id,
    },
  });
};
