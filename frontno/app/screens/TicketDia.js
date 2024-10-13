import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GlobalStyles from '../config/GlobalStyles';
import GetUser from '../config/GetUser';
import { Recharge } from '../config/Recharge';
import CustomButton from '../components/CustomButton';

function TicketDia({navigation}) {
    const usuario = GetUser();

    const handlePagar = () => {
        Alert.alert('Estás seguro de pagar el ticket día?', 'Se descontará el valor del ticket del día de tu saldo actual.', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Pagar', onPress: () => Recharge(-7600, 'Ticket día pagado correctamente', navigation) }
        ]);
        
    };
    
    return (
        <SafeAreaView style={GlobalStyles.container}>
            <View style={styles.container}>
                <View style={styles.balanceTitle}>
                    <Text style={styles.greeting}>Saldo Actual: </Text>
                    <View style={styles.balance}><Text style={styles.balanceText}>{usuario.saldo?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} COP</Text></View>
                </View>
                <View style={styles.descriptionFrame}>
                    <Text style={styles.description}>Paga el ticket día para poder ingresar
                         y salir ilimitadamente con tu vehículo durante el día.
                    </Text>
                </View>
                <View>
                    <Text style={styles.precioTitle}>Precio Ticket día</Text>
                    <Text style={styles.precio}>$ 7.600 COP</Text>
                </View>
                <View style={{paddingHorizontal: 20}}>
                    <Text style={{textAlign: 'center'}}>Al seleccionar el botón de pagar se descontará el valor del ticket
                        del día automáticamente del saldo actual.
                    </Text>
                </View>
                <CustomButton title="Pagar" onPress={handlePagar}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    balanceTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    balance: {
        backgroundColor: GlobalStyles.dark,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    balanceText: {
        fontSize: 22,
        color: 'white',
    },
    greeting: {
        fontSize: 22,
        fontWeight: 'bold',
        color: GlobalStyles.dark,
    },
    descriptionFrame: {
        width: '100%',
        padding: 25,
        backgroundColor: GlobalStyles.primary,
    },
    description: {
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'italic',
        color: GlobalStyles.dark,
    },
    precioTitle: {
        fontSize: 32,
        color: GlobalStyles.dark,
    },
    precio: {
        fontSize: 32,
        color: GlobalStyles.dark,
        fontWeight: 'bold',
        paddingVertical: 10,
        textAlign: 'center',
    }
});

export default TicketDia;