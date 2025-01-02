"use client"

import * as React from "react"
import { useEffect, useState } from "react"

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

export default function CardBerhasil({ title, description, icon }: CardProps) {
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const response = await fetch("/api/v1/dashboard/card") // Ganti dengan URL endpoint backend Anda
        const data = await response.json()
        if (data && data.data && data.data.completedOrders) {
          setTotal(data.data.completedOrders)
        }
      } catch (error) {
        console.error("Error fetching completed orders:", error)
      }
    }

    fetchCompletedOrders()
  }, [])

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
