const Footer = () => {
  return (
    <footer className='bg-gray-100 py-4 mt-auto'>
      <div className='container mx-auto px-4 text-center text-gray-500 text-sm'>
        <p>
          &copy; {new Date().getFullYear()} MERN Todo App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
