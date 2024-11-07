'use client';
import ServiceManager from "@/components/layanan/ServiceManager";
import ServiceCard from "@/components/layanan/layanan";

export default function Home() {
  
  
  const services = [
    {
      id: 'C001',
      title: 'General Cleaning',
      harga: 200000,
      desc: 'Pembersihan dasar untuk menjaga kebersihan harian atau mingguan.',
    },
    {
      id: 'C002',
      title: 'Hydro Cleaning',
      harga: 150000,
      desc: 'Pembersihan dengan tekanan air tinggi untuk menghilangkan debu dan kotoran.',
    },
    {
      id: 'C003',
      title: 'AC Cleaning',
      harga: 200000,
      desc: 'Pembersihan unit AC, termasuk filter dan evaporator.',
    },
    {
      id: 'C004',
      title: 'Deep Cleaning',
      harga: 200000,
      desc: 'Pembersihan mendalam untuk area yang jarang dijangkau.',
    },
    {
      id: 'C005',
      title: 'Fogging',
      harga: 200000,
      desc: 'Sterilisasi area dengan teknik penyemprotan kabut disinfektan.',
    }
  ];

  return (
    <div className="p-8 bg-teal-25 min-h-screen">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="p-3 m-2 bg-cyan-50 rounded-lg shadow-inner flex justify-between sticky top-0">
          <div className="text-center ">
          <label className="text-xl font-bold mb-4 text-gray-700 sticky top-0">Layanan Kebersihan Tersedia</label>
          </div>
          <ServiceManager/>
        </div>
        <div className="m-4">
          <input
            type="text"
            placeholder="Cari layanan..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          
        </div>
        <table className="w-full table-auto">
        <thead>
            <tr>
              <th className="px-4 py-2 text-left">Layanan</th>
              <th className="px-4 py-2 text-center">Harga</th>
              <th className="px-4 py-2 text-center">Deskripsi</th>
              <th className="px-4 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
          {services.map((service) => (
            <ServiceCard key={service.id} ser={service} />
          ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-5 mb-5">
          
        </div>
      </div>
    </div>
  );
};
