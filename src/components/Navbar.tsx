import { redirect } from "next/navigation"
import ProfileDropdown from "./Profil"
import { useSession } from "next-auth/react"
import { auth } from "../../auth";

async function Navbar() {
  const session = await auth();
  if (!session?.user) {
    redirect('/')
  }
  return (
    <div className="flex flex-row justify-end items-center gap-3 py-3 px-10 bg-primary-foreground">
      <p className="font-medium">{session?.user.name}</p>
      <ProfileDropdown/>
    </div>
  )
}

export default Navbar