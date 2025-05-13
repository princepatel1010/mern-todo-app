import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { loginSchema } from '../../validations/authValidation';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [apiError, setApiError] = useState('');
  const { login, loading } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setApiError('');

    try {
      await login(data);
      showToast('Login successful!', 'success');
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setApiError(errorMessage);
      showToast(errorMessage, 'error');
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>

        {apiError && (
          <div className='rounded-md bg-red-50 p-4'>
            <div className='flex'>
              <div className='text-sm text-red-700'>{apiError}</div>
            </div>
          </div>
        )}

        <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email address
              </label>
              <input
                id='email'
                type='email'
                autoComplete='email'
                className={`mt-1 block w-full rounded-md border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder='Email address'
                {...register('email')}
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <input
                id='password'
                type='password'
                autoComplete='current-password'
                className={`mt-1 block w-full rounded-md border ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder='Password'
                {...register('password')}
              />
              {errors.password && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={isSubmitting || loading}
              className='group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400'
            >
              {isSubmitting || loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className='flex items-center justify-center'>
            <div className='text-sm'>
              Don't have an account?{' '}
              <Link
                to='/register'
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
