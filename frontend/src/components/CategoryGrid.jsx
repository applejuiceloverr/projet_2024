// CategoryGrid.jsx
import React from 'react';
import { DiOnedrive, DiLinux, DiHtml5, DiCodeBadge, DiDatabase } from "react-icons/di";
import { AiFillGithub, AiOutlineArrowRight } from "react-icons/ai";

const categories = [
    { name: 'Cloud', icon: <DiOnedrive />, link: '/onedrive' },
    { name: 'Linux', icon: <DiLinux />, link: '/linux' },
    { name: 'Web Dev', icon: <DiHtml5 />, link: '/html5' },
    { name: 'Coding', icon: <DiCodeBadge />, link: '/coding' },
    { name: 'Database', icon: <DiDatabase />, link: '/database' },
    { name: 'Devops', icon: <AiFillGithub />, link: '/github' },
];

const CategoryCard = ({ name, icon, link }) => {
    return (
        <a href={link} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:bg-black transition duration-300 group">
            <div className="text-4xl text-black mb-4 group-hover:text-white">{icon}</div>
            <h2 className="text-xl font-bold mb-2 text-black group-hover:text-white">{name}</h2>
            <AiOutlineArrowRight className="text-[#00df9a] group-hover:text-white" />
        </a>
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
