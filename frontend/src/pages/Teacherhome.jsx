import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherNavbar from '../components/Teachernavbar';
import Sidemenu from '../components/Sidemenu';
import ManagementCards from '../components/Managementcards';

const Teacherhome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user'));
    if (!storedData || !storedData.user.is_staff) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidemenu className="w-64 bg-gray-800 text-white" />

      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <TeacherNavbar className="bg-white text-black" />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            {/* Management Cards */}
            <ManagementCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacherhome;
