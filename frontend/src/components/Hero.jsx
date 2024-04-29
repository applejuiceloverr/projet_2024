import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const words = ['Python', 'Java', 'C++', 'SQL'];

  useEffect(() => {
    let timer = '';
    const handleTyping = () => {
      setText(currentText => words[loopNum % words.length].substring(0, currentText.length + (isDeleting ? -1 : 1)));
      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === words[loopNum % words.length]) {
        timer = setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(prevLoopNum => prevLoopNum + 1);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
          LEARN COMPUTER SCIENCE ONLINE
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
        Unlock Your Coding Potential.

        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Comprehensive courses on
          </p>
          <div style={{ minWidth: '100px' }}>
            <p className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'>
              {text}
              <span id="cursor"/>
            </p>
          </div>
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Earn certifications in Python, JavaScript, Data Structures, Algorithms and more with our comprehensive online courses.</p>
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Start Learning</button>
      </div>
    </div>
  );
};

export default Hero;