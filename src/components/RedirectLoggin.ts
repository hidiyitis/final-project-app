'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";

export const RedirectLoggin = ()=>{
  const {data: session, status} = useSession();
  console.log(status, new Date(session?.user.accessTokenExpiresIn!));
  
  if (!(session?.user) && status === 'unauthenticated') {
    redirect('/')
  }
  return null;
}