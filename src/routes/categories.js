import express from "express";
import getCategories from "../services/categories/getCategories.js";
import getCategoryById from "../services/categories/getCategoryById.js";
import createCategory from "../services/categories/createCategory.js";
import deleteCategory from "../services/categories/deleteCategory.js";
import updateCategoryById from "../services/categories/updateCategoryById.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
  const categories = await getCategories();
  res.status(200).json(categories);
});

categoryRouter.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;
  const newCategory = await createCategory(name);
  res.status(201).json(newCategory);
});

categoryRouter.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await getCategoryById(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

categoryRouter.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedCategory = await updateCategoryById(id, name);
      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

categoryRouter.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCategoryId = await deleteCategory(id);
      res.status(200).json({
        message: `Category with id${deletedCategoryId} has been deleted`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default categoryRouter;
