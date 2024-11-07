'use client'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { number } from "zod"

const listData:IPemesanan[] = [
  {
    id: 1,
    customerName: 'Hidayatus Sholikhin',
    date: new Date(Date.now()).toISOString(),
    address: 'Jl. Kemana',
    service: 'Maling Motor',
    price: 200000,
    pic: 'Yanto',
    status: 'Belum'
  },
  {
    id: 2,
    customerName: 'Sholikhin',
    date: new Date(Date.now()).toISOString(),
    address: 'Jalan Kemana ya',
    service: 'Cuci Gudang',
    price: 200000,
    pic: 'Yanto',
    status: 'Sedang Dikerjakan'
  },
  {
    id: 3,
    customerName: 'Dayat',
    date: new Date(Date.now()).toISOString(),
    address: 'Jl. Doang Jadian Kagak',
    service: 'Manasin Kompor',
    price: 200000,
    pic: 'Yanto',
    status: 'Selesai'
  },
]

function DetailPemesananPage() {
  const router = useRouter()
  const data = listData.find(e=>e.id == useParams().id)
  
  return (
    <main className="px-10">
      <div className="flex flex-col justify-between my-4">
        <div className="flex flex-row items-center gap-2">
            <ArrowLeft onClick={router.back} cursor={'pointer'}/>
              <h1 className="text-2xl font-bold my-2">Pemesanan</h1>
          </div>
          <div className="mb-5">
            <p className="text-muted-foreground">Detail pemesanan</p>
        </div>
        <div className="space-y-2">
          <div className="flex flex-row justify-between">
            <main>
              <div className="space-y-1">
                <Label className="text-primary">
                  Nama Pemesan
                </Label>
                <p>{data?.customerName}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-primary">
                  Alamat
                </Label>
                <p>{data?.address}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-primary">
                  Layanan
                </Label>
                <p>{data?.service}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-primary">
                  Petugas
                </Label>
                <p>{data?.pic}</p>
              </div>
            </main>
            <Button>Ubah Pemesanan</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DetailPemesananPage