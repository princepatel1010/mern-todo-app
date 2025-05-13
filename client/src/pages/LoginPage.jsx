import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to='/' />;
  }

  return <Login />;
};

export default LoginPage;
