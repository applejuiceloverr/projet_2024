import React from 'react';
import { Link } from 'react-router-dom';


const SideMenu = () => {
    return (
        <div className="fixed left-0 h-full bg-black text-white w-64">
            <br></br>
            <h1 className='text-3xl ml-4 mt-3 font-bold text-[#00df9a]'>CyberClassroom</h1>
            <div className="p-4">
                <div className="menu mt-4">
                    <ul className="space-y-2">
                    <li className="p-2 hover:bg-gray-700">
                            <Link to="/teacher" className="flex items-center">
                                <i className="fa fa-user-circle-o mr-3" aria-hidden="true"></i>
                                <span className="text">Home</span>
                            </Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/CourseManager" className="flex items-center">
                                <i className="fa fa-user-circle-o mr-3" aria-hidden="true"></i>
                                <span className="text">Manage courses</span>
                            </Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/StudentManager" className="flex items-center">
                                <i className="fa fa-question-circle mr-3" aria-hidden="true"></i>
                                <span className="text">Manage students</span>
                            </Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/ajouter_faq" className="flex items-center">
                                <i className="fa fa-question-circle mr-3" aria-hidden="true"></i>
                                <span className="text">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;
