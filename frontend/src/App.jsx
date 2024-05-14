import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import HomeUser from './pages/HomeUser';
import NotFound from './pages/NotFound';
import './styles/index.css';

function Logout() {
  return <Navigate to="/Login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

// New component that checks if the user is logged in
function CheckLogin({ children }) {
  const storedData = JSON.parse(localStorage.getItem('user'));
  const currentUser = storedData ? storedData.user : null;

  if (currentUser) {
    // If the user is logged in, redirect them to the /homeuser page
    return <Navigate to="/homeuser" />;
  }

  // If the user is not logged in, render the children
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckLogin><Home /></CheckLogin>} />
        <Route path="/home" element={<CheckLogin><Home /></CheckLogin>} />
        <Route path="/homeuser" element={<HomeUser />} />
        <Route path="/login" element={<CheckLogin><Login /></CheckLogin>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<CheckLogin><RegisterAndLogout /></CheckLogin>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;