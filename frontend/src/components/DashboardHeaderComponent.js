"use client";

import { useSidebar } from "@/context/SidebarContext";
import { Search } from "lucide-react";
import MobileSidebarComponent from "./MobileSidebarComponent";
import { Input } from "./ui/input";
import { ModeToggle } from "./ui/mode-toggle";

function DashboardHeaderComponent() {
  const { isOpen } = useSidebar(); // Utilisation du hook pour obtenir l'état de la sidebar

  return (
    <header
      className={`flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 transition-all duration-300 ease-in-out ${
        isOpen ? "pl-72" : "pl-20"
      }`}
    >
      <MobileSidebarComponent />
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <ModeToggle />
    </header>
  );
}

export default DashboardHeaderComponent;
