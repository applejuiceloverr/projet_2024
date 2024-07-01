import React, { useState, useEffect } from 'react';
import { DiHtml5, DiCodeBadge, DiDatabase } from "react-icons/di";
import { AiFillGithub, AiOutlineArrowRight } from "react-icons/ai";
import { FaUser, FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const categories = [
    { id: 'Studentmanager', name: 'Manage students', icon: <FaUser /> },
    { id: 'Coursemanager', name: 'Manage courses', icon: <FaBookOpen /> },
    { id: 3, name: 'Web Dev', icon: <DiHtml5 /> },
    { id: 4, name: 'Coding', icon: <DiCodeBadge /> },
    { id: 5, name: 'Database', icon: <DiDatabase /> },
    { id: 1, name: 'Devops', icon: <AiFillGithub /> },
];

const CategoryCard = ({ id, name, icon }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${id}`);
    };

    return (
        <div onClick={handleClick} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:bg-black transition duration-300 group cursor-pointer">
            <div className="text-4xl text-black mb-4 group-hover:text-white">{icon}</div>
            <h2 className="text-xl font-bold mb-2 text-black group-hover:text-white">{name}</h2>
            <AiOutlineArrowRight className="text-[#00df9a] group-hover:text-white" />
        </div>
    );
};

const ManagementCards = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('user'));
        if (storedData && storedData.user) {
            setCurrentUser(storedData.user);
        }
    }, []);

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    const displayName = currentUser.nom || currentUser.username;

    // Slice the categories array to display only two items
    const displayedCategories = categories.slice(0, 2);

    return (
        <div className="ml-64"> {/* Adjust margin left to match the width of SideMenu */}
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#00df9a]">Welcome {displayName}</h1>
                    <p className="text-xl text-black mt-2">Manage your students and courses effortlessly in our tailored management space</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {displayedCategories.map((category, index) => (
                        <CategoryCard key={index} {...category} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManagementCards;
