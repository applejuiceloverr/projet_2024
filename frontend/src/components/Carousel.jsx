import React, { useState } from 'react';
import icon1 from '../assets/icon1.jpg'; // Import the image

const categories = [
  { id: 1, name: 'Web Development', image: icon1, description: 'Learn to build websites' },
  { id: 2, name: 'Data Science', image: icon1, description: 'Analyze and interpret complex data' },
  { id: 3, name: 'AI', image: icon1, description: 'Learn to build websites' },
  { id: 4, name: 'Operating Systems', image: icon1, description: 'Analyze and interpret complex data' },
  { id: 5, name: 'Cyber Security', image: icon1, description: 'Learn to build websites' },
  { id: 6, name: 'Networks', image: icon1, description: 'Analyze and interpret complex data' },
  // Add more categories as needed
];

function Carousel() {
  const [startIndex, setStartIndex] = useState(0);

  const isMobile = window.innerWidth < 768; // Define mobile breakpoint

  const scrollLeft = () => {
    if (startIndex === 0) {
      setStartIndex(categories.length - (isMobile ? 2 : 4));
    } else {
      setStartIndex(startIndex - 1);
    }
  };

  const scrollRight = () => {
    if (startIndex === categories.length - (isMobile ? 2 : 4)) {
      setStartIndex(0);
    } else {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="relative overflow-hidden mb-10">
      <div className="text-center py-4">
        <h1 className="text-4xl font-bold text-[#00df9a]">Explore Our Categories</h1>
        <p className="text-lg text-white">Find the perfect course for you</p>
      </div>
      <div className="absolute inset-y-1/2 left-4 z-10 flex items-center cursor-pointer bg-white rounded-full p-4 shadow-lg" onClick={scrollLeft}>
        <svg className="h-12 w-12 text-[#00df9a]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="currentColor" />
        </svg>
      </div>
      <div className="overflow-hidden scrollbar-hide flex justify-center">
        <div className="flex gap-4 p-4 transition-transform duration-500 ease-in-out">
          {categories.slice(startIndex, startIndex + (isMobile ? 2 : 4)).map(category => (
            <div key={category.id} className={`w-${isMobile ? 'full' : '96'} rounded-lg overflow-hidden border border-gray-200 shadow-md`}>
              <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-bold text-[#00df9a]">{category.name}</h2>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-y-1/2 right-4 z-10 flex items-center cursor-pointer bg-white rounded-full p-4 shadow-lg" onClick={scrollRight}>
        <svg className="h-12 w-12 text-[#00df9a]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

export default Carousel;
