import ManajemenUser from "@/components/userManagement/ManajemenUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { IUser } from "../../../config/interface/IUser";

const listData: IUser[] = [
  {
    id: 1,
    username: "john_doe",
    password: "password123",
    email: "john.doe@example.com",
    name: "John Doe",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    username: "jane_smith",
    password: "securepass456",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    role: "user",
    status: "non-active",
  },
  {
    id: 3,
    username: "alice_wonder",
    password: "wonderland789",
    email: "alice.wonder@example.com",
    name: "Alice Wonder",
    role: "admin",
    status: "active",
  },
  {
    id: 4,
    username: "bob_builder",
    password: "buildit111",
    email: "bob.builder@example.com",
    name: "Bob Builder",
    role: "user",
    status: "non-active",
  },
  {
    id: 5,
    username: "eve_hacker",
    password: "hackme222",
    email: "eve.hacker@example.com",
    name: "Eve Hacker",
    role: "user",
    status: "active",
  },
];

export default async function User() {
  return (
    <main className="px-10">
      <div className="flex flex-row items-center justify-between my-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold my-2">Users Management</h1>
          <p className="text-muted-foreground">Daftar Pengguna</p>
        </div>
        <Link href={"/userManagement/create"}>
          <Button className="h-full">Tambah Pengguna</Button>
        </Link>
      </div>
      <div className="flex flex-col bg-slate-100 w-full gap-2 px-3 rounded-md py-4">
        <div className="flex flex-row mt-3 justify-end gap-2">
          <Input placeholder="Cari Pengguna" className="bg-white" />
          <Button className="w-[150]">Cari</Button>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center">Username</th>
              <th className="px-4 py-2 text-center">Email</th>
              <th className="px-4 py-2 text-center">Nama Lengkap</th>
              <th className="px-4 py-2 text-center">Role</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {listData.map((user) => (
              <ManajemenUser key={user.id} ser={user} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
