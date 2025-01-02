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
import AlertDialogComponent from "./alertDialog";
import { fetchCreateService } from "@/lib/apis/serviceApi";
import { useSession } from "next-auth/react";

interface ServiceProps {
  onAdd: () => void;
}

export default function ServiceManager({ onAdd }: ServiceProps) {
  const [serviceName, setServiceName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: session } = useSession();
  const [dialogMode, setDialogMode] = useState<"add" | "delete">("add");

  const handeAddClick = () => {
    setIsDialogOpen(false);
    setServiceName("");
  }

  const handleAddService = async () => {
    if (!serviceName || !description || !price) {
      alert("Semua field harus diisi!");
      return;
    }

    const newService = {
      title: serviceName,
      desc: description,
      price: price,
    };

    try {
      await fetchCreateService(newService, session);
      setServiceName("");
      setDescription("");
      setPrice(0);
      setDialogMode("add");
      setIsDialogOpen(true);
      onAdd();
    } catch (error) {
      alert(`Gagal menambahkan layanan: ${(error as Error).message}`);
    }

  };

  return (
    <div>
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
              <form>
                <input
                  type="text"
                  name="title"
                  placeholder="Nama Layanan"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="border p-2 rounded w-full mb-2"
                />
                <textarea
                  name="desc"
                  placeholder="Deskripsi Layanan"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border p-2 rounded w-full mb-2"
                ></textarea>
                <input
                  type="number"
                  name="price"
                  placeholder="Harga Layanan"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="border p-2 rounded w-full mb-2"
                />
              </form>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button
                type="button"
                className="hover:bg-gray-500"
                onClick={handleAddService}
              >
                Tambah
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Komponen AlertDialog */}
      <AlertDialogComponent
        mode={dialogMode}
        title={serviceName}
        onConfirm={handeAddClick}
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
      />
    </div>
  );
}
