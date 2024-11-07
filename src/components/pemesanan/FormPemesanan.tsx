'use client'
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Command } from "../ui/command"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  customerName: z.string().min(1, {
    message: "Required",
  }),
  address: z.string().min(1,{
    message: 'Required'
  }),
  service: z.string(),
  pic: z.string(),
  price: z.number()
})

const listService: ILayanan[] = [
  {
    id: 1,
    title: 'Maling Motor',
    price: 25_000
  },
  {
    id: 2,
    title: 'Cuci Gudang',
    price: 25_000
  },
  {
    id: 3,
    title: 'Manasis Kompor',
    price: 25_000
  },
]

function FormPemesanan({
  closeModal,
  pemesanan
}:{
  closeModal?: ()=>void,
  pemesanan?: IPemesanan
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: pemesanan ? {
      customerName: pemesanan.customerName,
      address: pemesanan.address,
      pic:pemesanan.pic,
      service: pemesanan.service,
      price:pemesanan.price
    }:{
      customerName:'',
      address: '',
      pic:'',
      service:'',
      price: 0
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    if(pemesanan){
      if (closeModal){
        closeModal()
      }
    }
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Pemesan</FormLabel>
                <FormControl>
                  <Input placeholder="Hidayatus" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Input placeholder="Jl. Kemana yaa..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Pilih Layanan</FormLabel>
          </FormItem>
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? listService.find(
                              (e) => e.title === field.value
                            )?.title
                          : "Pilih layanan"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Pilih Layanan..." />
                      <CommandList>
                        <CommandEmpty>Layanan tidak tersedia.</CommandEmpty>
                        <CommandGroup>
                          {listService.map((layanan) => (
                            <CommandItem
                              value={layanan.title}
                              key={layanan.id}
                              onSelect={() => {
                                form.setValue("service", layanan.title)
                              }}
                            >
                              {layanan.title}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  layanan.title === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Petugas</FormLabel>
                <FormControl>
                  <Input placeholder="Nama Petugas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size={'lg'}>Simpan</Button>
        </form>
      </Form>
    </div>
  )
}

export default FormPemesanan