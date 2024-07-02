import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DownloadAndComplete = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

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
                console.log('Course data:', data);
                setCourse(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation: ', error);
            });
    }, [courseId]);

    if (!course) return <p className="text-center text-gray-700">Loading...</p>;

    const pdfUrl = course.pdf.startsWith('http') ? course.pdf : `http://127.0.0.1:8000${course.pdf}`;

    const openPdfInNewTab = () => {
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto mt-10">
                <div className="mb-6">
                    {course.pdf ? (
                        <button
                            onClick={openPdfInNewTab}
                            className="bg-[#00df9a] text-white font-semibold py-3 px-6 rounded-md cursor-pointer hover:bg-green-600 transition duration-300 w-full"
                        >
                            Open PDF in New Tab
                        </button>
                    ) : (
                        <p className="text-center text-gray-700">PDF not available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DownloadAndComplete;
