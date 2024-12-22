'use client';
import ManajemenPekerja from "@/components/manejemenPekerja/Manajemenpekerja";
import DialogPekerjaan from "@/components/manejemenPekerja/DialogPekerjaan";
import DialogHapus from "@/components/manejemenPekerja/DialogHapus";

export default function Home() {
  
  
  const services = [
    { id: 'C001', nama: 'Bagas Satria Data', email: 'RaniHandshome@gmail.com', alamat: 'Perumahan Permata berseri, blok C, no 32.', }, 
    { id: 'C002', nama: 'Hidayatus Solikhin', email: "tutus@gmail.com", alamat: 'buah batu regency, blok 1.', }, 
    { id: 'C003', nama: 'Ayu Dewi Permatasari', email: 'ayuhandayani@gmail.com', alamat: 'Jalan Raya No. 12, Buah Batu.', }, 
    { id: 'C004', nama: 'Dedi Corbuzier Podcast', email: 'dedihermawan@gmail.com', alamat: 'Perumahan Griya Asri, Blok C.', }, 
    { id: 'C005', nama: 'Lestari indah permata', email: 'lestariwidyastuti@gmail.com', alamat: 'Jalan Kebon Jeruk No. 23, Buah Batu.', }
  ];

  return (
    <div className="p-8 bg-teal-25 min-h-screen">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="p-3 m-2 bg-cyan-50 rounded-lg shadow-inner flex justify-between sticky top-0">
          <div className="text-center ">
          <label className="text-xl font-bold mb-4 text-gray-700 sticky top-0">Manajemen Pekerja</label>
          </div>
          <DialogPekerjaan/>
        </div>
        <div className="m-4">
          <input
            type="text"
            placeholder="Cari pekerja..."
            className="w-full p-2 border border-gray-300 rounded-lg"
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
          {services.map((service) => (
            <ManajemenPekerja key={service.id} ser={service} />
          ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10">
      <DialogHapus/>
      </div>
    </div>
  );
};
