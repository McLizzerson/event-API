import categoryData from "../../data/categories.json" assert { type: "json" };

const deleteCategory = (id) => {
  const categoryIndex = categoryData.categories.findIndex(
    (category) => String(category.id) === String(id)
  );

  if (categoryIndex === -1) {
    throw new Error(`Category with id ${id} was not found!`);
  }

  categoryData.categories.splice(categoryIndex, 1);

  return id;
};

export default deleteCategory;
