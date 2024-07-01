import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherNavbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user'));
    const currentUser = storedData ? storedData.user : null;
    setLoggedIn(currentUser ? true : false);
  }, []);

  const handleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };

  const logout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/account/logout/');
      localStorage.removeItem('user');
      setLoggedIn(false);
      navigate('/home');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
    </div>
  );
};

export default TeacherNavbar;
