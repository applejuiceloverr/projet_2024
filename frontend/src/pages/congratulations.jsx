import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Congratulations = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [certificateUrl, setCertificateUrl] = useState(null);

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('user')).user.id;

        fetch(`http://127.0.0.1:8000/courses/courses/${courseId}/generate-certificate/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({ user: userId })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Certificate response:', data); // Log the response
            if (data.certificate_url) {
                setCertificateUrl(`http://127.0.0.1:8000${data.certificate_url}`);
                console.log('Certificate URL set:', `http://127.0.0.1:8000${data.certificate_url}`);
            } else {
                console.error('Error generating certificate:', data);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }, [courseId]);

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-green-600 mb-4">Congratulations!</h1>
                <p className="text-lg text-gray-700 mb-8">You have successfully passed the quiz!</p>
                {certificateUrl && (
                    <div className="mb-4">
                        <a
                            href={certificateUrl}
                            download="certificate.pdf"
                            className="bg-[#00df9a] text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
                        >
                            Download Certificate
                        </a>
                    </div>
                )}
                <button
                    onClick={handleGoHome}
                    className="bg-[#00df9a] text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default Congratulations;
