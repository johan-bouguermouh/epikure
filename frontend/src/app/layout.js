import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import IsProducerProvider from '../context/IsProducerContext';
import NavComponent from "../components/NavComponent";
import FooterComponent from "../components/FooterComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EPIKURE",
  description: "Application de mise en relation producteur(trice) et consomm'acteur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <IsProducerProvider>
          <NavComponent />
          {children}
        </IsProducerProvider>
        <FooterComponent />
      </body>
    </html>
  );
}
