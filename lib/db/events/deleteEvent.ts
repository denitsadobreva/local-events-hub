import "server-only";
import { prisma } from "@/lib/db/prisma";
import { parseId } from "@/lib/core";

export const deleteEventById = async (eventId: string) => {
  const id = parseId(eventId, "Event");

  await prisma.event.delete({
    where: {
      id,
    },
  });
};
