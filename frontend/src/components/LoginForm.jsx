import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/account/")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function getCsrfToken() {
    let csrfToken = null;
    if (document.cookie && document.cookie !== '') {
      let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.substring(0, 10) === 'csrftoken=') {
          csrfToken = decodeURIComponent(cookie.substring(10));
          break;
        }
      }
    }
    console.log(csrfToken); 
    return csrfToken;
  }

  const submitLogin = (e) => {
    e.preventDefault();

    const csrfToken = getCsrfToken();
    console.log(csrfToken);

    fetch('http://127.0.0.1:8000/account/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to login');
        }
      })
      .then(data => {
        console.log('User data from server:', data);

        // Store the user data in local storage
        localStorage.setItem('user', JSON.stringify(data));

        // Redirect based on is_staff
        if (data.user.is_staff) {
          navigate('/teacher'); // Redirect to /teacherhome
        } else {
          navigate('/home'); // Redirect to /homeuser
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  const HandleRegister = () => {
    navigate('/register');
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={submitLogin}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>
        <div className="mb-6">
          <button type="submit" className="w-full bg-[#00df9a] text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700">
            Login
          </button>
        </div>
        <p onClick={HandleRegister} className="text-sm text-center text-gray-500">Don't have an account? <a href="#" className="text-[#00df9a] font-bold hover:underline">Register</a></p>
        <p className="text-sm text-center text-gray-500"><a href="#" className="text-[#00df9a] font-bold hover:underline">Forgot password?</a></p>
      </form>
    </div>
  );
}

export default LoginForm;
