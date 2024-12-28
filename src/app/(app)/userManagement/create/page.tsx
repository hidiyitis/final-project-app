"use client";

import FormAddUser from "@/components/userManagement/FormAddUser";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function CreateUserPage() {
  const router = useRouter();
  return (
    <main className="px-10">
      <div className="flex flex-col justify-between my-4">
        <div className="flex flex-row items-center gap-2">
          <ArrowLeft onClick={router.back} cursor={"pointer"} />
          <h1 className="text-2xl font-bold my-2">Tambah Pengguna</h1>
        </div>
        <div className="mb-5">
          <p className="text-muted-foreground">Tambah data pengguna</p>
        </div>
        <FormAddUser />
      </div>
    </main>
  );
}

export default CreateUserPage;
