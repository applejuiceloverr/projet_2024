import React from 'react';
import { FaUserPlus, FaTrash, FaEdit,FaBookOpen } from 'react-icons/fa';

const StudentsTable = () => {
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
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2">
                <button className="delete-btn text-red-500 hover:text-red-700">
                      <FaTrash title="Delete" />
                    </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsTable;
