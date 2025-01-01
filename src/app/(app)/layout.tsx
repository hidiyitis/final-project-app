import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { SessionProvider, useSession } from "next-auth/react";
import { auth } from "../../../auth";

async function AppLayout({children}:{
  children: React.ReactNode;
}) {
  const session = await auth()
  return (
    <main>
      <div className="flex h-svh">
        <SessionProvider session={session}>
          {session && <Sidebar/>}
          <main className="flex-1 overflow-y-auto">
            <Navbar/>
            {children}
          </main>
        </SessionProvider>
      </div>
    </main>
  )
}

export default AppLayout