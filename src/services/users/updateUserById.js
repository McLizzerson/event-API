import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const updateUserById = async (id, username, password, name, image) => {
  const prisma = new PrismaClient();

  const updatedUser = await prisma.user.updateMany({
    where: {
      id,
    },
    data: {
      username,
      password,
      name,
      image,
    },
  });

  if (!updatedUser || updatedUser.count === 0) {
    throw new NotFoundError("User", id);
  }
  return { message: `User with id ${id} has been updated succesfully!` };
};

export default updateUserById;
