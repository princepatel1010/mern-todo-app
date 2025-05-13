import { useState, useContext } from 'react';
import TodoContext from '../../context/TodoContext';
import { useToast } from '../../context/ToastContext';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { addTodo, fetchTodos } = useContext(TodoContext);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await addTodo({ title, description });
      await fetchTodos();
      setTitle('');
      setDescription('');
      setError('');
      showToast('Todo added successfully!', 'success');
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Failed to add todo');
      showToast('Failed to add todo', 'error');
    }
  };

  return (
    <div className='mb-8 bg-white p-6 rounded-lg shadow-sm border'>
      <h2 className='text-xl font-semibold mb-4'>Add New Todo</h2>

      {error && (
        <div className='mb-4 p-3 bg-red-50 text-red-700 rounded-md'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='Enter todo title'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Description (optional)
          </label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='Enter todo description'
            rows='3'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
