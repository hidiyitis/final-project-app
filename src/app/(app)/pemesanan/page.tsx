"use client"
import CardList from "@/components/pemesanan/CardList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchOrders } from "@/lib/apis/orderApi";
import { IOrder } from "@/lib/interfaces/orderInterface";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { debounce } from 'lodash';
import DialogModal from "@/components/DialogModal";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { RedirectLoggin } from "@/components/RedirectLoggin";

export default function Pemesanan() {
  const [query, setQuery] = useState<string>('')
  const [orders, setOrders] = useState<IOrder[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);
  const [isOpenModal, setOpenModal] = useState(false);
  
  const {data: session} = useSession();
  const getOrders = async (query: string) => { 
    try { 
      const data = await fetchOrders(query, session!); 
      setOrders(data); 
    } catch (error) {
      setError((error as Error).message);
      setOpenModal(true);
    } finally { 
      setLoading(false); 
    } 
  }; 

  const debounceFetchData = useCallback(debounce((query)=>{
    getOrders(query);
  }, 1000),[])

  useEffect(() => { 
    debounceFetchData(query);
  }, [query, debounceFetchData]);

  const handleCloseModal = ()=>{
    setOpenModal(false);
    if (error?.toLocaleLowerCase().includes('jwt')) {
      redirect('/')
    }
  }
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
      <div className="flex flex-col bg-slate-100 w-full min-h-svh gap-2 px-3 rounded-md">
        <div className="flex flex-row mt-3 justify-end gap-2">
          <Input placeholder="Cari sesuatu" className="bg-white" value={query} onChange={(e)=>setQuery(e.target.value)}/>
        </div>
        {loading && <p>Loading...</p>} 
        {error && <DialogModal status={'Gagal'} message={error} isOpen={isOpenModal} onClose={handleCloseModal}/>} 
        {!loading && !error && <CardList pemesananList={orders} />}
      </div>
      <RedirectLoggin/>
    </main>
  );
}
