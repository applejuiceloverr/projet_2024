import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Single from '../assets/single.png';
import Double from '../assets/double.png';
import Triple from '../assets/triple.png';

const stripePromise = loadStripe('pk_test_51PHsKYP0XWDMwWc8ZioPGlh5YRVdB8097sALB62Z42jz7pI7i2DZcmJjfJTOOT8cYER3qT6jbN5A7JnfKP1LjUjN00cqXC3q6J');

const CardsSub = () => {
  axios.defaults.withCredentials = true;

  const handleSubscribe = async (planType) => {
    const stripe = await stripePromise;
  
    try {
      console.log(localStorage); // Log local storage
      console.log(document.cookie); // Log cookies
      
      const user = JSON.parse(localStorage.getItem('user'));
      const accessToken = user?.access_token;
      
      console.log("Access Token:", accessToken);
  
      if (!accessToken) {
        throw new Error("Access token is missing");
      }
  
      const response = await axios.post(
        'http://localhost:8000/subscriptions/create-checkout-session/',
        {
          plan_type: planType,
        },
        {
          headers: {
           
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status !== 200) {
        console.error('Error response from server:', response);
        throw new Error(`Server responded with status code ${response.status}`);
      }
  
      const sessionId = response.data.id;
  
      if (!sessionId) {
        console.error('No session ID in server response:', response.data);
        throw new Error("Server response did not include a session ID");
      }
  
      const { error } = await stripe.redirectToCheckout({ sessionId });
  
      if (error) {
        console.error('Error redirecting to Stripe checkout:', error);
      }
    } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
    }
  };



      

  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Single} alt="/" />
          <h2 className='text-2xl font-bold text-center py-8'>Monthly Plan</h2>
          <p className='text-center text-4xl font-bold'>$50</p>
          <div className='text-center font-medium'>
            <p className='py-2 border-b mx-8 mt-8'>Access all courses within the learning program</p>
            <p className='py-2 border-b mx-8'>Earn a certificate upon completion</p>
            <p className='py-2 border-b mx-8'>Standard pricing</p>
          </div>
          <button
            className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'
            onClick={() => handleSubscribe('monthly')}
          >
            Subscribe
          </button>
        </div>
        <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
          <img className='w-20 mx-auto mt-[-3rem] bg-transparent' src={Double} alt="/" />
          <h2 className='text-2xl font-bold text-center py-8'>Semiannual Plan</h2>
          <p className='text-center text-4xl font-bold'>$250</p>
          <div className='text-center font-medium'>
            <p className='py-2 border-b mx-8 mt-8'>Access all courses within the learning program</p>
            <p className='py-2 border-b mx-8'>Earn a certificate upon completion</p>
            <p className='py-2 border-b mx-8'>1 month free</p>
          </div>
          <button
            className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'
            onClick={() => handleSubscribe('semiannual')}
          >
            Subscribe
          </button>
        </div>
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Triple} alt="/" />
          <h2 className='text-2xl font-bold text-center py-8'>Annual Plan</h2>
          <p className='text-center text-4xl font-bold'>$500</p>
          <div className='text-center font-medium'>
            <p className='py-2 border-b mx-8 mt-8'>Access all courses within the learning program</p>
            <p className='py-2 border-b mx-8'>Earn a certificate upon completion</p>
            <p className='py-2 border-b mx-8'>2 months free</p>
          </div>
          <button
            className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'
            onClick={() => handleSubscribe('annual')}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardsSub;
