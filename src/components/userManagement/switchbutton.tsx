
import * as Switch from "@radix-ui/react-switch";
import { Label } from "@/components/ui/label"; 
import { useState } from "react";

export function SwitchDemo() {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => setIsActive(!isActive);

  return (
    <div className="flex items-center space-x-2">
      <Switch.Root
        checked={isActive}
        onCheckedChange={handleToggle}
        className={`${
          isActive ? "bg-green-500" : "bg-red-500"
        } relative inline-flex items-center h-6 w-11 rounded-full transition-colors`}
      >
        <Switch.Thumb className="w-5 h-5 bg-white rounded-full transition-transform transform-gpu" />
      </Switch.Root>
      <Label htmlFor="airplane-mode">
        {isActive ? "Active" : "Non-Active"}
      </Label>
    </div>
  );
}
