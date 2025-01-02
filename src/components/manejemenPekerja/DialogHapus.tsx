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
import { deleteWorkerByEmail } from "@/lib/apis/workerApi"; // Import fungsi API
import { useSession } from "next-auth/react";

export default function DialogDeleteWorkerByEmail() {
  const [workerEmail, setWorkerEmail] = useState<string>("");
  const { data: session } = useSession();

  const handleDeleteWorker = async () => {
    if (!workerEmail) {
      alert("Email pekerja harus diisi!");
      return;
    }

    try {
      if (!session) throw new Error("Session tidak ditemukan");

      await deleteWorkerByEmail(session, workerEmail);
      alert(`Pekerja dengan email "${workerEmail}" berhasil dihapus!`);

      // Reset state
      setWorkerEmail("");
    } catch (error: any) {
      alert(error.message || "Gagal menghapus pekerja");
    }
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
            Masukkan email pekerja yang ingin dihapus
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="workerEmail" className="text-right">
              Email Pekerja
            </Label>
            <Input
              id="workerEmail"
              className="col-span-3"
              value={workerEmail}
              onChange={(e) => setWorkerEmail(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            onClick={handleDeleteWorker}
          >
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
