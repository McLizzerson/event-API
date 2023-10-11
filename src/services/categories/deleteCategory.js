import categoryData from "../../data/categories.json" assert { type: "json" };

const deleteCategory = (id) => {
  const categoryIndex = categoryData.categories.findIndex(
    (category) => category.id === id
  );

  categoryData.categories.splice(categoryIndex, 1);

  return id;
};

const example = deleteCategory(1);
console.log(example);

export default deleteCategory;
