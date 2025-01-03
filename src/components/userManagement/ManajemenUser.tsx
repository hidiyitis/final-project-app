import { Switch } from "@/components/ui/switch";
import { IUser } from "../../config/interface/IUser";
import { Trash2, PencilLine } from "lucide-react";

interface ServiceProps {
  ser: IUser;
}

export default function ManajemenUser({ ser }: ServiceProps) {
  return (
    <tr className="px-4 py-2 text-center hover:bg-slate-100 leading-4">
      <td className="px-4 py-2 text-center">{ser.username}</td>
      <td className="px-4 py-2 text-center">{ser.email}</td>
      <td className="px-4 py-2 text-center">{ser.name}</td>
      <td className="px-4 py-2 text-center">{ser.role}</td>
      <td className="px-4 py-2 text-center">
        <div className="flex justify-center items-center hover:scale-150">
          <Switch />
        </div>
      </td>
      <td className="px-4 py-2 text-center">
        <div className="flex justify-center items-center space-x-4">
          <PencilLine color="#5A5A5A" className="hover:scale-150 " />
          <Trash2 color="#ff0000" className="hover:scale-150 " />
        </div>
      </td>
    </tr>
  );
}
