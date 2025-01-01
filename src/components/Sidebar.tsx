import SidebarItems from "./SidebarItems"
import { SidebarGroup, SidebarGroupLabel } from "./ui/sidebar"
import {SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarProvider } from "./ui/sidebar";


function Sidebar() {
  return (
    <aside className="h-svh min-w-52 bg-muted hidden md:block p-4 pt-8 border-r border-border shadow-inner">
      <div className="flex flex-col h-full">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold ml-4">EzKost</h3>
          <SidebarProvider>
              <SidebarHeader>
                  <SidebarMenu>
                    <SidebarMenuItem>
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