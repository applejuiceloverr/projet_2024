import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
const HomeUser = () => {
  const navigate = useNavigate();

  // Get user data from local storage
  const storedData = JSON.parse(localStorage.getItem('user'));
  const [currentUser, setCurrentUser] = useState(storedData ? storedData.user : null);

  useEffect(() => {
    if (!currentUser) {
      // If the user is not logged in, check local storage
      const storedData = JSON.parse(localStorage.getItem('user'));
      if (storedData && storedData.user) {
        setCurrentUser(storedData.user);
      }
    }
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const displayName = currentUser.nom || currentUser.username;

  return (
    <div>
      <NavBar />
      <h1 className="text-white">Welcome to your personal home page, {displayName}!</h1>
    </div>
  );
};

export default HomeUser;