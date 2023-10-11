import categoryData from "../../data/categories.json" assert { type: "json" };

const getCategoryById = (id) => {
  const category = categoryData.categories.find(
    (category) => String(category.id) === String(id)
  );

  return category;
};

export default getCategoryById;
