import express from "express";
import getCategories from "../services/categories/getCategories.js";
import getCategoryById from "../services/categories/getCategoryById.js";
import createCategory from "../services/categories/createCategory.js";
import deleteCategory from "../services/categories/deleteCategory.js";
import updateCategoryById from "../services/categories/updateCategoryById.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const categoryRouter = express.Router();

categoryRouter.get("/", (req, res) => {
  const categories = getCategories();
  res.status(200).json(categories);
});

categoryRouter.post("/", authMiddleware, (req, res) => {
  const { name } = req.body;
  const newCategory = createCategory(name);
  res.status(201).json(newCategory);
});

categoryRouter.get(
  "/:id",
  (req, res) => {
    const { id } = req.params;
    const category = getCategoryById(id);
    res.status(200).json(category);
  },
  notFoundErrorHandler
);

categoryRouter.put(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = updateCategoryById(id, name);
    res.status(200).json(updatedCategory);
  },
  notFoundErrorHandler
);

categoryRouter.delete(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const deletedCategoryId = deleteCategory(id);
    res.status(200).json({
      message: `Category with id${deletedCategoryId} has been deleted`,
    });
  },
  notFoundErrorHandler
);

export default categoryRouter;
