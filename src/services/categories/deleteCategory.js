import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const deleteCategory = async (id) => {
  const prisma = new PrismaClient();

  const deleteBook = await prisma.category.deleteMany({
    where: {
      id: id,
    },
  });

  if (!deleteBook || deleteBook.count === 0) {
    throw new NotFoundError("Category", id);
  }

  return id;
};

export default deleteCategory;
