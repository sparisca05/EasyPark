import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import HomeButton from '../components/HomeButton';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hola <Text style={styles.boldText}>Daniel</Text></Text>
      <Text style={styles.subGreeting}>¿Qué quieres hacer?</Text>

      <View style={styles.gridContainer}>
        <HomeButton text="Consultar saldo" icon={require('../assets/Balance.png')}/>
        <HomeButton text="Recarga" icon={require('../assets/Reload.png')}/>
        <HomeButton text="Ticket día" icon={require('../assets/ticket.png')}/>
        <HomeButton text="Registra tu vehículo" icon={require('../assets/Car.png')}/>
      </View>
      
      <Image source={require('../assets/logo2.png')} style={styles.logo_eia}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 24,
    color: '#2E3A5E',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  subGreeting: {
    fontSize: 18,
    color: '#2E3A5E',
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', 
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