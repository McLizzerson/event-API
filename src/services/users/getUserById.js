import userData from "../../data/users.json" assert { type: "json" };

const getUserById = (id) => {
  const users = userData.users;

  return users.find((user) => user.id === id);
};

export default getUserById;
