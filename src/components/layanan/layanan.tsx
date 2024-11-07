import { Switch } from "@/components/ui/switch";
import { Trash2 } from 'lucide-react';

interface ServiceProps{
    ser:{id:string,title:string, harga:number, desc: string}
}

export default function ServiceCard({ser}: ServiceProps){
    const handleDelete = () => {
        alert(`Layanan "${ser.title}" telah dihapus.`);
    };
    return (
        <tr className="px-4 py-2 text-center hover:bg-slate-100 leading-4">
            <td className="px-4 py-2 text-left">{ser.title}</td>
            <td className="px-4 py-2 text-center">{ser.harga}</td>
            <td className="px-4 py-2 text-left">{ser.desc}</td>
            <td className="px-4 py-2 text-center hover:scale-150"><Switch /></td>
            <td>
            <button className="bg-transparent border-0 p-2 rounded-md hover:bg-red-200" onClick={handleDelete}>
          <Trash2 className="h-5 w-5 text-red-600" />
        </button>
            </td>
        </tr>
    )
}