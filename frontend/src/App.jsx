import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import HomeUser from './pages/HomeUser';
import NotFound from './pages/NotFound';
import './styles/index.css';
import Subscribe from './pages/Subscribe';
import Success from './pages/Success';
import CategoryCourses from './pages/CategoryCourses'; // import CategoryCourses

function Logout() {
  return <Navigate to="/Login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}
function CheckNotLogin({ children }) {
  const storedData = JSON.parse(localStorage.getItem('user'));
  const currentUser = storedData ? storedData.user : null;

  if (currentUser) {
    return <Navigate to="/homeuser" />;
  }

  return children;
}

function CheckLogin({ children }) {
  const storedData = JSON.parse(localStorage.getItem('user'));
  const currentUser = storedData ? storedData.user : null;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return React.cloneElement(children, { currentUser });
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Subscribe" element={<Subscribe />} />
        <Route path="/homeuser" element={<CheckLogin><HomeUser /></CheckLogin>} />
        <Route path="/login" element={<CheckNotLogin><Login /></CheckNotLogin>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/register" element={<CheckNotLogin><Register /></CheckNotLogin>} />
        <Route path="/categories/:categoryId" element={<CategoryCourses />} /> {/* add this line */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;