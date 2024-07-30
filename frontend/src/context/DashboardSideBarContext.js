"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useFarmerContext } from "./IsProducerContext";

const DashboardSideBarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const farmerContext = useFarmerContext();
  const [isOpen, setIsOpen] = useState(() => {
    // Récupérer l'état initial de localStorage
    const savedState = farmerContext.isSidebarOpen;
    return savedState; // Valeur par défaut
  });

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      // Mettre à jour localStorage
      farmerContext.setIsSidebarOpen(newState);
      return newState;
    });
  };

  useEffect(() => {}, [isOpen]);

  return (
    <DashboardSideBarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </DashboardSideBarContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useSidebar = () => {
  return useContext(DashboardSideBarContext);
};
