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
import { useState, useEffect } from "react";
import { Edit2 } from "lucide-react";
import { IService } from "@/lib/interfaces/serviceInterface";
import AlertDialogComponent from "./alertDialog";

interface EditServicesProps {
  service: IService; // Data layanan yang akan diedit
  onUpdate: (id: number, updatedService: Partial<IService>) => void; // Callback untuk update
}

enum ServiceStatus {
  AVAILABLE = "AVAILABLE",
  NON_AVAILABLE = "NON_AVAILABLE",
}

export default function EditServices({ service, onUpdate }: EditServicesProps) {
  const [serviceName, setServiceName] = useState<string>("");
  const [serviceDescription, setServiceDescription] = useState<string>("");
  const [servicePrice, setServicePrice] = useState<number | 0>(0);
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>(ServiceStatus.AVAILABLE);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (service) {
      setServiceName(service.title);
      setServiceDescription(service.desc);
      setServicePrice(service.price);
      setServiceStatus(service.status);
    }
  }, [service]);

  const handleSave = () => {
    const updatedService = {
      title: serviceName,
      desc: serviceDescription,
      price: servicePrice,
      status: serviceStatus,
    };

    onUpdate(service.id, updatedService);
  };

  const handeEditClick = () => {
    setIsDialogOpen(false);
    setServiceName("");
  }

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
                <div className="mb-2">
                  <label className="block text-gray-700">Status</label>
                  <select
                    value={serviceStatus}
                    onChange={(e) => setServiceStatus(e.target.value as ServiceStatus)}
                    className="border p-2 rounded w-full"
                  >
                    <option value={ServiceStatus.AVAILABLE}>Tersedia</option>
                    <option value={ServiceStatus.NON_AVAILABLE}>Tidak Tersedia</option>
                  </select>
                </div>
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

      <AlertDialogComponent
              mode="edit"
              title={serviceName}
              onConfirm={handeEditClick}
              open={isDialogOpen}
              setOpen={setIsDialogOpen}
      />
    </div>
  );
}
