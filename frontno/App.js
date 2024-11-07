import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Welcome from './app/screens/Welcome';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Home from './app/screens/Home';
import RegistraVehiculo from './app/screens/RegistraVehiculo';
import ConsultarSaldo from './app/screens/ConsultarSaldo';
import { ApiUrlProvider } from './app/config/ApiUrlContext';
import TicketDia from './app/screens/TicketDia';
import Recarga from './app/screens/Recarga';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApiUrlProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false, gestureEnabled: false }}/>
            <Stack.Screen name="Registrar Vehiculo" component={RegistraVehiculo} />
            <Stack.Screen name="Consultar Saldo" component={ConsultarSaldo} />
            <Stack.Screen name="Ticket dia" component={TicketDia} />
            <Stack.Screen name="Recarga" component={Recarga} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApiUrlProvider>
  );
}

