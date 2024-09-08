import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Button from './components/Button';
import { 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
} from 'react-native';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.logo_title}>EasyPark</Text>
        <Text style={styles.eia_title}>EIA</Text>
      </View>
      <Image source={require('./assets/logo eia.png')} style={styles.logo_eia}/>
      <Button title="Iniciar" onPress={() => alert('Iniciar')} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
