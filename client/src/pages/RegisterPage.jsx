import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Register from '../components/auth/Register';
import AuthContext from '../context/AuthContext';

const RegisterPage = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to='/' />;
  }

  return <Register />;
};

export default RegisterPage;
