import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';

import GlobalStyles from '../config/GlobalStyles';
import HomeButton from '../components/HomeButton';
import LogoutButton from '../components/LogoutButton';
import GetUser from '../config/GetUser';

function Home({ navigation }) {
  const usuario = GetUser();

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.container}>
        <LogoutButton navigation={navigation} />
        <Text style={styles.greeting}>Hola <Text style={styles.boldText}>{usuario.nombre}</Text></Text>
        <Text style={styles.subGreeting}>¿Qué quieres hacer?</Text>

        <View style={styles.gridContainer}>
          <HomeButton text="Consultar saldo" icon={require('../assets/Balance.png')} onPress={() => navigation.navigate("Consultar Saldo")}/>
          <HomeButton text="Recarga" icon={require('../assets/Reload.png')}/>
          <HomeButton text="Ticket día" icon={require('../assets/ticket.png')} onPress={() => navigation.navigate("Ticket dia")}/>
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