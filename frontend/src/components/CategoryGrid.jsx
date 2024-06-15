// CategoryGrid.jsx
import React from 'react';
import { DiOnedrive, DiLinux, DiHtml5, DiCodeBadge, DiDatabase } from "react-icons/di";
import { AiFillGithub, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const categories = [
    { id: 6, name: 'Cloud', icon: <DiOnedrive /> },
    { id: 2, name: 'Linux', icon: <DiLinux /> },
    { id: 3, name: 'Web Dev', icon: <DiHtml5 /> },
    { id: 4, name: 'Coding', icon: <DiCodeBadge /> },
    { id: 5, name: 'Database', icon: <DiDatabase /> },
    { id: 1, name: 'Devops', icon: <AiFillGithub /> },
];

const CategoryCard = ({ id, name, icon }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/categories/${id}`);
    };

    return (
        <div onClick={handleClick} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:bg-black transition duration-300 group cursor-pointer">
            <div className="text-4xl text-black mb-4 group-hover:text-white">{icon}</div>
            <h2 className="text-xl font-bold mb-2 text-black group-hover:text-white">{name}</h2>
            <AiOutlineArrowRight className="text-[#00df9a] group-hover:text-white" />
        </div>
    );
};

const CategoryGrid = () => {
    return (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#00df9a]">Our Various Categories</h1>
                <p className="text-xl text-black mt-2">Explore a wide range of categories tailored to enhance your skills and knowledge.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                    <CategoryCard key={index} {...category} />
                ))}
            </div>
        </div>
    );
};

export default CategoryGrid;