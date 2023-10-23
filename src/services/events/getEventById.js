import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const getEventById = async (id) => {
  const prisma = new PrismaClient();

  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  if (!event) {
    throw new NotFoundError("Event", id);
  }
  return event;
};

export default getEventById;
