"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./SidebarComponent";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

function MobileSidebarComponent() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col py-8">
        <nav className="grid gap-2 text-lg font-medium">
          {navItems.labels.map((label, index) => (
            <Link
              key={label}
              href={navItems.hrefs[index]}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                pathname === `/${navItems.hrefs[index]}` &&
                "bg-dark-secondary-100 text-primary-500" // Highlight the active link
              }`}
            >
              {navItems.icons[index]}
              {label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebarComponent;
