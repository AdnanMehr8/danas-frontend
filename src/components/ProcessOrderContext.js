// ProcessOrderContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ProcessOrderContext = createContext();

export const ProcessOrderProvider = ({ children }) => {
  const [processOrder, setProcessOrder] = useState(() => {
    const savedProcesses = JSON.parse(localStorage.getItem('processes') || '[]');
    return savedProcesses;
  });

  useEffect(() => {
    localStorage.setItem('processes', JSON.stringify(processOrder));
  }, [processOrder]);

  return (
    <ProcessOrderContext.Provider value={{ processOrder, setProcessOrder }}>
      {children}
    </ProcessOrderContext.Provider>
  );
};
