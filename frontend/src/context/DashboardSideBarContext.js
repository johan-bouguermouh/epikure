"use client";
import { createContext, useContext, useEffect, useState } from "react";


const DashboardSideBarContext = createContext();


export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(() => {
    // Récupérer l'état initial de localStorage
    const savedState = localStorage.getItem("isSidebarOpen");
    return savedState !== null ? JSON.parse(savedState) : true; // Valeur par défaut
  });

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      localStorage.setItem("isSidebarOpen", JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    // Mettre à jour localStorage lors de l'initialisation
    localStorage.setItem("isSidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

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