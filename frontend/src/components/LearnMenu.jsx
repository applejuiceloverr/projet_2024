import React from 'react';
import { Link, useParams } from 'react-router-dom';

const LearnMenu = () => {
    const { courseId } = useParams();

    return (
        <div className="fixed left-0 top-0 h-full bg-black text-white w-64">
            <h1 className='text-3xl ml-4 mt-3 font-bold text-[#00df9a]'>CyberClassroom</h1>
            <div className="p-4">
                <div className="menu mt-4">
                    <ul className="space-y-2">
                        <li className="p-2 hover:bg-gray-700">
                            <Link to={`/FirstStep/${courseId}`} className="flex items-center">
                                <i className="fa fa-user-circle-o mr-3" aria-hidden="true"></i>
                                <span className="text">Read Course Material</span>
                            </Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to={`/SecondStep/${courseId}`} className="flex items-center">
                                <i className="fa fa-user-circle-o mr-3" aria-hidden="true"></i>
                                <span className="text">Watch And Practice</span>
                            </Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to={`/LastStep/${courseId}`} className="flex items-center">
                                <i className="fa fa-question-circle mr-3" aria-hidden="true"></i>
                                <span className="text">Quiz</span>
                            </Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/" className="flex items-center">
                                <i className="fa fa-question-circle mr-3" aria-hidden="true"></i>
                                <span className="text">Exit</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LearnMenu;
