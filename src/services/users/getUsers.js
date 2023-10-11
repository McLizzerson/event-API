import userData from "../../data/users.json" assert { type: "json" };

const getUsers = (name) => {
  let users = userData.users;

  if (name) {
    users = userData.users.filter((user) => user.name === name);
  }

  return users;
};

export default getUsers;
