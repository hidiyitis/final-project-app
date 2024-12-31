'use client'
import { useState, FormEvent } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { status } = useSession();
  if (status === 'authenticated') {
    redirect('/dashboard')
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signIn('credentials', {
        redirect: true,
        username,
        password,
        redirectTo: '/dashboard'
      });
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <button type="submit" className="block w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
