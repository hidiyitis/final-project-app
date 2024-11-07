"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

const Home: React.FC = () => {
  const router = useRouter();
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleForgotPasswordClick = () => {
    setForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setForgotPassword(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try{
      router.push('/dashboard');
    } catch (error) {
      setError('Login failed. Please try again.'); 
    }
  };

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="grid w-full h-full grid-cols-1 bg-white md:grid-cols-3">
        <div className="col-span-2 relative hidden md:block">
          <Image
            className="object-cover"
            fill={true}
            src="/gambar-login.jpg"
            alt="bg-image"
          />
        </div>
        <div className="text-black flex items-center justify-center flex-col">
          {forgotPassword ? (
            <div className="my-4">
              <h1 className="text-3xl font-semibold">Forgot Password</h1>
              <p className="mt-2 text-xs text-slate-400">
                Please enter your username and phone number for verification.
              </p>
              <form>
                <Label htmlFor="username">Username*</Label>
                <Input
                  className="mt-2 mb-4 border rounded-full focus:border-2 focus:border-indigo-600"
                  type="text"
                  id="username"
                  placeholder="Username"
                />
                <Label htmlFor="phone">Phone Number*</Label>
                <Input
                  className="mt-2 border rounded-full focus:border-2 focus:border-indigo-600"
                  type="text"
                  id="phone"
                  placeholder="Phone Number"
                />
                <Button
                  type="submit"
                  className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
                >
                  Verify
                </Button>
              </form>
              <Button
                className="mt-4 bg-indigo-600"
                onClick={handleBackToLogin}
              >
                Back to Login
              </Button>
            </div>
          ) : (
            <>
              <div className="my-4">
                <h1 className="text-3xl font-semibold">Login</h1>
                <p className="mt-2 text-xs text-slate-400">
                  Sign in to your account and develop your side
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <Label htmlFor="username">Username</Label>
                <Input
                  className="mt-2 mb-4 border rounded-full focus:border-2 focus:border-indigo-600"
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Label htmlFor="password">Password</Label>
                <Input
                  className="mt-2 border rounded-full focus:border-2 focus:border-indigo-600"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <Button
                  type="submit"
                  className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
                >
                  Login
                </Button>
              </form>
              <a
                className="mt-4 text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 focus:outline-none focus:border-indigo-600 transition-all duration-200"
                onClick={handleForgotPasswordClick}
                role="button" 
              >
                Forgot Password?
              </a>
              <p className="mt-4 text-xs text-slate-200">
                @2024 EzKost
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;