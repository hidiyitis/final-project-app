"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormAddUser from "./FormAddUser";
import { IFormUser } from "@/lib/interfaces/userInterface";
import { fetchUpdateUser } from "@/lib/apis/userApi";
import { redirect, useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DialogModal from "../DialogModal";

export default function PemesananModal({ user }: { user?: IFormUser }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [message, setMessage] = useState<string>("");
  const { id } = useParams();
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/");
  }
  const handleSubmit = async (data: IFormUser) => {
    setOpen(false);
    try {
      const result = await fetchUpdateUser(Number(id), data, session!);
      setMessage(result?.message);
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setIsOpenModal(true);
    }
  };
  const handleSuccess = async () => {
    setIsOpenModal(false);
    setMessage("");
  };
  return (
    <>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button>Ubah Pemesanan</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="px-5 pt-5">
            <DialogTitle>Ubah Pemesanan</DialogTitle>
          </DialogHeader>
          <div className="px-5 pb-5">
            <FormAddUser initialValues={user} onSubmit={handleSubmit} />
          </div>
        </DialogContent>
      </Dialog>
      <DialogModal
        status={message ? "Berhasil" : "Gagal"}
        message={message}
        isOpen={isOpenModal}
        onClose={handleSuccess}
      />
    </>
  );
}
