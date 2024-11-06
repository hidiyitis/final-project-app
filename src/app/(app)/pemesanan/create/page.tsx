'use client'

import FormPemesanan from "@/components/pemesanan/FormPemesanan"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

 
function CreatePemesananPage() {
  const router = useRouter()
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
          <FormPemesanan/>
      </div>
    </main>
  )
}

export default CreatePemesananPage