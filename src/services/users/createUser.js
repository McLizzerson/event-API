import userData from "../../data/users.json" assert { type: "json" };
import { v4 as uuid } from "uuid";

const createUser = (username, password, name, image) => {
  const newUser = {
    id: uuid(),
    username: username,
    password: password,
    name: name,
    image: image,
  };

  //   does this really work or is this for show?
  userData.users.push(newUser);
  return newUser;
};

export default createUser;
