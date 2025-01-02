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
  mode: "add" | "delete" | "confirm" | "edit";
  title: string;
  message?: string;
  onConfirm: () => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function AlertDialogComponent({
  mode,
  title,
  message,
  onConfirm,
  open,
  setOpen,
}: AlertDialogProps) {
  const dialogMessage = message
    ? message
    : mode === "add"
    ? `Layanan ${title} berhasil ditambah`
    : mode === "delete"
    ? `Akan Menghapus Layanan ${title}`
    : mode === "edit"
    ? `Layanan ${title} berhasil diupdate`
    : `Layanan ${title} berhasil dihapus`;

  const dialogDescription =
    mode === "delete" && !message
      ? "Apakah Anda yakin ingin menghapus layanan ini?"
      : null;

  const actionText = mode === "add" || mode === "confirm" || mode === "edit" ? "OK" : "Hapus";

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
