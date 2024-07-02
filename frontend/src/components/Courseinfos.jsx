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
            navigate(`/FirstStep/${courseId}`); // Redirect to /FirstStep/{courseId}
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation: ', error);
        });
    };

    if (!course) return <p className="text-center text-gray-700">Loading...</p>;

    return (
        <div className="px-2 py-10 w-full flex justify-center">
            <div className="bg-white mx-4 lg:mx-8 flex flex-col lg:flex-row max-w-5xl shadow-lg rounded-lg overflow-hidden">
                <div className="lg:w-1/2 h-64 lg:h-auto">
                    <div 
                        className="h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${course.image})` }}
                    ></div>
                </div>
                <div className="py-8 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2">
                    <h2 className="text-3xl text-gray-800 font-bold mb-4">
                        {course.title}
                        <span className="text-[#00df9a]"> Course</span>
                    </h2>
                    <p className="mt-4 text-gray-600 whitespace-pre-line break-words">
                        {course.description}
                    </p>
                    <p className="mt-4 text-gray-600">
                        <strong>Difficulty:</strong> {course.difficulty}
                    </p>
                    <div className="mt-8">
                        <button
                            onClick={handleStartNow}
                            className="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded hover:bg-gray-700 transition duration-300"
                        >
                            Start Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courseinfos;
