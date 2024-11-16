"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const Login = () => {
  const router = useRouter('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);

    try {
      const response = await axios.post('https://cars-cred.vercel.app/api/user/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.ok) {
      
        localStorage.setItem('token', response.data.authToken);
        router.push('/')
        // Redirect based on the email or perform any other action
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-50 to-green-100 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-green-600 text-center mb-4">Log In</h1>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition duration-300"
            >
              Log In
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/sign-up" className="text-green-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
