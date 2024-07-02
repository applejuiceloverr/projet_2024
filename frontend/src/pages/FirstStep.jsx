import React from 'react';
import LearnMenu from '../components/LearnMenu';
import DownloadAndComplete from '../components/DownloadAndComplete';

const FirstStep = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Side Menu */}
      <LearnMenu className="bg-black text-white w-64 flex-shrink-0" />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-6xl p-8">
          <DownloadAndComplete />
        </div>
      </div>
    </div>
  );
};

export default FirstStep;
