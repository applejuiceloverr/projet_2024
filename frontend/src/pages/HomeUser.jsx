import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeUser = () => {
  const navigate = useNavigate();

  // Get user data from local storage
  const storedData = JSON.parse(localStorage.getItem('user'));
  const currentUser = storedData ? storedData.user : null;

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const displayName = currentUser.nom || currentUser.username;

  return (
    <div>
      <h1 className="text-white">Welcome to your personal home page, {displayName}!</h1>
    </div>
  );
};

export default HomeUser;