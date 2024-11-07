import { SidebarLink } from "@/components/SidebarItems";
import { ClipboardList, HomeIcon, User } from "lucide-react";

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Dashboard", icon: HomeIcon },
  { href: "/Pemesanan", title: "Pemesanan", icon: ClipboardList },
  { href: "/Pekerja", title: "Manajemen Pekerja", icon: User },
];
