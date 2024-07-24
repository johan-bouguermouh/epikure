import DashboardHeaderComponent from "@/components/DashboardHeaderComponent";
import DashboardSideBarComponent from "@/components/DashboardSideBarComponent";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SidebarProvider } from "@/context/DashboardSideBarContext";
import { Inter } from "next/font/google";
import IsProducerProvider from "../context/IsProducerContext";

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
         {children}
        </IsProducerProvider>
      </body>
    </html>
  );
}
