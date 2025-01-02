"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchDashboardData } from "@/lib/apis/dashboardApi";
import CardPendapatan from "@/components/dashboard/CardPendapatan";
import CardBerhasil from "@/components/dashboard/CardBerhasil";
import CardPengerjaan from "@/components/dashboard/CardPengerjaan";
import CardPesanan from "@/components/dashboard/CardPesanan";
import ChartRadial from "@/components/dashboard/CardRadial";
import { Chart } from "@/components/dashboard/Chart";
import ChartPie from "@/components/dashboard/CardPie";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

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
    <circle cx="12" cy="12" r="10" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <path d="M12 18V6" />
  </svg>
);

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [query, setQuery] = useState<string>('');

  const { data: session, status } = useSession();
        if (status === 'unauthenticated') {
          redirect('/')
        }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboardData(query, session!); 
        setData(data);

      } catch (err) {
        const error = err as Error; 
        console.error(error.message);

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const { chart, card } = data;

  
  return (
    <main className="p-4 sm:p-5 md:p-8 lg:p-10">
      <h1 className="text-2xl font-bold my-2">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10 mt-7">
        <CardPesanan
          title="Pemesanan"
          description="Data Pembelian Bulanan"
          total={card.orders}
          icon={<ShoppingCartIcon />}
        />
        <CardPengerjaan
          title="Dalam Pengerjaan"
          description="Data Pesanan Dalam Proses"
          total={card.inProgressOrders}
          icon={<ProgressIcon />}
        />
        <CardBerhasil
          title="Berhasil"
          description="Data Pesanan Berhasil"
          total={card.successfulOrders}
          icon={<SuccessIcon />}
        />
        <CardPendapatan
          title="Total Pendapatan"
          description="+20.1% Dari Bulan Terakhir"
          total={card.revenue}
          icon={<RevenueIcon />}
        />
      </div>

      <div className="flex flex-col md:flex-row mt-6 md:mt-10 gap-4 md:gap-5 lg:gap-10">
        <div className="basis-full md:basis-2/3">
          <Chart data={chart} />
        </div>
        <div className="flex flex-col gap-4 md:gap-5 basis-full md:basis-1/3">
          <ChartRadial />
          <ChartPie />
        </div>
      </div>
    </main>
  );
}