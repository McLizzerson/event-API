import categoryData from "../../data/categories.json" assert { type: "json" };

const getCategoryById = (id) => {
  const categories = categoryData.categories;

  return categories.find((category) => category.id === id);
};

export default getCategoryById;
