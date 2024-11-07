import SidebarItems from "./SidebarItems"

function Sidebar() {
  return (
    <aside className="h-screen min-w-52 bg-muted hidden md:block p-4 pt-8 border-r border-border shadow-inner">
      <div className="flex flex-col h-full">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold ml-4">EzKost</h3>
          <SidebarItems/>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar