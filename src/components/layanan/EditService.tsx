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
import { Edit2 } from "lucide-react";

export default function EditServices() {
  const [serviceName, setServiceName] = useState<string>("");
  
  const [serviceDescription, setServiceDescription] = useState<string>("");
  const [servicePrice, setServicePrice] = useState<number | "">("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Untuk AlertDialog
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");

  // Fungsi untuk membuka dialog tambah
  const handleAdd = () => {
    setDialogMode("add");
    setIsDialogOpen(true);
    setServiceName("");
    setServiceDescription("");
    setServicePrice("");
  };

  // Fungsi untuk membuka dialog edit dengan data awal
  const handleEdit = (service: {
    name: string;
    description: string;
    price: number;
  }) => {
    setDialogMode("edit");
    setIsDialogOpen(true);
    setServiceName(service.name);
    setServiceDescription(service.description);
    setServicePrice(service.price);
  };

  // Fungsi untuk menyimpan data setelah edit
  const handleSave = () => {
    if (dialogMode === "edit") {
      console.log("Layanan diperbarui:", {
        name: serviceName,
        description: serviceDescription,
        price: servicePrice,
      });
    } else {
      console.log("Layanan baru ditambahkan:", {
        name: serviceName,
        description: serviceDescription,
        price: servicePrice,
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <div>
      {/* Dialog untuk menambah atau mengedit layanan */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
          <Edit2 className="w-5"></Edit2>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Layanan</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
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
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  className="border p-2 rounded w-full mb-2"
                ></textarea>
                <input
                  type="number"
                  name="price"
                  placeholder="Harga Layanan"
                  value={servicePrice}
                  onChange={(e) => setServicePrice(Number(e.target.value))}
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
                onClick={handleSave}
              >
                Simpan
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
