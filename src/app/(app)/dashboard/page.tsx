"use client";

import { useEffect, useState } from "react";
import CardPendapatan from "@/components/dashboard/CardPendapatan";
import CardBerhasil from "@/components/dashboard/CardBerhasil";
import CardPengerjaan from "@/components/dashboard/CardPengerjaan";
import CardPesanan from "@/components/dashboard/CardPesanan";
// import { ChartRadial } from "@/components/dashboard/CardRadial";
// import { Chart } from "@/components/dashboard/Chart";
// import ChartPie from "@/components/dashboard/CardPie";
import { BASE_URL_API } from "@/lib/config";
// import { card } from "@nextui-org/react";

const ShoppingCartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="blue"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-shopping-cart"
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

const ProgressIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="purple"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-clock"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SuccessIcon = () => (
  <svg
    color="cyan-500"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="green"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-check-circle"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const HistoryIcon = () => (
  <svg
    color="cyan-500"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-history"
  >
    <path d="M3 3v6h6" />
    <path d="M3.05 13a9 9 0 1 0 .45-4.65L3 9" />
    <path d="M12 7v5l4 2" />
  </svg>
);

const RevenueIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="lucide lucide-circle-dollar-sign"
  >
    <circle cx="12" cy="12" r="10"/>
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
    <path d="M12 18V6"/>
  </svg>
);

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL_API}/dashboard/card`); // Ganti dengan endpoint backend Anda
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        console.log(result.data);
        
        setData(result.data); 
      } catch (err) {
        const error = err as Error; 
        console.error(error.message);
        setError((err as Error).message)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  const { totalEarnings, inProgressOrders, completedOrders } = data;

  return (
    <main className="p-4 sm:p-5 md:p-8 lg:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <CardPesanan
          title="Pemesanan"
          description="Total Riwayat Pesanan"
          total={inProgressOrders+completedOrders}
          icon={<ShoppingCartIcon />}
        />
        <CardPengerjaan
          title="Dalam Pengerjaan"
          description="Data Pesanan Dalam Proses"
          total={inProgressOrders}
          icon={<ProgressIcon />}
        />
        <CardBerhasil
          title="Berhasil"
          description="Data Pesanan Berhasil"
          total={completedOrders}
          icon={<SuccessIcon />}
        />
        <CardPendapatan
          title="Total Pendapatan"
          description="Total Pendapatan Tahun Terakhir"
          total={totalEarnings}
          icon={<RevenueIcon />}
        />
      </div>
    </main>
  );
}