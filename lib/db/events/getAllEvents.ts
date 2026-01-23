import { prisma } from "@/lib/db/prisma";

export const getAllEvents = async () => {
  const events = await prisma.events.findMany({
    orderBy: {
      event_date: "desc",
    },
  });
  return events;
};
