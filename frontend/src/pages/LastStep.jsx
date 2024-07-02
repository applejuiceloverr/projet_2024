import React from 'react';
import LearnMenu from '../components/LearnMenu';
import Quiz from '../components/Quiz';

const LastStep = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Side Menu */}
            <LearnMenu className="bg-black text-white w-64 flex-shrink-0" />

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
                <div className="w-full max-w-4xl mx-auto">
                    <Quiz />
                </div>
            </div>
        </div>
    );
};

export default LastStep;
