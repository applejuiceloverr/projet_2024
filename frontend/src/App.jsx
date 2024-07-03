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
import CodeEditor from './pages/CodeEditor';
import Detail from './pages/Detail';
import Teacherhome from './pages/Teacherhome';
import ManageCourses from './pages/ManageCourses';
import ManageStudents from './pages/ManageStudents';
import NewCourse from './pages/NewCourse';
import FirstStep from './pages/FirstStep';
import SecondStep from './pages/SecondStep';
import LastStep from './pages/LastStep';
import Congratulations from './pages/congratulations';
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

function CheckSubscription({ children }) {
  const storedData = JSON.parse(localStorage.getItem('user'));
  const currentUser = storedData ? storedData.user : null;
  const isSubscribed = currentUser ? currentUser.is_sub : false;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!isSubscribed) {
    return <Navigate to="/Subscribe" />;
  }

  return React.cloneElement(children, { currentUser });
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:courseId" element={<Detail />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/Subscribe" element={<CheckLogin><Subscribe /></CheckLogin>} />
        <Route path="/homeuser" element={<CheckLogin><HomeUser /></CheckLogin>} />
        <Route path="/login" element={<CheckNotLogin><Login /></CheckNotLogin>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/success" element={<CheckLogin><Success /></CheckLogin>} />
        <Route path="/register" element={<CheckNotLogin><Register /></CheckNotLogin>} />
        <Route path="/categories/:categoryId" element={<CategoryCourses />} /> 
        <Route path="/code-editor" element={<CodeEditor />} />
        <Route path="/teacher" element={<CheckLogin><Teacherhome /></CheckLogin>} />
        <Route path="/CourseManager" element={<CheckLogin><ManageCourses /></CheckLogin>} />
        <Route path="/StudentManager" element={<CheckLogin><ManageStudents /></CheckLogin>} />
        <Route path="/NewCourse" element={<CheckLogin><NewCourse /></CheckLogin>} />
        <Route path="/FirstStep/:courseId" element={<CheckSubscription><FirstStep /></CheckSubscription>} />
        <Route path="/SecondStep/:courseId" element={<CheckSubscription><SecondStep /></CheckSubscription>} />
        <Route path="/LastStep/:courseId" element={<CheckSubscription><LastStep /></CheckSubscription>} />
        <Route path="/NewCourse" element={<NewCourse />} />
        <Route path="/congratulations/:courseId" element={<CheckSubscription><Congratulations /></CheckSubscription>} />        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
