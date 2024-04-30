import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
      <div>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>CS LEARN.</h1>
        <p className='py-4'>Your one-stop platform for learning computer science. From basics to advanced topics, we've got you covered.</p>
        <div className='flex justify-between md:w-[75%] my-6'>
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
            <FaDribbbleSquare size={30} />
        </div>
      </div>
      <div className='lg:col-span-2 flex justify-between mt-6'>
    <div>
        <h6 className='font-medium text-gray-400'>Courses</h6>
        <ul>
            <li className='py-2 text-sm'>Introduction to CS</li>
            <li className='py-2 text-sm'>Data Structures</li>
            <li className='py-2 text-sm'>Algorithms</li>
            <li className='py-2 text-sm'>Web Development</li>
        </ul>
    </div>
    <div>
        <h6 className='font-medium text-gray-400'>Resources</h6>
        <ul>
            <li className='py-2 text-sm'>Study Guides</li>
            <li className='py-2 text-sm'>Tutorials</li>
            <li className='py-2 text-sm'>Community Forum</li>
            <li className='py-2 text-sm'>FAQs</li>
        </ul>
    </div>
    <div>
        <h6 className='font-medium text-gray-400'>Company</h6>
        <ul>
            <li className='py-2 text-sm'>About Us</li>
            <li className='py-2 text-sm'>Blog</li>
            <li className='py-2 text-sm'>Careers</li>
            <li className='py-2 text-sm'>Contact</li>
        </ul>
    </div>
    <div>
        <h6 className='font-medium text-gray-400'>Legal</h6>
        <ul>
            <li className='py-2 text-sm'>Privacy Policy</li>
            <li className='py-2 text-sm'>Terms of Service</li>
        </ul>
    </div>
      </div>
    </div>
  );
};

export default Footer;