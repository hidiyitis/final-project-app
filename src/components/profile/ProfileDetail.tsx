'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { updateUsers } from '@/lib/apis/userAp';
import { redirect } from 'next/navigation';

interface ProfileData {
  id: number;
  name: string;
  username: string;
  password: string;
}

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const ProfileDetail = ({ user }: { user: ProfileData }) => 
  {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    
    const { register, handleSubmit, formState: { errors } } = useForm<ProfileData>({
      resolver: zodResolver(schema),
      defaultValues: {
        ...user
      }
    });
    
    const { data: session } = useSession();

  const onSubmit = async (data: ProfileData) => {
    if (!session) {
      redirect('/')
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await updateUsers(data, session);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (error: any) {
      setError(error?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-10 space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input
            type="text"
            {...register('name')}
            disabled={!isEditing}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <Input
            type="text"
            {...register('username')}
            disabled={!isEditing}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>
          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Input
              type="password"
              {...register('password')}
              disabled={!isEditing}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
          )}

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div  className="flex space-x-4">
          {isEditing && (
            <Button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm text-white bg-blue-600 font-semibold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          )}
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm text-white bg-blue-600 font-semibold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileDetail;
