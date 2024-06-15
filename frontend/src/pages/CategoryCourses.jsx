import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        <div>
            {Array.isArray(courses) ? (
                courses.map(course => (
                    <div key={course.id}>
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                    </div>
                ))
            ) : (
                <p>No courses found.</p>
            )}
        </div>
    );
};

export default CategoryCourses;
