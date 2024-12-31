import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

const DialogModal = ({ status, message, isOpen, onClose }:{
  status : string,
  message: string,
  isOpen: boolean,
  onClose: ()=>void
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{status}</DialogTitle>
        <DialogDescription>{message}</DialogDescription>
        <DialogClose asChild>
          <Button onClick={onClose} className="mt-4 px-4 py-2 text-white rounded">
            {status === 'Berhasil' ?'Konfirmasi' : 'Coba Lagi'}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;
