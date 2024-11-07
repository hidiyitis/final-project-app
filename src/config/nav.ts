import { SidebarLink } from "@/components/SidebarItems";
import { ClipboardList, HomeIcon, User } from "lucide-react";

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Dashboard", icon: HomeIcon },
  { href: "/pemesanan", title: "Pemesanan", icon: ClipboardList },
  { href: "/pekerja", title: "Manajemen Pekerja", icon: User },
];
