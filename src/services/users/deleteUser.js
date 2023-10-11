import userData from "../../data/users.json" assert { type: "json" };
import NotFoundError from "../../errors/notFoundError.js";

const deleteUser = (id) => {
  const userIndex = userData.users.findIndex(
    (user) => String(user.id) === String(id)
  );

  if (userIndex === -1) {
    throw new NotFoundError("User", id);
  }

  userData.users.splice(userIndex, 1);

  return id;
};

export default deleteUser;
