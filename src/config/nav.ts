import { SidebarLink } from "@/components/SidebarItems";
import { ClipboardList, HomeIcon } from "lucide-react";

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Dashboard", icon: HomeIcon },
  { href: "/pemesanan", title: "Pemesanan", icon: ClipboardList },
];
