import userData from "../../data/users.json" assert { type: "json" };

const updateUserById = (id, username, password, name, image) => {
  const user = userData.users.find((user) => String(user.id) === String(id));

  user.username = username ?? user.username;
  user.password = password ?? user.password;
  user.name = name ?? user.name;
  user.image = image ?? user.image;

  return user;
};

export default updateUserById;
