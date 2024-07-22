import DashboardHeaderComponent from "@/components/DashboardHeaderComponent";
import SideBarComponent from "@/components/SidebarComponent";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SidebarProvider } from "@/context/SidebarContext";
import { Inter } from "next/font/google";
import React from "react";
import IsProducerProvider from '../context/IsProducerContext';
import NavComponent from "../components/NavComponent";
import FooterComponent from "../components/FooterComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EPIKURE",
  description:
    "Application de mise en relation producteur(trice) et consomm'acteur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <IsProducerProvider>
          <NavComponent />
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <SideBarComponent />
              <div className="flex-1 flex flex-col">
                <DashboardHeaderComponent />
                <main className="flex-1">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
        </IsProducerProvider>
        <FooterComponent />
      </body>
    </html>
  );
}
