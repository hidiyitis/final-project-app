"use client";

import { Switch } from "@/components/ui/switch";
import { IUser } from "@/lib/interfaces/userInterface";
import { Trash2, PencilLine } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchDeleteUser } from "@/lib/apis/userApi";
import DialogModal from "@/components/DialogModal";

interface ServiceProps {
  ser: IUser;
}

export default function ManajemenUser({ ser }: ServiceProps) {
  const { data: session } = useSession(); // Mengambil session
  const router = useRouter(); // Menggunakan router untuk navigasi
  const [message, setMessage] = useState<string>("");
  const [modalStatus, setModalStatus] = useState<string | null>(null); // Status modal

  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        if (!session) {
          setMessage("Session not found. Please login again.");
          setModalStatus("error");
          return;
        }
        const result = await fetchDeleteUser(id, session);

        setMessage(result?.message || "User deleted successfully.");
        setModalStatus("success");

        router.push("/userManagement");
      } catch (error) {
        setMessage((error as Error).message || "Failed to delete user.");
        setModalStatus("error");
      }
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
    <tr className="px-4 py-2 text-center hover:bg-slate-100 leading-4">
      <td className="px-4 py-2 text-center">{ser.username}</td>
      <td className="px-4 py-2 text-center">{ser.name}</td>
      <td className="px-4 py-2 text-center">
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            ser.accessRole === "ADMIN"
              ? "text-blue-600 bg-blue-100 "
              : "text-purple-600 bg-purple-100"
          }`}
        >
          {ser.accessRole.replace(/_/g, " ")}
        </span>
      </td>
      <td className="px-4 py-2 text-center">
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            ser.status === "AKTIF"
              ? "text-white bg-green-700"
              : "text-white bg-red-700"
          }`}
        >
          {ser.status.replace(/_/g, " ")}
        </span>
      </td>

      <td className="px-4 py-2 text-center">
        <div className="flex justify-center items-center space-x-4">
          <Link href={`/userManagement/edit/${ser.id}`}>
            <PencilLine color="#5A5A5A" className="hover:scale-150 " />
          </Link>
          <button
            onClick={() => handleDeleteUser(ser.id)} // Menangani penghapusan
            className="hover:scale-150"
          >
            <Trash2 color="#ff0000" />
          </button>
        </div>
      </td>

      {/* Menampilkan pesan status */}
      {modalStatus && (
        <DialogModal
          status={modalStatus === "success" ? "Berhasil" : "Gagal"}
          message={message}
          isOpen={modalStatus !== null}
          onClose={handleModalClose}
        />
      )}
    </tr>
  );
}
