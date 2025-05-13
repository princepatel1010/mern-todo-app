import express from "express";
import {
  createNewTodo,
  getAllTodos,
  getSingleTodo,
  updateSingleTodo,
  removeTodo,
} from "../controllers/todoController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validations/todoValidation.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(getAllTodos)
  .post(validate(createTodoSchema), createNewTodo);

router
  .route("/:id")
  .get(getSingleTodo)
  .put(validate(updateTodoSchema), updateSingleTodo)
  .delete(removeTodo);

export default router;
