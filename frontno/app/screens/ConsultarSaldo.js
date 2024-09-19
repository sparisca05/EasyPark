import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalStyles from '../config/GlobalStyles';
import { useApiUrl } from '../config/ApiUrlContext';

function ConsultarSaldo({navigation}) {
    const [usuario, setUsuario] = useState('');
    const apiUrl = useApiUrl();
  
      useEffect(() => {
          const obtenerUsuario = async () => {
            try {
              // Obtener el token desde AsyncStorage
              const token = await AsyncStorage.getItem('token');
  
              if (token) {
                  // Hacer la solicitud al backend para obtener el usuario
                  const response = await axios.get(`${apiUrl}/api/v1/perfil`, {
                      headers: {
                          'Authorization': `Bearer ${token}`  
                      }
                  });
  
                  // Establecer el nombre del usuario en el estado
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
    return (
        <SafeAreaView style={GlobalStyles.container}>
            <View style={styles.container}>
                <Text style={styles.greeting}>Tu saldo: ${usuario.saldo} COP</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      padding: 20,
      backgroundColor: '#FFFFFF',
    },
    greeting: {
      fontSize: 24,
      color: GlobalStyles.dark,
      marginBottom: 5,
    },
});

export default ConsultarSaldo;