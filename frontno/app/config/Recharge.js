import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useApiUrl } from './ApiUrlContext';

export const Recharge = async (monto, mensajeExito, navigation) => {
    const apiUrl = useApiUrl();

    try {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            await axios.put(`${apiUrl}/api/v1/perfil/recargar`, {
                monto: monto,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            Alert.alert('Éxito', mensajeExito, [
                { text: 'OK', onPress: () => navigation.navigate('Home') }
            ]);
        } else {
            Alert.alert('Error', 'No se encontró el token.');
        }
    } catch (error) {
        console.error('Error al recargar el saldo:', error);
        if (error.response) {
            Alert.alert('Error', `Servidor: ${error.response.data.message}`);
        } else {
            Alert.alert('Error', 'No se pudo conectar al servidor.');
        }
    }

}