'use client'
import { use, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BASE_URL_API } from '@/lib/config';
import { useSession } from 'next-auth/react';
import ProfileDetail from '@/components/profile/ProfileDetail';
import DialogModal from '@/components/DialogModal';

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

const Profile = () => {
  const {data: session} = useSession();
  const [user, setUser] = useState<ProfileData>()
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  
  console.log(session?.user);
  
  useEffect(()=>{
    const getData = async ()=>{
      try {
        const user = await fetch(`${BASE_URL_API}/users/${session?.user.id}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${session?.user.accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        )
        const {data} = await user.json()        
        
        setUser({
          id: data.id,
          username: data.username,
          name: data.name,
          password: data.password
        })
        setLoading(false)
      } catch (error) {
        setError((error as Error).message)
        setIsOpenModal(true)
      }
    }
    getData()
  }, [])

  function handleCloseModal(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      {loading && <p>Loading...</p>} 
      {error && <DialogModal status={'Gagal'} message={error} isOpen={isOpenModal} onClose={handleCloseModal}/>} 
      {!loading && !error &&<ProfileDetail user={user!}/>}
    </>
  );
};

export default Profile;
