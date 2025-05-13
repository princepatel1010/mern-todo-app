import { useState } from 'react';
import { FaEdit, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { useToast } from '../../context/ToastContext';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const { showToast } = useToast();

  const handleUpdate = async () => {
    try {
      await onUpdate(todo.id, { title, description });
      setIsEditing(false);
      showToast('Todo updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update todo', 'error');
    }
  };

  const toggleCompleted = async () => {
    try {
      await onUpdate(todo.id, { completed: !todo.completed });
      showToast(
        `Todo marked as ${!todo.completed ? 'completed' : 'incomplete'}`,
        'success'
      );
    } catch (error) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(todo.id);
      showToast('Todo deleted successfully!', 'success');
    } catch (error) {
      showToast('Failed to delete todo', 'error');
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 mb-4 shadow-sm ${
        todo.completed ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      {isEditing ? (
        <div className='space-y-3'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border rounded p-2 mb-2'
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full border rounded p-2 mb-2'
            rows='2'
          />
          <div className='flex justify-end gap-2'>
            <button
              onClick={() => setIsEditing(false)}
              className='px-3 py-1 rounded text-gray-700 border border-gray-300 hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className='px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700'
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className='flex items-start justify-between'>
            <div className='flex items-start gap-2'>
              <button onClick={toggleCompleted} className='mt-1 text-lg'>
                {todo.completed ? (
                  <FaCheckCircle className='text-green-600' />
                ) : (
                  <FaRegCircle className='text-gray-400' />
                )}
              </button>
              <div className='flex-1'>
                <h3
                  className={`text-lg font-medium ${
                    todo.completed
                      ? 'line-through text-gray-500'
                      : 'text-gray-900'
                  }`}
                >
                  {todo.title}
                </h3>
                {todo.description && (
                  <p
                    className={`mt-1 text-sm ${
                      todo.completed ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {todo.description}
                  </p>
                )}
                <p className='text-xs text-gray-400 mt-1'>
                  {new Date(todo.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => setIsEditing(true)}
                className='text-gray-500 hover:text-blue-600'
              >
                <FaEdit />
              </button>
              <button
                onClick={handleDelete}
                className='text-gray-500 hover:text-red-600'
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
