import categoryData from "../../data/categories.json" assert { type: "json" };
import NotFoundError from "../../errors/notFoundError.js";

const getCategoryById = (id) => {
  const category = categoryData.categories.find(
    (category) => String(category.id) === String(id)
  );

  if (!category) {
    throw new NotFoundError("Category", id);
  }

  return category;
};

export default getCategoryById;
