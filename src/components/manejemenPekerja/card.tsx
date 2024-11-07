import * as React from "react"

import DialogPekerja from "./DialogpPekerja"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CardWithForm() {
  return (
    <Card className="w-[350px]">
    
      <CardContent>
        <form>
          <div className="grid w-full items-center">
            <div className="flex flex-col space-y-1.5 mt-5">
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Layanan" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Deep Cleaning</SelectItem>
                  <SelectItem value="sveltekit">General Cleaning</SelectItem>
                  <SelectItem value="astro">Fogging</SelectItem>
                  <SelectItem value="nuxt">Hydro Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <div className="flex item-row">
        <div className="basis-1/4 ml-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide  
                lucide-user-plus">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" x2="19" y1="8" y2="14"/>
                <line x1="22" x2="16" y1="11" y2="11"/>
            </svg>
        </div>
        <div className="basis-1/4">
            <CardFooter>
                <DialogPekerja/>
            </CardFooter>
        </div>
      </div>
    </Card>
  )
}
