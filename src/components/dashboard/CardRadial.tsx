import React, { useEffect, useRef, useState } from "react";
import { getStyle } from "@coreui/utils";
import { CChart } from "@coreui/react-chartjs";
import { Chart } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";


export const ChartRadial = () => {
  const chartRef = useRef<Chart<"doughnut"> | null>(null);

  // Mendeklarasikan state untuk inProgressTotal dan completedTotal
  const [inProgressTotal, setInProgressTotal] = useState<number>(0);
  const [completedTotal, setCompletedTotal] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();

    // Fungsi untuk fetch data
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/v1/dashboard/card", {
          signal: controller.signal,
        });
        
        const data = await response.json();
        if (data?.data?.inProgressOrders) {
          setInProgressTotal(data.data.inProgressOrders);
        }

        if (data?.data?.completedOrders) {
          // Menentukan total pesanan yang selesai
          setCompletedTotal(data.data.completedOrders);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchOrders();

    return () => {
      controller.abort(); // Membersihkan request saat komponen dibersihkan
    };
  }, []);

  // Pastikan inProgressTotal dan completedTotal sudah terupdate
  const data: ChartData<"doughnut"> = {
    labels: ["Sedang Dikerjakan", "Selesai", "Lainnya"],
    datasets: [
      {
        backgroundColor: ["#007bff", "#28a745", "#6c757d"], // Warna sesuai dengan kategori
        data: [
          inProgressTotal, // Data untuk "Sedang Dikerjakan"
          completedTotal, // Data untuk "Selesai"
          100 - inProgressTotal - completedTotal, // "Lainnya" adalah sisa persentase
        ],
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        labels: {
          color: getStyle("--cui-body-color"),
        },
      },
    },
  };

  return <CChart type="doughnut" data={data} options={options} ref={chartRef} />;
};
