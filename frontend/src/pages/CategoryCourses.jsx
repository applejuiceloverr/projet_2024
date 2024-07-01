import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footeer'; // Ensure this path is correct
import NavBar from '../components/NavBar'; // Ensure this path is correct

const CategoryCourses = () => {
    const { categoryId } = useParams();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/courses/categories/${categoryId}/courses/`)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        console.error(`Response status: ${response.status}, body: ${text}`);
                        throw new Error(`HTTP error! status: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Received data:', data);
                if (Array.isArray(data)) {
                    setCourses(data);
                } else {
                    console.error('Expected an array but got:', data);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation: ', error);
            });
    }, [categoryId]);

    return (
        <div className="">
            <NavBar />
            <div className="flex-grow container mx-auto sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-extrabold mb-12 text-center text-[#00df9a]">Courses</h1>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.isArray(courses) ? (
                        courses.map(course => (
                            <div key={course.id} className="bg-[#282A35] border border-gray-400 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="w-full h-48 overflow-hidden">
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover"/>
                                </div>
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold mb-2 text-white">{course.title}</h2>
                                    <p className="text-gray-400 mb-4">{course.description}</p>
                                    <Link to={`/detail/${course.id}`}>
                                        <button className="bg-[#00df9a] text-white px-4 py-2 rounded hover:bg-[#00b87a] transition duration-200">Learn More</button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-700 col-span-full">No courses found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CategoryCourses;
