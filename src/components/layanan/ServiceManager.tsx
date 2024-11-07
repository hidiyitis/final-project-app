import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function ServiceManager() {
    const [serviceName, setServiceName] = useState<string>("");

    const handleAdd = () => {
        alert(`Layanan "${serviceName}" telah berhasil ditambah!`);
        setServiceName("");
      };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Tambah Layanan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Layanan Kebersihan</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
          <h2 className="text-lg font-bold">Layanan Baru</h2>
            <input type="text" placeholder="Nama Layanan"  value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="border p-2 rounded w-full mb-2"/>
            <textarea placeholder="Deskripsi Layanan" className="border p-2 rounded w-full mb-2"></textarea>
            <input
            type="number"
            placeholder="Harga Layanan"
            className="border p-2 rounded w-full mb-2"/>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button type="button" className=" hover:bg-gray-500" onClick={handleAdd}>
              Tambah
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
