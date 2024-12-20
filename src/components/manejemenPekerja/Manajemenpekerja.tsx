import { Switch } from "@/components/ui/switch";

interface ServiceProps{
    ser:{id:string, nama:string, email:string, alamat:string}
}

export default function ServiceCard({ser}: ServiceProps){
    return (
        <tr className="px-4 py-2 text-center hover:bg-slate-100 leading-4">
            <td className="px-4 py-2 text-left">{ser.nama}</td>
            <td className="px-4 py-2 text-left">{ser.email}</td>
            <td className="px-4 py-2 text-left">{ser.alamat}</td>
            <td className="px-4 py-2 text-center hover:scale-150"><Switch /></td>
        </tr>
    )
}