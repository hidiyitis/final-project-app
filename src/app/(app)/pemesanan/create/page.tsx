'use client'

import FormPemesanan from "@/components/pemesanan/FormPemesanan"
import DialogModal from "@/components/DialogModal"
import { fetchCreateOrder } from "@/lib/apis/orderApi"
import { IFormOrder } from "@/lib/interfaces/orderInterface"
import { ArrowLeft } from "lucide-react"
import { redirect, useRouter } from "next/navigation"
import { useState } from 'react';
import { useSession } from "next-auth/react"

function CreatePemesananPage() {
  const [message, setMessage] = useState<string>('')
  const [isError, setIsError] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const router = useRouter()
  const {data: session, status} = useSession();
  if (status === 'unauthenticated') {
    redirect('/')
  }
  const handleSubmit = async (data: IFormOrder) => {
    try {
      const result = await fetchCreateOrder(data, session!);
      setMessage(result?.message);
    } catch (error) {
      setIsError(true);
      setMessage((error as Error).message);
    } finally{
      setIsSuccessModalOpen(true);
    }
  }

  const handleSuccess = async () => {
    setIsSuccessModalOpen(false);
    setMessage('');
    if (!isError) {
      redirect('/pemesanan')
    }
    setIsError(false);
  }
  return (
    <main className="px-10">
      <div className="flex flex-col justify-between my-4">
        <div className="flex flex-row items-center gap-2">
          <ArrowLeft onClick={router.back} cursor={'pointer'}/>
            <h1 className="text-2xl font-bold my-2">Pemesanan</h1>
        </div>
        <div className="mb-5">
          <p className="text-muted-foreground">Buat data pemesanan</p>
        </div>
        <FormPemesanan onSubmit={handleSubmit}/>
        <DialogModal status={isError ? 'Gagal' : 'Berhasil'} message={message} isOpen={isSuccessModalOpen} onClose={handleSuccess}/>
      </div>
    </main>
  )
}

export default CreatePemesananPage;