import CardList from "@/components/pemesanan/CardList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

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

export default async function Pemesanan() {
  return (
    <main className="px-10">
      <div className="flex flex-row items-center justify-between my-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold my-2">Pemesanan</h1>
          <p className="text-muted-foreground">List pemesanan</p>
        </div>
        <Link href={"/pemesanan/create"}>
          <Button className="h-full">Buat Pemesanan</Button>
        </Link>
      </div>
      <div className="flex flex-col bg-slate-100 w-full gap-2 px-3 rounded-md">
        <div className="flex flex-row mt-3 justify-end gap-2">
          <Input placeholder="Cari sesuatu" className="bg-white"/>
          <Button className="w-[150]">Cari</Button>
        </div>
        <CardList pemesananList={listData}/>
      </div>
    </main>
  );
}
