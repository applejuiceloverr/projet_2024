
import React from 'react';
import TeacherNavbar from '../components/Teachernavbar';
import Sidemenu from '../components/Sidemenu';
import CourseForm from '../components/CourseForm';

const NewCourse = () => {
  return (
    <div className="flex h-screen">
      {/* Side Menu */}
      <Sidemenu className="w-64 bg-gray-800 text-white" />

      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <TeacherNavbar className="bg-white text-black" />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex">
            {/* Spacer for margin */}
            <div className="w-64"></div>

            {/* Course Table */}
            <div className="flex-1 ml-4">
              <CourseForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCourse;
