import users from "../../data/users.json" assert { type: "json" };

const getUsers = () => {
  console.log(users);

  return users;
};

export default getUsers;
