import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));
  const teacherId = userData?.user?.id;

  useEffect(() => {
    if (!teacherId) return;

    axios.get(`http://127.0.0.1:8000/courses/students-in-courses/${teacherId}/`)
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, [teacherId]);



  return (
    <div className="main-section p-4">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Students Manager</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2"></th>
                <th className="p-2">First Name</th>
                <th className="p-2">Last Name</th>
                <th className="p-2">Course</th>
                <th className="p-2">State</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2"></td>
                  <td className="p-2">{student.first_name}</td>
                  <td className="p-2">{student.last_name}</td>
                  <td className="p-2">{student.course}</td>
                  <td className="p-2">
                    {student.passed ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                  </td>
                  <td className="p-2">

                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td className="p-2 text-center" colSpan="6">
                    No students found.
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

export default StudentsTable;
