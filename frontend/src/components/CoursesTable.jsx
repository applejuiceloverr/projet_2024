import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaBookOpen } from 'react-icons/fa';

const CoursesTable = () => {
  const [courses, setCourses] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));
  const teacherId = userData?.user?.id;

  useEffect(() => {
    if (!teacherId) return;

    // Fetch courses created by the logged-in teacher
    axios.get(`http://127.0.0.1:8000/courses/courses/teacher/${teacherId}/`)
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, [teacherId]);

  const handleDelete = (courseId) => {
    axios.delete(`http://127.0.0.1:8000/courses/courses/${courseId}/`)
      .then(() => {
        setCourses(courses.filter(course => course.id !== courseId));
      })
      .catch(error => {
        console.error('Error deleting course:', error);
      });
  };

  return (
    <div className="main-section p-4">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Courses Manager</h2>
            <a href="/NewCourse">
              <button className="add-user-btn bg-green-500 text-white px-4 py-2 rounded flex items-center">
                <FaBookOpen className="mr-2" />
                Add new course
              </button>
            </a>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2"></th>
                <th className="p-2">Course Name</th>
                <th className="p-2">Category</th>
                <th className="p-2">Number of Students</th>
                <th className="p-2">Successful Students</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id} className="hover:bg-gray-100">
                  <td className="p-2"></td>
                  <td className="p-2">{course.title}</td>
                  <td className="p-2">{course.category_detail.name}</td>
                  <td className="p-2"></td>
                  <td className="p-2"></td>
                  <td className="p-2">
                    <button 
                      className="delete-btn text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(course.id)}
                    >
                      <FaTrash title="Delete" />
                    </button>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td className="p-2 text-center" colSpan="6">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoursesTable;
