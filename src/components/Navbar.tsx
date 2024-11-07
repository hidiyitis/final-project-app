import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"

function Navbar() {
  return (
    <div className="flex flex-row justify-end items-center gap-3 py-3 px-10 bg-primary-foreground">
      <p className="font-medium">Ez Kost</p>
      <Avatar>
        <AvatarImage src=""/>
        <AvatarFallback className="font-semibold">EK</AvatarFallback>
      </Avatar>
    </div>
  )
}

export default Navbar