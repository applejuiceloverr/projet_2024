import React from 'react';
import Certificates from '../assets/icon1.jpg';

const Certifications = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Certificates} alt='Certificates' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>UNLIMITED CERTIFICATIONS</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Empower Your Career With Our Certifications</h1>
          <p>
            We believe in the power of continuous learning. That's why we offer unlimited certifications in a wide range of subjects. Whether you're looking to advance your career, explore a new field, or just satisfy your curiosity, we've got you covered. Start your learning journey with us today!
          </p>
          <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Certifications;