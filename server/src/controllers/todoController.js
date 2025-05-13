import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../services/todoService.js";
import catchAsync from "../utils/catchAsync.js";

const createNewTodo = catchAsync(async (req, res) => {
  const todo = await createTodo(req.user.id, req.body);
  res.status(201).json(todo);
});

const getAllTodos = catchAsync(async (req, res) => {
  const todos = await getTodos(req.user.id);
  res.json(todos);
});

const getSingleTodo = catchAsync(async (req, res) => {
  const todo = await getTodoById(req.params.id, req.user.id);
  res.json(todo);
});

const updateSingleTodo = catchAsync(async (req, res) => {
  const todo = await updateTodo(req.params.id, req.user.id, req.body);
  res.json(todo);
});

const removeTodo = catchAsync(async (req, res) => {
  const result = await deleteTodo(req.params.id, req.user.id);
  res.json(result);
});

export {
  createNewTodo,
  getAllTodos,
  getSingleTodo,
  updateSingleTodo,
  removeTodo,
};
