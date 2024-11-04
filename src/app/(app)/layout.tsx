"use client"

import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

function AppLayout({children}:{
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="flex h-screen">
        <Sidebar/>
        <main className="flex-1 overflow-y-auto">
          <Navbar/>
          {children}
        </main>
      </div>
    </main>
  )
}

export default AppLayout