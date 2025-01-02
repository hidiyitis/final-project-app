import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addWorker } from "@/lib/apis/workerApi"; // Import fungsi API
import { useSession } from "next-auth/react";

export default function DialogDemo() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const { data: session } = useSession();

  const handleAddWorker = async () => {
    if (!name || !email || !alamat) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      if (!session) throw new Error("Session tidak ditemukan");
      
      await addWorker(session, { name, email, alamat });
      alert(`Pekerja ${name} berhasil ditambahkan!`);
      
      // Reset state
      setName("");
      setEmail("");
      setAlamat("");
    } catch (error: any) {
      alert(error.message || "Gagal menambahkan pekerja");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Tambahkan Pekerja</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Menambahkan</DialogTitle>
          <DialogDescription>
            Menambahkan Pekerja Baru
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nama
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              className="col-span-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alamat" className="text-right">
              Alamat
            </Label>
            <Input
              id="alamat"
              className="col-span-3"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddWorker}>
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
