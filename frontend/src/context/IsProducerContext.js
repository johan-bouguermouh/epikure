"use client";

import React, { createContext, useContext, useState } from 'react';

const IsProducerContext = createContext();

export function useIsProducerContext() {
    return useContext(IsProducerContext);
}

export default function IsProducerProvider({ children }) {
    const [isProducer, setIsProducer] = useState(false);

    return (
        <IsProducerContext.Provider value={{ isProducer, setIsProducer }}>
            {children}
        </IsProducerContext.Provider>
    );
}
