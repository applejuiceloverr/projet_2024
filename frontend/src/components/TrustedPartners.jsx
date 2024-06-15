import React from 'react';
import { FaApple, FaGoogle, FaMicrosoft, FaAmazon, FaFacebook, FaTwitter } from 'react-icons/fa';

const companies = [
    { name: 'Apple', icon: <FaApple />, color: '#A3AAAE' },
    { name: 'Google', icon: <FaGoogle />, color: '#4285F4' },
    { name: 'Microsoft', icon: <FaMicrosoft />, color: '#F25022' },
    { name: 'Amazon', icon: <FaAmazon />, color: '#FF9900' },
    { name: 'Facebook', icon: <FaFacebook />, color: '#1877F2' },
    { name: 'Twitter', icon: <FaTwitter />, color: '#1DA1F2' },
];

const Companies = () => {
    return (
        <section className='w-full bg-[#282A35] py-[50px] justify-center items-center p-4'>
            <div className='md:max-w-[1100px] m-auto max-w-[400px]'>
                <h1 className='text-center text-2xl font-bold text-[#00df9a] mb-4'>Trusted by over 25,000 teams around the world</h1>
                <p className='text-center text-white text-lg mb-8'>Leading Companies use the same courses to help their employees keep skills up</p>
                <div className='grid md:grid-cols-3 lg:grid-cols-6 grid-cols-2 gap-4 lg:gap-x-12 items-center'>
                    {companies.map((company, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="text-4xl mb-2" style={{ color: company.color }}>
                                {company.icon}
                            </div>
                            <p className="text-md font-bold text-white">{company.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Companies;
