"use client";

import ManajemenUser from "@/components/userManagement/ManajemenUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { fetchUsers } from "@/lib/apis/userApi";
import { IUser } from "@/lib/interfaces/userInterface";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import DialogModal from "@/components/DialogModal";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function User() {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpenModal, setOpenModal] = useState(false);

  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/");
  }

  const getUsers = async (query: string) => {
    try {
      const data = await fetchUsers(query, session!);
      setUsers(data);
    } catch (error) {
      setError((error as Error).message);
      setOpenModal(true);
    } finally {
      setLoading(false);
    }
  };

  const debounceFetchData = useCallback(
    debounce((query) => {
      getUsers(query);
    }, 1000),
    []
  );

  useEffect(() => {
    debounceFetchData(query);
  }, [query, debounceFetchData]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
          <Input
            placeholder="Cari Pengguna"
            className="bg-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button className="w-[150]">Cari</Button>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center">Username</th>
              <th className="px-4 py-2 text-center">Nama Lengkap</th>
              <th className="px-4 py-2 text-center">Role</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <ManajemenUser key={user.id} ser={user} />
            ))}
          </tbody>
        </table>
      </div>
      {loading && <p>Loading...</p>}
      {error && (
        <DialogModal
          status={"Gagal"}
          message={error}
          isOpen={isOpenModal}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
