import { SidebarLink } from "@/components/SidebarItems";
import { ClipboardList, HomeIcon, Package } from "lucide-react";

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Dashboard", icon: HomeIcon },
  { href: "/pemesanan", title: "Pemesanan", icon: ClipboardList },
  { href: "/layanan", title: "Layanan", icon: Package},
];
