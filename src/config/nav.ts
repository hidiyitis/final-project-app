import { SidebarLink } from "@/components/SidebarItems";
import { ClipboardList, HomeIcon, User, Package } from "lucide-react";

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Dashboard", icon: HomeIcon },
  { href: "/pemesanan", title: "Pemesanan", icon: ClipboardList },
  { href: "/layanan", title: "Layanan", icon: Package },
  { href: "/pekerja", title: "Manajemen Pekerja", icon: User },
  { href: "/userManagement", title: "Manajemen User", icon: User },
];

export const adminLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Dashboard", icon: HomeIcon },
  { href: "/pemesanan", title: "Pemesanan", icon: ClipboardList },
  { href: "/layanan", title: "Layanan", icon: Package },
  { href: "/pekerja", title: "Manajemen Pekerja", icon: User },
];
