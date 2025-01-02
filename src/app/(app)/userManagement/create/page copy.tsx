"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import FormAddUser from "@/components/userManagement/FormAddUser";
import { ArrowLeft } from "lucide-react";
import DialogModal from "@/components/DialogModal";
import { fetchCreateUser } from "@/lib/apis/userApi";
import { IFormUser } from "@/lib/interfaces/userInterface";

function CreateUserPage() {
  const [message, setMessage] = useState<string>("");
  const [modalStatus, setModalStatus] = useState<"success" | "error" | null>(
    null
  );
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect jika user tidak authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSubmit = async (data: IFormUser) => {
    console.log("Data submitted:", data); // Debugging
    if (!session) {
      setMessage("Session tidak ditemukan. Silakan login ulang.");
      setModalStatus("error");
      return;
    }
    try {
      const result = await fetchCreateUser(data, session);
      setMessage(result?.message || "Berhasil menambah pengguna.");
      setModalStatus("success");
    } catch (error) {
      setMessage((error as Error).message || "Gagal menambah pengguna.");
      setModalStatus("error");
    }
  };

  const handleModalClose = () => {
    setModalStatus(null);
    setMessage("");
    if (modalStatus === "success") {
      router.push("/userManagement");
    }
  };

  return (
    <main className="px-10">
      <div className="flex flex-col justify-between my-4">
        <div className="flex flex-row items-center gap-2">
          <ArrowLeft
            onClick={router.back}
            cursor="pointer"
            role="button"
            aria-label="Kembali"
          />
          <h1 className="text-2xl font-bold my-2">Tambah Pengguna</h1>
        </div>
        <div className="mb-5">
          <p className="text-muted-foreground">Tambah data pengguna</p>
        </div>
        <FormAddUser onSubmit={handleSubmit} />
        {modalStatus && (
          <DialogModal
            status={modalStatus === "success" ? "Berhasil" : "Gagal"}
            message={message}
            isOpen={modalStatus !== null}
            onClose={handleModalClose}
          />
        )}
      </div>
    </main>
  );
}

export default CreateUserPage;
