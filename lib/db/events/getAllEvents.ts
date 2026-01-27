import "server-only";
import { prisma } from "@/lib/db/prisma";

export const getAllEvents = async () => {
  const events = await prisma.event.findMany({
    orderBy: {
      eventDate: "desc",
    },
  });
  return events;
};
