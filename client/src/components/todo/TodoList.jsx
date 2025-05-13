import { useContext, useEffect } from 'react';
import TodoContext from '../../context/TodoContext';
import { useToast } from '../../context/ToastContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, loading, error, fetchTodos, updateTodo, deleteTodo } =
    useContext(TodoContext);
  const { showToast } = useToast();

  useEffect(() => {
    const loadTodos = async () => {
      try {
        await fetchTodos();
      } catch (err) {
        showToast('Failed to load todos', 'error');
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    if (error) {
      showToast(error, 'error');
    }
  }, [error, showToast]);

  if (loading && todos.length === 0) {
    return (
      <div className='flex justify-center my-8'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
      </div>
    );
  }

  if (error && todos.length === 0) {
    return (
      <div className='bg-red-50 p-4 rounded-md my-6'>
        <div className='text-red-700'>{error}</div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className='bg-gray-50 p-8 rounded-md text-center my-6'>
        <p className='text-gray-600'>
          No todos found. Add a new one to get started!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Your Todos</h2>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
