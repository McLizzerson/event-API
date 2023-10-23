import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const deleteEvent = async (id) => {
  const prisma = new PrismaClient();

  const deletedEvent = await prisma.event.deleteMany({
    where: {
      id,
    },
  });

  if (!deletedEvent || deletedEvent.count === 0) {
    throw new NotFoundError("Event", id);
  }

  return id;
};

export default deleteEvent;
