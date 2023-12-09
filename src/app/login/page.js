import Link from 'next/link';
import React from 'react';

const LogIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950">
      <div className="bg-transparent text-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
      <h1 className="text-3xl font-bold text-center mb-8">Log In</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-bold">Email</label>
            <input
              type="email"
              id="email"
              className="w-full rounded-md py-2 px-3 bg-gray-900 text-white mt-1 focus:outline-none border-2 focus:border-yellow-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-bold">Password</label>
            <input
              type="password"
              id="password"
              className="w-full rounded-md py-2 px-3 bg-gray-900 text-white mt-1 focus:outline-none border-2 focus:border-yellow-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-2 font-bold rounded-md hover:bg-yellow-600 transition duration-300"
          >
            Log In
          </button>
          <p>Don't have an account ? <Link href={'/signup'} className='text-yellow-500 font-bold'>Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
