"use client";

import { useState } from "react";
import Tabel from "@/components/userManagement/tabel";
import CustomCard from "@/components/userManagement/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  return (
    <main className="px-10 bg-slate-200 py-10">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 ">
        <div className="gap-2 px-3 rounded-md col-span-2 bg-white">
          <div className="flex flex-row items-center justify-between my-4">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold my-2">User Management</h1>
              <p className="text-muted-foreground">List User</p>
            </div>
              <Button className="h-full">Tambah User</Button>
          </div>

          <Tabel onSelectAdmin={setSelectedAdmin} />
        </div>

        <div className="gap-5 px-3 rounded-md col-span-1 bg-white">
          <h1 className="text-2xl font-bold mt-6">User information</h1>
          <div className="">
            {selectedAdmin ? (
              <CustomCard admin={selectedAdmin} />
            ) : (
              <p className="text-gray-500">Select an admin to see details</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
