import { createContext, useState } from 'react';
import axiosInstance from '../config/axios';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axiosInstance.get('/todos');
      setTodos(data);
      setLoading(false);
      return data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Failed to fetch todos';
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  const addTodo = async (todoData) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axiosInstance.post('/todos', todoData);
      setTodos([data, ...todos]);
      setLoading(false);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add todo';
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axiosInstance.put(`/todos/${id}`, todoData);
      setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
      setLoading(false);
      return data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Failed to update todo';
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await axiosInstance.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
      setLoading(false);
      return true;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Failed to delete todo';
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        fetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
