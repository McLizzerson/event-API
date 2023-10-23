import { PrismaClient } from "@prisma/client";

const createUser = async (username, password, name, image) => {
  const prisma = new PrismaClient();

  return prisma.user.create({
    data: {
      username: username,
      password: password,
      name: name,
      image: image,
    },
  });
};

export default createUser;
