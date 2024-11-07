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
import { Checkbox } from "../ui/checkbox"

const formSchema = z.object({
  customerName: z.string().min(1, {
    message: "Required",
  }),
  address: z.string().min(1,{
    message: 'Required'
  }),
  services: z.array(z.object({
    id: z.number(),
    title: z.string(),
    price: z.number()
  })).min(1),
  pic: z.string(),
})

const listService: ILayanan[] = [
  {
    id: 1,
    title: 'Makan Kuda',
    price: 25_000
  },
  {
    id: 2,
    title: 'Sedot Dosa',
    price: 25_000
  },
]

function FormPemesanan() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      address:"",
      services: []
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
          {listService.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="services"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.some(e=> e.id===item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value.id !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.title}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
          <Button type="submit" size={'lg'}>Simpan</Button>
        </form>
      </Form>
    </div>
  )
}

export default FormPemesanan