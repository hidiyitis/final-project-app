"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CardProps {
  title: string
  description: string
  icon: React.ReactNode
  total: number | string
}

export default function CardWithForm({ title, description, total, icon }: CardProps) {
  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle className="text-primary">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <div className="basis-1/4">{icon}</div>
          <div className="basis-3/4">
            <CardTitle className="text-3xl font-bold text-primary">{total}</CardTitle>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* Footer content here if needed */}
      </CardFooter>
    </Card>
  )
}

// Komponen untuk mengambil data dari backend dan menampilkan pendapatan
export function CardPendapatan() {
  const [totalPendapatan, setTotalPendapatan] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchPendapatan() {
      try {
        const response = await fetch("/api/v1/dashboard/card") // Ganti dengan endpoint backend Anda
        if (!response.ok) {
          throw new Error("Gagal mengambil data pendapatan")
        }
        const result = await response.json()

        // Ambil total pendapatan dari hasil response backend
        setTotalPendapatan(result.data.totalEarnings || 0)
      } catch (error) {
        console.error("Error fetching pendapatan:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPendapatan()
  }, [])

  if (loading) {
    return <p>Loading data...</p>
  }

  return (
    <CardWithForm
      title="Total Pendapatan"
      description="Pendapatan dalam setahun"
      total={totalPendapatan}
      icon={<TrendingUp className="text-green-500" />}
    />
  )
}
