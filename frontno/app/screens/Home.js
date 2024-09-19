import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalStyles from '../config/GlobalStyles';
import HomeButton from '../components/HomeButton';
import { useApiUrl } from '../config/ApiUrlContext';

function Home({ navigation }) {
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
        <Text style={styles.greeting}>Hola <Text style={styles.boldText}>{usuario.nombre}</Text></Text>
        <Text style={styles.subGreeting}>¿Qué quieres hacer?</Text>

        <View style={styles.gridContainer}>
          <HomeButton text="Consultar saldo" icon={require('../assets/Balance.png')} onPress={() => navigation.navigate("Consultar Saldo")}/>
          <HomeButton text="Recarga" icon={require('../assets/Reload.png')}/>
          <HomeButton text="Ticket día" icon={require('../assets/ticket.png')}/>
          <HomeButton text="Registra tu vehículo" icon={require('../assets/Car.png')} onPress={() => navigation.navigate("Registrar Vehiculo")}/>
        </View>
        
        <Image source={require('../assets/logo2.png')} style={styles.logo_eia}/>
      </View>
    </SafeAreaView>
  );
};

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
  boldText: {
    fontWeight: 'bold',
  },
  subGreeting: {
    fontSize: 18,
    color: GlobalStyles.dark,
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', 
  },
  logo: {
    margin: 50,
    width: 20,
    height: 10,
    resizeMode: 'contain',
    transform: [{ scale: 0.7 }],
  },
});

export default Home;