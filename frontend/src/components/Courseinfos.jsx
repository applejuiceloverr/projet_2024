// Courseinfos.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Courseinfos = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/courses/courses/${courseId}/`)
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
                setCourse(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation: ', error);
            });
    }, [courseId]);

    const handleStartNow = () => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            console.error('User not found in local storage');
            return;
        }

        const userId = JSON.parse(userData).user.id;
        fetch(`http://127.0.0.1:8000/courses/courses/${courseId}/start-course/`, {  // Include courseId in the URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({ user: userId })
        })
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
            navigate(`/FirstStep/${courseId}`); 
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation: ', error);
        });
    };

    if (!course) return <p className="text-center text-gray-700">Loading...</p>;

    return (
        <div className="flex justify-center py-10">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img 
                            src={course.image} 
                            alt={course.title} 
                            className="w-full h-64 object-cover md:h-full md:w-80" 
                        />
                    </div>
                    <div className="p-8">
                    <div className="text-lg md:text-xl lg:text-2xl uppercase tracking-wide text-[#00df9a] font-bold">{course.title} Course</div>                        <p className="mt-2 text-gray-600">{course.description}</p>
                        <p className="mt-4 text-gray-600"><strong>Difficulty:</strong> {course.difficulty}</p>
                        <div className="mt-6">
                            <button
                                onClick={handleStartNow}
                                className="bg-[#00df9a] text-white px-5 py-3 font-semibold rounded hover:bg-green-600 transition duration-300"
                            >
                                Start Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courseinfos;
