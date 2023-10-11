import categoryData from "../../data/categories.json" assert { type: "json" };
import NotFoundError from "../../errors/notFoundError.js";

const deleteCategory = (id) => {
  const categoryIndex = categoryData.categories.findIndex(
    (category) => String(category.id) === String(id)
  );

  if (categoryIndex === -1) {
    throw new NotFoundError("Category", id);
  }

  categoryData.categories.splice(categoryIndex, 1);

  return id;
};

export default deleteCategory;
