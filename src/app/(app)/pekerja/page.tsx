'use client';
import { useState, useEffect } from "react";
import ManajemenPekerja from "@/components/manejemenPekerja/Manajemenpekerja";
import DialogPekerjaan from "@/components/manejemenPekerja/DialogPekerjaan";
import DialogHapus from "@/components/manejemenPekerja/DialogHapus";
import { fetchWorker } from "@/lib/apis/workerApi";
import { useSession } from "next-auth/react";
import { IWorker } from "@/lib/interfaces/workerInterface";

export default function Home() {
  const [services, setServices] = useState<IWorker[]>([]);
  const [filteredServices, setFilteredServices] = useState<IWorker[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // State untuk pencarian
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!session) throw new Error("User not authenticated.");
        const workers = await fetchWorker(session);
        setServices(workers);
        setFilteredServices(workers); // Set data awal untuk pencarian
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session]);

  // Handle pencarian
  useEffect(() => {
    const results = services.filter((worker) =>
      worker.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(results);
  }, [searchTerm, services]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 bg-teal-25 min-h-screen">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="p-3 m-2 bg-cyan-50 rounded-lg shadow-inner flex justify-between sticky top-0">
          <div className="text-center">
            <label className="text-xl font-bold mb-4 text-gray-700 sticky top-0">Manajemen Pekerja</label>
          </div>
          <DialogPekerjaan />
        </div>
        <div className="m-4">
          <input
            type="text"
            placeholder="Cari pekerja..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update state pencarian
          />
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Nama</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Alamat</th>
              <th className="px-4 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service) => (
              <ManajemenPekerja key={service.id} ser={service} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <DialogHapus />
      </div>
    </div>
  );
}
