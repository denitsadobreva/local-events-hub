import { prisma } from "@/lib/db/prisma";

export const filterEvents = async (
  query?: string,
  from?: string,
  to?: string,
) => {
  const where: any = {};

  if (query?.trim()) {
    where.OR = [
      {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: query,
          mode: "insensitive",
        },
      },
    ];
  }

  if (from?.trim() || to?.trim()) {
    where.event_date = {
      ...(from && { gte: new Date(from) }),
      ...(to && { lte: new Date(to) }),
    };
  }

  return prisma.events.findMany({
    where,
    orderBy: {
      event_date: "desc",
    },
  });
};
