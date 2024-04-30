import React from 'react';

const LoginForm = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" name="password" className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-6">
          <button type="submit" className="w-full bg-[#00df9a] text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700">
            Login
          </button>
        </div>
        <p className="text-sm text-center text-gray-500">Don't have an account? <a href="#" className="text-[#00df9a] font-bold hover:underline">Register</a></p>
        <p className="text-sm text-center text-gray-500"><a href="#" className="text-[#00df9a] font-bold hover:underline">Forgot password?</a></p>
      </form>
    </div>
  );
}

export default LoginForm;
