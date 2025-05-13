import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import TodoForm from '../components/todo/TodoForm';
import TodoList from '../components/todo/TodoList';
import { TodoProvider } from '../context/TodoContext';

const HomePage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to='/login' />;
  }

  return (
    <TodoProvider>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid md:grid-cols-3 gap-8'>
          <div className='md:col-span-1'>
            <TodoForm />
          </div>
          <div className='md:col-span-2'>
            <TodoList />
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default HomePage;
