import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className='bg-indigo-600 text-white'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <Link to='/' className='text-xl font-bold'>
          TodoApp
        </Link>

        <nav>
          <ul className='flex space-x-4'>
            {user ? (
              <>
                <li className='px-2'>
                  <span>Hello, {user.name}</span>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className='bg-indigo-700 px-3 py-1 rounded hover:bg-indigo-800'
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/login' className='hover:text-indigo-200'>
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to='/register'
                    className='bg-indigo-700 px-3 py-1 rounded hover:bg-indigo-800'
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
