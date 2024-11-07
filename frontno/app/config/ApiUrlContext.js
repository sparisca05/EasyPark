// ApiUrlContext.js
import React, { useState, useEffect, createContext } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { API_URL } from '@env';

// Crear el contexto
export const ApiUrlContext = createContext();

export function GetUser () {
  let [usuario, setUsuario] = useState('');

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (token) {
          const response = await axios.get(`${API_URL}/api/v1/perfil`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setUsuario(response.data);
        } else {
          Alert.alert('Error', 'No se encontró el token.');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        if (error.response) {
          Alert.alert('Error', `Servidor: ${error.response.data.message}`);
        } else {
          Alert.alert('Error', 'No se pudo conectar al servidor.');
        }
      }
    };

    obtenerUsuario();
  }, []);

  return usuario;
}

export const Recharge = async (monto, mensajeExito, navigation) => {
  try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
          await axios.put(`${API_URL}/api/v1/perfil/recargar`, {
              monto: monto,
          }, {
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          });
          Alert.alert('Éxito', mensajeExito, [
              { text: 'OK', onPress: () => navigation.navigate('Home') }
          ]);
      } else {
          Alert.alert('Error', 'No se encontró el token.');
      }
  } catch (error) {
      console.error('Error al recargar el saldo:', error);
      if (error.response) {
          Alert.alert('Error', `Servidor: ${error.response.data.message}`);
      } else {
          Alert.alert('Error', 'No se pudo conectar al servidor.');
      }
  }

};

// Proveedor del contexto
export const ApiUrlProvider = ({ children }) => {
  return (
    <ApiUrlContext.Provider value={API_URL}>
      {children}
    </ApiUrlContext.Provider>
  );
};
