import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Dimensions, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';

import GlobalStyles from '../config/GlobalStyles';
import { useApiUrl } from '../config/ApiUrlContext';

function ConsultarSaldo({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const apiUrl = useApiUrl();

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        // Obtener el token desde AsyncStorage
        const token = await AsyncStorage.getItem('token');

        if (token) {
          // Hacer la solicitud al backend para obtener el perfil del usuario
          const response = await axios.get(`${apiUrl}/api/v1/perfil/saldo`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          // Establecer el usuario y las transacciones en el estado
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

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.dateText}>{item.fecha}</Text>
      <Text>{item.descripcion}</Text>
      <Text style={[styles.amountText, { color: item.monto > 0 ? 'green' : 'red' }]}>
        {item.monto > 0 ? `+${item.monto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}` : `${item.monto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}`}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Tu saldo: {usuario.saldo?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} COP</Text>

        <FlatList
          data={usuario.transacciones}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={styles.transactionList}
        />
        
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dateText: {
    fontWeight: 'bold',
  },
  amountText: {
    fontWeight: 'bold',
  },
  transactionList: {
    width: '100%',
  },
});

export default ConsultarSaldo;
