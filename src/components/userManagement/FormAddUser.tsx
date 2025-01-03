"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Command,
} from "../ui/command";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  customerName: z.string().min(1, {
    message: "Required",
  }),
  address: z.string().min(1, {
    message: "Required",
  }),
  service: z.string(),
  pic: z.string(),
  price: z.number(),
});

const listService: ILayanan[] = [
  {
    id: 1,
    title: "Maling Motor",
    price: 25_000,
  },
  {
    id: 2,
    title: "Cuci Gudang",
    price: 25_000,
  },
  {
    id: 3,
    title: "Manasis Kompor",
    price: 25_000,
  },
];

function FormPemesanan({
  closeModal,
  pemesanan,
}: {
  closeModal?: () => void;
  pemesanan?: IPemesanan;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: pemesanan
      ? {
          customerName: pemesanan.customerName,
          address: pemesanan.address,
          pic: pemesanan.pic,
          service: pemesanan.service,
          price: pemesanan.price,
        }
      : {
          customerName: "",
          address: "",
          pic: "",
          service: "",
          price: 0,
        },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (pemesanan) {
      if (closeModal) {
        closeModal();
      }
    }
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder="Nama Lengkap" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Role</FormLabel>
          </FormItem>
          <FormField
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <select {...field} className="border rounded p-2">
                    <option disabled>Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                    <option value="user">User</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input placeholder="Status" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size={"lg"}>
            Simpan
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default FormPemesanan;
