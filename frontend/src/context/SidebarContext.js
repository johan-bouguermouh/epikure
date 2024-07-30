"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useFarmerContext } from "./IsProducerContext";

// Créez le contexte
const SidebarContext = createContext();

// Fournisseur de contexte
export const SidebarProvider = ({ children }) => {
  const { isSidebarOpen, setIsSidebarOpen } = useFarmerContext();
  const [isOpen, setIsOpen] = useState(() => {
    // Récupérer l'état initial de localStorage
    return isSidebarOpen;
  });

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      setIsSidebarOpen(newState);
      return newState;
    });
  };

  useEffect(() => {}, [isOpen]);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useSidebar = () => {
  return useContext(SidebarContext);
};
