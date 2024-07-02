import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Quiz = () => {
    const { courseId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/courses/courses/${courseId}/quiz/`)
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
                console.log('Quiz data:', data);
                setQuiz(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation: ', error);
            });
    }, [courseId]);

    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmit = () => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            console.error('User not found in local storage');
            return;
        }

        const userId = JSON.parse(userData).user.id;

        fetch(`http://127.0.0.1:8000/courses/courses/${courseId}/submit-quiz/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({ user: userId, answers: userAnswers })
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
            setResult(data);
            if (data.passed) {
                navigate(`/congratulations/${courseId}`);
            } else {
                alert('You did not pass the quiz. Please try again.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation: ', error);
        });
    };

    if (!quiz) return <p className="text-center text-gray-700">Loading...</p>;

    return (
        <div className="quiz-container bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
            <div className="quiz-details mb-8">
                <h1 className="text-3xl font-bold text-center mb-4">{quiz.title}</h1>
                <p className="text-center text-gray-500">Answer the following questions:</p>
            </div>
            <form id="quiz-form" onSubmit={(e) => e.preventDefault()}>
                {quiz.elements.map((element, index) => (
                    <div key={index} className="quiz-question bg-gray-100 border rounded-lg p-6 mb-6 shadow-sm">
                        <h2 className="text-xl font-medium mb-4">{element.question}</h2>
                        <div className="quiz-options space-y-4">
                            {[element.option1, element.option2, element.response].map((option, i) => (
                                <label key={i} className="block bg-white border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition duration-300">
                                    <input 
                                        type="radio" 
                                        name={`q${element.id}`} 
                                        value={option} 
                                        className="mr-2 cursor-pointer" 
                                        onChange={() => handleAnswerChange(element.id, option)} 
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="text-center">
                    <button 
                        type="button" 
                        className="submit-quiz-btn bg-[#00df9a] text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 mt-4"
                        onClick={handleSubmit}
                    >
                        Submit Quiz
                    </button>
                </div>
            </form>
            {result && (
                <div className="result mt-8 text-center">
                    <p className="text-xl font-bold">Your Score: {result.score}%</p>
                    {result.passed ? (
                        <p className="text-green-600">Congratulations! You passed the quiz.</p>
                    ) : (
                        <p className="text-red-600">Sorry, you did not pass the quiz. Please try again.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Quiz;
