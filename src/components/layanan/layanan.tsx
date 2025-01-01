import { Switch } from "@/components/ui/switch";
import { Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/router";
import AlertDialogComponent from "./alertDialog";
import EditServices from "./EditService";

interface ServiceProps {
  ser: { id: string; title: string; price: number; desc: string };
}

export default function ServiceCard({ ser }: ServiceProps) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // Untuk konfirmasi hapus
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false); // Untuk informasi setelah hapus
  const [infoMessage, setInfoMessage] = useState(""); // Pesan dinamis untuk dialog informasi
  //const router = useRouter(); 

  const handleDelete = () => {
    setIsConfirmDialogOpen(false); // Tutup dialog konfirmasi
    setInfoMessage(`Layanan ${ser.title} berhasil dihapus`); // Atur pesan informasi
    setIsInfoDialogOpen(true); // Buka dialog informasi
  };

  const handleDeleteClick = () => {
    setIsConfirmDialogOpen(true); // Buka dialog konfirmasi
  };

  return (
    <>
      <tr className="px-4 py-2 text-center hover:bg-slate-100 leading-4">
        <td className="px-4 py-2 text-left">{ser.title}</td>
        <td className="px-4 py-2 text-center">{ser.price}</td>
        <td className="px-4 py-2 text-left">{ser.desc}</td>
        <td className="px-4 py-2 text-center hover:scale-150">
          <Switch />
        </td>
        <td>
          <button
            className="bg-transparent border-0 p-2 rounded-md hover:bg-blue-200"
          >
            <EditServices/>
          </button>
          <button
            className="bg-transparent border-0 p-2 rounded-md hover:bg-red-200"
            onClick={handleDeleteClick}
          >
            <Trash2 className="h-5 w-5 text-red-600" />
          </button>
        </td>
      </tr>

      {/* AlertDialogComponent untuk konfirmasi hapus */}
      <AlertDialogComponent
        mode="delete"
        title={ser.title}
        onConfirm={handleDelete}
        open={isConfirmDialogOpen}
        setOpen={setIsConfirmDialogOpen}
      />

      {/* AlertDialogComponent untuk informasi penghapusan */}
      <AlertDialogComponent
        mode="confirm" // Tetap menggunakan mode "add" untuk tampilan dialog
        title={infoMessage} // Pesan informasi dinamis
        onConfirm={() => setIsInfoDialogOpen(false)} // Tutup dialog informasi
        open={isInfoDialogOpen}
        setOpen={setIsInfoDialogOpen}
      />
    </>
  );
}
