import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, StatusBar, Platform } from 'react-native';

import GlobalStyles from '../config/GlobalStyles';
import Button from '../components/Button';

function Welcome({ navigation }) {
  
    return (
        <SafeAreaView style={GlobalStyles.container}>
            <View style={styles.container}>
              <View>
                  <Text style={styles.logo_title}>EasyPark</Text>
                  <Text style={styles.eia_title}>EIA</Text>
              </View>
              <Image source={require('../assets/logo eia.png')} style={styles.logo_eia}/>
              <Button title="Iniciar" onPress={() => navigation.navigate('Login')} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
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