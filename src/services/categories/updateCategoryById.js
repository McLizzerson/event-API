import categoryData from "../../data/categories.json" assert { type: "json" };
import NotFoundError from "../../errors/notFoundError.js";

const updateCategoryById = (id, name) => {
  const category = categoryData.categories.find(
    (category) => String(category.id) === String(id)
  );

  if (!category) {
    throw new NotFoundError("Category", id);
  }

  category.name = name ?? category.name;

  return category;
};

export default updateCategoryById;
