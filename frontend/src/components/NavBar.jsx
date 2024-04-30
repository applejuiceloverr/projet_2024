import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';


const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const closeNav = () => {
    setNav(false);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className=' text-3xl font-bold text-[#00df9a]'>TEST.</h1>
      <ul className='hidden md:flex'>
        <li className='p-4 hover:text-[#00df9a] transition duration-500 ease-in-out'>Home</li>
        <li className='p-4 hover:text-[#00df9a] transition duration-500 ease-in-out'>About</li>
        <li className='relative group p-4 hover:text-[#00df9a] transition duration-500 ease-in-out' onClick={handleDropdown}>
          <div className='flex justify-between items-center'>
            Categories
            <svg className='w-2.5 h-2.5 ms-2.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d={dropdown ? 'M1 5L5 1L9 5' : 'M1 1L5 5L9 1'} />
            </svg>
          </div>
          {dropdown && (
            <div className='absolute left-0 w-[200px] mt-2 py-2 bg-gray-800 text-white rounded-lg shadow-xl'>
              <ul className='py-2 text-sm text-gray-700 dark:text-gray-400' aria-labelledby='dropdownLargeButton'>
                <li className='px-4 py-2 hover:bg-gray-700'>Web Development</li>
                <li className='px-4 py-2 hover:bg-gray-700'>Database Management</li>
                <li className='px-4 py-2 hover:bg-gray-700'>Cloud Services</li>
              </ul>
            </div>
          )}
        </li>
        <li className='p-4 hover:text-[#00df9a] transition duration-500 ease-in-out'>Contact</li>
        <li className='p-4 hover:text-[rgb(0,223,154)] transition duration-500 ease-in-out'>Login</li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[80%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'fixed left-0 top-0 w-[80%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 transform translate-x-[-100%]'} onClick={closeNav}>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>
        <li className='p-4 border-b border-gray-600 hover:text-[#00df9a] transition duration-500 ease-in-out'>Home</li>
        <li className='p-4 border-b border-gray-600 hover:text-[#00df9a] transition duration-500 ease-in-out'>About</li>
        <li className='relative group p-4 border-b border-gray-600 hover:text-[#00df9a] transition duration-500 ease-in-out' onClick={handleDropdown}>
          Categories
          {dropdown && (
            <ul className='absolute left-0 w-full mt-2 py-2 bg-gray-800 text-white rounded-lg shadow-xl'>
              <li className='px-4 py-2 border-b border-gray-600 hover:bg-gray-700'>Web Development</li>
              <li className='px-4 py-2 border-b border-gray-600 hover:bg-gray-700'>Database Management</li>
              <li className='px-4 py-2  border-gray-600 hover:bg-gray-700'>Cloud Services</li>
            </ul>
          )}
        </li>
        <li className='p-4 border-b border-gray-600 hover:text-[#00df9a] transition duration-500 ease-in-out'>Contact</li>
        <li className='p-4 hover:text-[#00df9a] transition duration-500 ease-in-out'>Login</li>
      </ul>
    </div>
  );
};

export default Navbar;
