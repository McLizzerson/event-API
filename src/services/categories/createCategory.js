import categoryData from "../../data/categories.json" assert { type: "json" };
import { v4 as uuid } from "uuid";

const createCategory = (name) => {
  const newCategory = {
    id: uuid(),
    name: name,
  };

  //   does this really work or is this for show?
  categoryData.categories.push(newCategory);
  return newCategory;
};

export default createCategory;
