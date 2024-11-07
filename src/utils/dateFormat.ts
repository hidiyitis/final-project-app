import { MONTH } from "@/constants/pemesanan/constans"

export const parseIsoString = (iso: string): string =>{
  const date = new Date(iso)
  return `${date.getDay()} ${MONTH[date.getMonth()-1]} ${date.getFullYear()}`
}
