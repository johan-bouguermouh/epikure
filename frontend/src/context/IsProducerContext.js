"use client";

import React, { createContext, useState, useContext } from "react";

const FarmerContext = createContext();

export default function FarmerProvider({ children } = {}) {
  const [isProducer, setIsProducer] = useState(false);
  const [farmer, setFarmer] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <FarmerContext.Provider
      value={{
        isProducer,
        setIsProducer,
        setFarmer,
        farmer,
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </FarmerContext.Provider>
  );
}

export function useFarmerContext() {
  return useContext(FarmerContext);
}
