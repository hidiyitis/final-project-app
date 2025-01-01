import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

interface AlertDialogProps {
  mode: "add" | "delete" | "confirm"; // Mode dialog: add, delete, atau confirm
  title: string; // Nama layanan
  message?: string; // Pesan khusus untuk ditampilkan (opsional)
  onConfirm: () => void; // Fungsi yang dijalankan saat konfirmasi
  open: boolean; // Status apakah dialog terbuka
  setOpen: (value: boolean) => void; // Fungsi untuk mengubah status dialog
}

export default function AlertDialogComponent({
  mode,
  title,
  message,
  onConfirm,
  open,
  setOpen,
}: AlertDialogProps) {
  // Tentukan pesan header berdasarkan mode
  const dialogMessage = message
    ? message // Gunakan pesan dinamis jika tersedia
    : mode === "add"
    ? `Layanan ${title} berhasil ditambah`
    : mode === "delete"
    ? `Akan Menghapus Layanan ${title}`
    : `${title}`;

  // Tentukan deskripsi tambahan (hanya untuk mode delete)
  const dialogDescription =
    mode === "delete" && !message
      ? "Apakah Anda yakin ingin menghapus layanan ini?"
      : null;

  // Tentukan teks tombol aksi utama
  const actionText = mode === "add" || mode === "confirm" ? "OK" : "Hapus";

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogMessage}</AlertDialogTitle>
          {dialogDescription && <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {mode === "delete" && !message && (
            <AlertDialogCancel onClick={() => setOpen(false)}>Batal</AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
