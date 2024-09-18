// ApiUrlContext.js
import React, { createContext, useContext } from 'react';
import { API_URL } from '@env';

// Crear el contexto
const ApiUrlContext = createContext();

// Hook personalizado para usar el contexto
export const useApiUrl = () => {
  return useContext(ApiUrlContext);
};

// Proveedor del contexto
export const ApiUrlProvider = ({ children }) => {
  const apiUrl = API_URL; // O importarlo de '@env' si prefieres
  return (
    <ApiUrlContext.Provider value={apiUrl}>
      {children}
    </ApiUrlContext.Provider>
  );
};
