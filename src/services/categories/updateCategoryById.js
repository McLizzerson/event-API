import categoryData from "../../data/categories.json" assert { type: "json" };

const updateCategoryById = (id, name) => {
  const category = categoryData.categories.find(
    (category) => String(category.id) === String(id)
  );

  if (!category) {
    throw new Error(`Category with id${id} was not found!`);
  }

  category.name = name ?? category.name;

  return category;
};

export default updateCategoryById;
