import userData from "../../data/users.json" assert { type: "json" };

const deleteUser = (id) => {
  const userIndex = userData.users.findIndex((user) => user.id === id);

  userData.users.splice(userIndex, 1);

  return id;
};

const example = deleteUser(1);
console.log(example);

export default deleteUser;
