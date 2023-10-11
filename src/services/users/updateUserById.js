import userData from "../../data/users.json" assert { type: "json" };
import NotFoundError from "../../errors/notFoundError.js";

const updateUserById = (id, username, password, name, image) => {
  const user = userData.users.find((user) => String(user.id) === String(id));

  if (!user) {
    throw new NotFoundError("User", id);
  }

  user.username = username ?? user.username;
  user.password = password ?? user.password;
  user.name = name ?? user.name;
  user.image = image ?? user.image;

  return user;
};

export default updateUserById;
