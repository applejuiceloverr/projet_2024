// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import HomeUser from './pages/HomeUser'; // import the new page
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/index.css';

function Logout() {
  return <Navigate to="/Login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* make the /home route not protected */}
        <Route path="/home" element={<Home />} />
        <Route path="/homeuser" element={<HomeUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;