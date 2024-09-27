// ApiUrlContext.js
import React, { createContext, useContext } from 'react';
import { API_URL } from '@env';

// Crear el contexto
const ApiUrlContext = createContext();

// Hook personalizado para usar el contexto
export const useApiUrl = () => {
  return API_URL;
};

// Proveedor del contexto
export const ApiUrlProvider = ({ children }) => {
  return (
    <ApiUrlContext.Provider value={API_URL}>
      {children}
    </ApiUrlContext.Provider>
  );
};
