import React, { useState } from 'react';
import api from "../api";
import { useNavigate } from 'react-router-dom';

function RegisterForm({route}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
  
    try {
      const response = await api.post(route, {
        nom: firstName,
        prenom: lastName,
        email,
        username: email, // Add this line
        password,
      });
  
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#00df9a]">Register</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName" className="block mb-1 text-sm font-medium text-gray-700">First Name</label>
          <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm focus:border-[#00df9a] focus:ring focus:ring-[#00df9a] focus:ring-opacity-50 p-3 text-lg" />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
          <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm focus:border-[#00df9a] focus:ring focus:ring-[#00df9a] focus:ring-opacity-50 p-3 text-lg" />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm focus:border-[#00df9a] focus:ring focus:ring-[#00df9a] focus:ring-opacity-50 p-3 text-lg" />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm focus:border-[#00df9a] focus:ring focus:ring-[#00df9a] focus:ring-opacity-50 p-3 text-lg" />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm focus:border-[#00df9a] focus:ring focus:ring-[#00df9a] focus:ring-opacity-50 p-3 text-lg" />
        </div>
        <div>
        <button type="submit" className="w-full bg-black text-[#00df9a] py-3 px-4 rounded-md hover:bg-[#404040] focus:outline-none focus:ring focus:ring-[#00cc8a]">Register</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;