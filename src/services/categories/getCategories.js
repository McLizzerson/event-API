import categories from "../../data/categories.json" assert { type: "json" };

const getCategories = () => {
  console.log(categories);

  return categories;
};

export default getCategories;
