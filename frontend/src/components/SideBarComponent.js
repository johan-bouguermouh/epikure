"use client";
import { useSidebar } from "@/context/SidebarContext";
import {
  Carrot,
  Handshake,
  LogOut,
  Maximize2,
  Minimize2,
  ShoppingBasket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoDark from "../../public/logo/Epikure_dark.svg";
import SmallLogo from "../../public/logo/Epikure_icon.svg";
import ProfilImage from "../../public/profil.jpg";

export const navItems = {
  labels: ["Ajout Produit", "Commandes", "Partenaires"],
  hrefs: ["addProduct", "orders", "partners"],
  icons: [
    <Carrot className="h-6 w-6" />,
    <ShoppingBasket className="h-6 w-6" />,
    <Handshake className="h-6 w-6" />,
  ],
};

function SideBarComponent() {
  const pathname = usePathname();
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`relative border-r bg-muted/40 md:block ${
        isOpen ? "w-72" : "w-20"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            {isOpen ? (
              <Image src={LogoDark} alt="logo" width={100} height={100} />
            ) : (
              <Image src={SmallLogo} alt="logo" width={60} height={60} />
            )}
          </Link>
        </div>
        <div className="absolute top-[70px] right-2 cursor-pointer hover:text-fuchsia-600 transition-all duration-200 ease-in-out">
          {isOpen ? (
            <Minimize2 onClick={toggleSidebar} className="h-4 w-4" />
          ) : (
            <Maximize2 onClick={toggleSidebar} className="h-4 w-4" />
          )}
        </div>
        <div className="flex-1 pt-10">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.labels.map((label, index) => (
              <Link
                key={label}
                href={navItems.hrefs[index]}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname === `/${navItems.hrefs[index]}` &&
                  "bg-dark-secondary-100 text-primary-500"
                } ${isOpen ? "justify-start" : "justify-center"}`}
              >
                {navItems.icons[index]}
                {isOpen && <span>{label}</span>}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Link
            href="/user"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all bg-dark-primary-300 text-primary-50"
          >
            <Image
              src={ProfilImage}
              alt="logo"
              width={30}
              height={30}
              className="rounded-full"
            />
            {isOpen && <span>Mon Profil</span>}
          </Link>
        </div>
        <div className="mt-auto p-4">
          <Link
            href="/"
            className="flex justify-center items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all 
                  bg-dark-secondary-100 text-primary-500"
          >
            <LogOut className="w-4 h-4" /> {isOpen && "Déconnexion"}
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default SideBarComponent;
