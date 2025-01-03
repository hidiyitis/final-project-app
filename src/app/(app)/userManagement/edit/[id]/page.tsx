"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUserById, fetchUpdateUser } from "@/lib/apis/userApi";
import { IFormUser } from "@/lib/interfaces/userInterface";
import { useParams, useRouter } from "next/navigation";
import FormAddUser from "@/components/userManagement/FormAddUser";
import { ArrowLeft } from "lucide-react";
import DialogModal from "@/components/DialogModal";

const EditUserPage = () => {
  const { id } = useParams();
  const { data: session, status } = useSession();
  const [isEditMode, setIsEditMode] = useState(false);
  const [user, setUser] = useState<IFormUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && session) {
      const fetchData = async () => {
        try {
          setIsEditMode(true);
          const fetchedUser = await fetchUserById(Number(id), session);
          setUser(fetchedUser);
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      console.log("Either session or id is not available.");
    }
  }, [id, session]);

  const [message, setMessage] = useState<string>("");
  const [modalStatus, setModalStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = async (data: IFormUser) => {
    console.log("Data submitted:", data); // Debugging
    if (!session) {
      setMessage("Session tidak ditemukan. Silakan login ulang.");
      setModalStatus("error");
      return;
    }
    try {
      const result = await fetchUpdateUser(Number(id), data, session);
      setMessage(result?.message || "Berhasil mengubah data pengguna.");
      setModalStatus("success");
    } catch (error) {
      setMessage((error as Error).message || "Gagal mengubah data pengguna.");
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

  const router = useRouter();
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <main className="px-10">
      <div className="flex flex-row items-center gap-2 mb-5">
        <ArrowLeft
          onClick={router.back}
          cursor="pointer"
          role="button"
          aria-label="Kembali"
        />
        <h1 className="text-2xl font-bold">Edit User</h1>
      </div>
      <FormAddUser initialValues={user} onSubmit={handleSubmit} />
      {modalStatus && (
        <DialogModal
          status={modalStatus === "success" ? "Berhasil" : "Gagal"}
          message={message}
          isOpen={modalStatus !== null}
          onClose={handleModalClose}
        />
      )}
    </main>
  );
};

export default EditUserPage;
