'use client'
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {data: session} = useSession()

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    setIsOpen(false)
    await signOut({
      redirectTo: `/`
    })
  };

  const handleProfile = () => {
    setIsOpen(false)
    redirect('/profile')
  };

  return (
    <div className="relative">
      <Avatar onClick={handleProfileClick} className='cursor-pointer'>
        <AvatarImage src=""/>
        <AvatarFallback className="font-semibold">{session?.user.name![0] || ''}</AvatarFallback>
      </Avatar>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <button onClick={handleProfile} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
            Profile
          </button>
          <button onClick={handleLogout} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
