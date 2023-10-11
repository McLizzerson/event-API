import categoryData from "../../data/categories.json" assert { type: "json" };

const updateCategoryById = (id, name) => {
  const category = categoryData.categories.find(
    (category) => category.id === id
  );

  category.name = name ?? category.name;

  return category;
};

const example = updateCategoryById(1, "snibble");
console.log(example);

export default updateCategoryById;
