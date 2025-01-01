import { MONTH } from "@/constants/pemesanan/constans"

export const parseIsoString = (iso: string): string =>{
  const date = new Date(iso)
  return `${date.getDate()} ${MONTH[date.getMonth()]} ${date.getFullYear()}`
}

export const parseDateTime = (iso: string): String=>{
  const date = new Date(iso)
  const timeString = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });

  return `${date.getDate()} ${MONTH[date.getMonth()]} ${date.getFullYear()} ${timeString}`
}