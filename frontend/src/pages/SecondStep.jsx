import React from 'react';
import LearnMenu from '../components/LearnMenu';
import Practice from '../components/Practice';
import ChatBot from '../components/ChatBot';

const SecondStep = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Side Menu */}
      <LearnMenu className="bg-black text-white w-64 flex-shrink-0" />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-6xl p-8">
          <Practice />
        </div>
      </div>
      <ChatBot />
    </div>
  );
};

export default SecondStep;
