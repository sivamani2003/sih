import React, { useState } from 'react';
import axios from 'axios';
import img from '../assets/images.jpeg';
import { useNavigate } from 'react-router-dom';

const color = {
  primary: "#060606",
  background: "#E0E0E0",
  disabled: "#D9D909"
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // To navigate to different routes

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5002/login', { email, password });

      // Get JWT token from the response
      const { token, user } = response.data;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Redirect to dashboard or another protected route
      navigate('/dashboard');
    } catch (error) {
      // Handle errors such as invalid login credentials
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className='w-full min-h-screen flex'>
      {/* Left Side - Image and Text */}
      <div className='relative w-1/2 h-full flex flex-col'>
        <div className='absolute top-[25%] left-[10%] flex flex-col'>
          <h1 className='text-4xl text-white font-extrabold my-4'>Get the Certificate in Your Hands</h1>
          <p className='text-lg text-white font-normal'>We are making services fast and secure.</p>
        </div>
        <img src={img} alt="Certificate" className='w-full h-full object-cover rounded-lg' />
      </div>

      {/* Right Side - Login Form */}
      <div className='w-1/2 h-full flex items-center justify-center'>
        <div className='bg-white p-8 rounded-lg shadow-md w-3/4 mt-32'>
          <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Login</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                id='email'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className='mb-6'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                id='password'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className='flex items-center justify-between mb-4'>
              <button
                type='submit'
                className='w-full bg-[#060606] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#404040] transition duration-300'>
                Sign In
              </button>
            </div>

            {/* Google Sign-in (Optional) */}
            <button className='flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-28'>
              <svg className='h-6 w-6 mr-2' viewBox='-0.5 0 48 48' width='800px' height='800px'>
                <title>Google-color</title>
                <g fill='none' fillRule='evenodd'>
                  <g fillRule='nonzero'>
                    <path d='M9.827 24c0-1.524.253-2.986.705-4.356L2.623 13.604A23.921 23.921 0 0 0 .213 24c0 3.737.868 7.261 2.407 10.388l7.905-6.051C10.08 26.973 9.827 25.517 9.827 24z' fill='#FBBC05'></path>
                    <path d='M23.714 10.133c3.311 0 6.302 1.173 8.651 3.093l6.836-6.826C35.036 2.773 29.695.533 23.714.533c-9.287 0-17.268 5.311-21.09 13.07l7.909 6.039c1.822-5.532 7.017-9.51 13.181-9.51z' fill='#EB4335'></path>
                    <path d='M23.714 37.867c-6.164 0-11.359-3.979-13.18-9.51L2.623 34.395C6.445 42.156 14.426 47.467 23.714 47.467c5.732 0 11.204-2.036 15.312-5.849l-7.507-5.804c-2.118 1.334-4.785 2.051-7.804 2.051z' fill='#34A853'></path>
                    <path d='M46.145 24c0-1.387-.214-2.88-.535-4.267H23.714v9.067h12.605c-.63 3.092-2.345 5.468-4.8 7.015l7.507 5.804C43.339 37.614 46.145 31.65 46.145 24z' fill='#4285F4'></path>
                  </g>
                </g>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className='text-center mt-4'>
              <a href='#' className='text-blue-500 hover:underline text-sm'>
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
