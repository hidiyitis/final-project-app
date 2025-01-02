import { Trash2 } from "lucide-react";
import { useState } from "react";
import AlertDialogComponent from "./alertDialog";
import EditServices from "./EditService";
import { IService } from "@/lib/interfaces/serviceInterface";
import { fetchDeleteService } from "@/lib/apis/serviceApi";
import { useSession } from "next-auth/react";

interface ServiceProps {
  ser: IService;
  onUpdate: (id: number, updatedService: Partial<IService>) => void;
  onDelete: (id: number) => void;
}
export default function ServiceCard({ ser, onUpdate, onDelete }: ServiceProps) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const { data: session } = useSession();

  const handleDelete = async () => {
    if (!session) {
      console.error("User is not authenticated");
      return;
    }
    try {
      await fetchDeleteService(ser.id, session);
      onDelete(ser.id);
      setIsInfoDialogOpen(true);
      setInfoMessage(`Layanan ${ser.title} berhasil dihapus`);
    } catch (error: any) {
      setInfoMessage(error.message || "Gagal menghapus layanan");
      setIsInfoDialogOpen(true);
    } finally {
      setIsConfirmDialogOpen(false);
    }
  };
  

  const handleDeleteClick = () => {
    setIsConfirmDialogOpen(true);
  };

  return (
    <>
      <tr className="px-4 py-2 text-center hover:bg-slate-100 leading-4">
        <td className="px-4 py-2 text-left">{ser.title}</td>
        <td className="px-4 py-2 text-center">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(ser.price)}
        </td>
        <td className="px-4 py-2 text-left">{ser.desc}</td>
        <td> 
          <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full 
            ${ser.status === 'AVAILABLE' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {ser.status === 'AVAILABLE' ? 'Tersedia' : 'Tidak Tersedia'}
          </span>
        </td>
        <td>
          <button
            className="bg-transparent border-0 p-2 rounded-md hover:bg-blue-200"
          >
            <EditServices service={ser} onUpdate={onUpdate} />
          </button>
          <button
            className="bg-transparent border-0 p-2 rounded-md hover:bg-red-200"
            onClick={handleDeleteClick}
          >
            <Trash2 className="h-5 w-5 text-red-600" />
          </button>
        </td>
      </tr>

      <AlertDialogComponent
        mode="delete"
        title={ser.title}
        onConfirm={handleDelete}
        open={isConfirmDialogOpen}
        setOpen={setIsConfirmDialogOpen}
      />

      <AlertDialogComponent
        mode="confirm"
        title={infoMessage}
        onConfirm={() => setIsInfoDialogOpen(false)}
        open={isInfoDialogOpen}
        setOpen={setIsInfoDialogOpen}
      />
    </>
  );
}
