import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, Platform } from 'react-native';

import Button from '../components/Button';

function Welcome({ navigation }) {
  
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.logo_title}>EasyPark</Text>
                <Text style={styles.eia_title}>EIA</Text>
            </View>
            <Image source={require('../assets/logo eia.png')} style={styles.logo_eia}/>
            <Button title="Iniciar" onPress={() => navigation.navigate('Login')} />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    logo_title: {
      fontSize: 64,
      fontWeight: '500',
      color: '#023F81'
    },
    eia_title: {
      fontSize: 64,
      fontWeight: '500',
      color: '#5AC8FA',
      textAlign: 'center'
    },
    logo_eia: {
      width: 350,
      height: 180,
    },
  });

export default Welcome;