import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DialogDemo() {

  const [serviceName, setServiceName] = useState<string>("");

    const konfirmasi = () => {
        alert(`Pekerja ${serviceName} telah berhasil dihapus!`);
        setServiceName("");
      };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Menghapus Pekerja</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Menghapus</DialogTitle>
          <DialogDescription>
            Menghapus Pekerja
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nama
            </Label>
            <Input id="name" className="col-span-3" value={serviceName} onChange={(e) => setServiceName(e.target.value)}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input id="username" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant="destructive" onClick={konfirmasi}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
