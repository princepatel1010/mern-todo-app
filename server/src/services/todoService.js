import Todo from "../models/todoModel.js";
import ApiError from "../utils/ApiError.js";

const createTodo = async (userId, todoData) => {
  const todo = await Todo.create({
    user: userId,
    ...todoData,
  });

  return todo;
};

const getTodos = async (userId) => {
  const todos = await Todo.find({ user: userId }).sort({ createdAt: -1 });
  return todos;
};

const getTodoById = async (todoId, userId) => {
  const todo = await Todo.findOne({ _id: todoId, user: userId });

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  return todo;
};

const updateTodo = async (todoId, userId, updateData) => {
  const todo = await Todo.findOne({ _id: todoId, user: userId });

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  Object.keys(updateData).forEach((key) => {
    todo[key] = updateData[key];
  });

  await todo.save();
  return todo;
};

const deleteTodo = async (todoId, userId) => {
  const todo = await Todo.findOne({ _id: todoId, user: userId });

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  await todo.deleteOne();
  return { message: "Todo removed" };
};

export { createTodo, getTodos, getTodoById, updateTodo, deleteTodo };
