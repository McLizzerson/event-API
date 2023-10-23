import { PrismaClient } from "@prisma/client";

const getUsers = async (name) => {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany({
    where: {
      name,
    },
  });

  return users;
};

export default getUsers;
