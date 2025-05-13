import { useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className='h-6 w-6 text-green-500' />;
      case 'error':
        return <FaTimesCircle className='h-6 w-6 text-red-500' />;
      default:
        return <FaInfoCircle className='h-6 w-6 text-blue-500' />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className='fixed bottom-4 right-4 z-50 animate-slide-up'>
      <div
        className={`${getBgColor()} border rounded-lg shadow-lg p-4 max-w-md flex items-center`}
      >
        <div className='flex-shrink-0'>{getIcon()}</div>
        <div className='ml-3 flex-1'>
          <p className='text-sm font-medium text-gray-900'>{message}</p>
        </div>
        <button
          type='button'
          className='ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none'
          onClick={onClose}
        >
          <span className='sr-only'>Close</span>
          <svg
            className='h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
