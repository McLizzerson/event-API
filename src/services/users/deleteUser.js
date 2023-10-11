import userData from "../../data/users.json" assert { type: "json" };

const deleteUser = (id) => {
  const userIndex = userData.users.findIndex(
    (user) => String(user.id) === String(id)
  );

  if (userIndex === -1) {
    throw new Error(`User with id ${id} was not found!`);
  }

  userData.users.splice(userIndex, 1);

  return id;
};

export default deleteUser;
