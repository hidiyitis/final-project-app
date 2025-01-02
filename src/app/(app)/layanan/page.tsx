'use client';
import ServiceManager from "@/components/layanan/ServiceManager";
import ServiceCard from "@/components/layanan/layanan";
import { fetchDeleteService, fetchServices, fetchUpdateService } from "@/lib/apis/serviceApi";
import { IService } from "@/lib/interfaces/serviceInterface";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState<string>('')
  const [services, setServices] = useState<IService[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);
  const [isOpenModal, setOpenModal] = useState(false);


  const {data: session, status} = useSession();
  if (status === 'unauthenticated') {
    redirect('/')
  }
  const getServices = async () => {
    try {
      const data = await fetchServices(query, session!);
      setServices(data);
    } catch (error){
      setError((error as Error).message);
      setOpenModal(true);
    }finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await fetchDeleteService(id, session!);
      getServices();
    } catch {
      console.error("Gagal menghapus layanan:", error);
    }
  };

  const filteredServices = services.filter((service) => {
    return (
      service.title.toLowerCase().includes(query.toLowerCase()) ||
      service.desc.toLowerCase().includes(query.toLowerCase())
    );
  });
  
  const handleUpdate = async (id: number, updatedService: Partial<IService>) => {
    try {
      await fetchUpdateService(id, updatedService, session);
      getServices();
    } catch (error) {
      console.error("Gagal memperbarui layanan:", error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="p-8 bg-teal-25 min-h-screen">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="p-3 m-2 bg-cyan-50 rounded-lg shadow-inner flex justify-between sticky top-0">
          <div className="text-center ">
          <label className="text-xl font-bold mb-4 text-gray-700 sticky top-0">Layanan Kebersihan Tersedia</label>
          </div>
          <ServiceManager onAdd={getServices}/>
        </div>
        <div className="m-4">
          <input
            type="text"
            placeholder="Cari layanan..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Layanan</th>
                <th className="px-4 py-2 text-center">Harga</th>
                <th className="px-4 py-2 text-center">Deskripsi</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <ServiceCard 
                key={service.id} 
                ser={service}
                onUpdate={handleUpdate}
                onDelete={handleDelete}/>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
