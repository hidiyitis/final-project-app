import SidebarItems from "./SidebarItems"
import { SidebarGroup, SidebarGroupLabel } from "./ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "./ui/sidebar";
import { ChevronDown } from "lucide-react";



function Sidebar() {
  return (
    <aside className="h-screen min-w-52 bg-muted hidden md:block p-4 pt-8 border-r border-border shadow-inner">
      <div className="flex flex-col h-full">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold ml-4">EzKost</h3>
          <SidebarProvider>
                  <SidebarHeader>
                      <SidebarMenu>
                      <SidebarMenuItem>
                          <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <SidebarMenuButton>
                              Pilih Role
                              <ChevronDown className="ml-auto" />
                              </SidebarMenuButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                              <DropdownMenuItem>
                              <span>Admin</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                              <span>Super Admin</span>
                              </DropdownMenuItem>
                          </DropdownMenuContent>
                          </DropdownMenu>
                            <SidebarGroup>
                              <SidebarGroupLabel>Manage</SidebarGroupLabel>
                              <SidebarItems/>
                            </SidebarGroup>
                      </SidebarMenuItem>
                      </SidebarMenu>
                  </SidebarHeader>
            </SidebarProvider>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar