import express from "express";
import getCategories from "../services/categories/getCategories.js";
import getCategoryById from "../services/categories/getCategoryById.js";
import createCategory from "../services/categories/createCategory.js";
import deleteCategory from "../services/categories/deleteCategory.js";
import updateCategoryById from "../services/categories/updateCategoryById.js";
import authMiddleware from "../middleware/auth.js";

const categoryRouter = express.Router();

// First '/' routes, main routes

categoryRouter.get("/", (req, res) => {
  try {
    const categories = getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Something went wrong while getting list of categories!");
  }
});

categoryRouter.post("/", authMiddleware, (req, res) => {
  const { name } = req.body;
  const newCategory = createCategory(name);
  res.status(201).json(newCategory);
});

// Second '/:id' routes
categoryRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const category = getCategoryById(id);

  if (!category) {
    res.status(404).send(`Category with id ${id} was not found!`);
  } else {
    res.status(200).json(category);
  }
});

categoryRouter.put("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedCategory = updateCategoryById(id, name);
  res.status(200).json(updatedCategory);
});

categoryRouter.delete("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const deletedCategoryId = deleteCategory(id);

  if (!deletedCategoryId) {
    res.status(404).send(`Category with id${id} was not found!`);
  } else {
    res.status(200).json({
      message: `Category with id${deletedCategoryId} has been deleted`,
    });
  }
});

export default categoryRouter;
