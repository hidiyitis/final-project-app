"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  total?: number | string; // Optional untuk default value handling
}

const CardPengerjaan: React.FC<CardProps> = ({ title, description, icon, total = 0 }) => {
  const [inProgressTotal, setInProgressTotal] = useState<number>(Number(total));

  useEffect(() => {
    const controller = new AbortController();

    const fetchInProgressOrders = async () => {
      try {
        const response = await fetch("/api/v1/dashboard/card", {
          signal: controller.signal,
        });
        const data = await response.json();
        if (data?.data?.inProgressOrders) {
          setInProgressTotal(data.data.inProgressOrders);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching in-progress orders:", error);
        }
      }
    };

    fetchInProgressOrders();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Card className="w-full max-w-[250px]">
      <CardHeader>
        <CardTitle className="text-primary">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <div className="basis-1/4">{icon}</div>
          <div className="basis-3/4">
            <CardTitle className="text-3xl font-bold text-primary">
              {inProgressTotal}
            </CardTitle>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* Tambahkan elemen footer jika diperlukan */}
      </CardFooter>
    </Card>
  );
};

CardPengerjaan.defaultProps = {
  total: 0,
};

export default CardPengerjaan;
