import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useApiUrl } from './ApiUrlContext';

function GetUser () {
  let [usuario, setUsuario] = useState('');
  let apiUrl = useApiUrl();

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (token) {
          const response = await axios.get(`${apiUrl}/api/v1/perfil`, {
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
};

export default GetUser;
