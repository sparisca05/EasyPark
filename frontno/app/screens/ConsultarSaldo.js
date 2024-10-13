import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Dimensions, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';

import GlobalStyles from '../config/GlobalStyles';
import { useApiUrl } from '../config/ApiUrlContext';

function ConsultarSaldo() {
  const [usuario, setUsuario] = useState({});
  const apiUrl = useApiUrl();

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (token) {
          const response = await axios.get(`${apiUrl}/api/v1/perfil/saldo`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
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

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.dateText}>{item.fecha}</Text>
      <Text>{item.descripcion}</Text>
      <Text style={[styles.amountText, { color: item.monto > 0 ? 'green' : 'red' }]}>
        {item.monto > 0 ? `+${item.monto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}` : `${item.monto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}`}
      </Text>
    </View>
  );

  const calcularSaldoInicial = (transacciones) => {
    let saldoInicial = usuario.saldo;
    return transacciones.map(transaccion => {
      saldoInicial -= transaccion.monto;
      return saldoInicial;
    });
  }

  const calcularSaldosAcumulados = (transacciones) => {
    let saldoAcumulado = calcularSaldoInicial(transacciones)[transacciones.length - 1];
    return transacciones.map(transaccion => {
      saldoAcumulado += transaccion.monto;
      return saldoAcumulado;
    });
  };
 const saldosAcumulados = usuario.transacciones ? calcularSaldosAcumulados(usuario.transacciones.reverse()) : [];
  
  // Crear etiquetas para el eje X usando las fechas de las transacciones
  const labels = usuario.transacciones ? usuario.transacciones.map(transaccion => transaccion.fecha.slice(0, 5)) : [];

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Tu saldo: {usuario.saldo?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} COP</Text>
        
        {/* Gráfico de barras de saldos acumulados */}
        <BarChart
          data={{
            labels,
            datasets: [
              {
                data: saldosAcumulados,
              },
            ]
          }}
          width={Dimensions.get('window').width - 40} // Ajusta el ancho del gráfico
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          yAxisInterval={1} // Intervalo de 1, que luego se ajustará en los valores
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: () => `rgb(0, 0, 0)`,
            style: {
              borderRadius: 16
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
        <View style={styles.transactionContainer}>
          <View style={styles.transactionHeader}>
            <Text style={styles.subtitle}>Actividad reciente</Text>
            <Text style={styles.subtitle2}>Ver todo</Text>
          </View>
          {/* Lista de transacciones */}
          {usuario.transacciones && (
            <FlatList
              data={usuario.transacciones.reverse()} // Invierte el orden para mostrar las más recientes primero
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              style={styles.transactionList}
            />
          )}
        </View>
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
  },
  amountText: {
    fontWeight: 'bold',
  },
  transactionContainer: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#f3f3f3',
    width: '100%',
    flex: 1,
  },
  transactionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transactionList: {
    width: '100%',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },
  subtitle2: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
});

export default ConsultarSaldo;
