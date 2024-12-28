"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FormPemesanan from "./FormPemesanan";

export default function LayananModal({ 
  pemesanan
}: { 
  pemesanan?: IPemesanan;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>
          Ubah Pemesanan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-5 pt-5">
          <DialogTitle>Ubah Pemesanan</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <FormPemesanan closeModal={closeModal!} pemesanan={pemesanan!} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
