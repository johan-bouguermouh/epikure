import { Inter } from "next/font/google";
import "./globals.css";
import FarmerProvider from "@/context/IsProducerContext";
import { SidebarProvider } from "@/context/SidebarContext";

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
        <FarmerProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </FarmerProvider>
      </body>
    </html>
  );
}
