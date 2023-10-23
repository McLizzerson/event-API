import { PrismaClient } from "@prisma/client";

const updateEventById = async (
  id,
  title,
  description,
  location,
  image,
  startTime,
  endTime,
  createdBy,
  categoryIds
) => {
  const prisma = new PrismaClient();

  const updatedEvent = await prisma.event.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy: createdBy
        ? {
            connect: { id: createdBy },
          }
        : undefined,
      categories: categoryIds
        ? {
            set: categoryIds.map((id) => ({ id })),
          }
        : undefined,
    },
  });

  return updatedEvent;
};

export default updateEventById;
