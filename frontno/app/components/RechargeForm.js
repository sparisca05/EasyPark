import React, { useState } from 'react';
import GlobalStyles from '../config/GlobalStyles';
import CustomButton from './CustomButton';
import { Recharge } from '../config/ApiUrlContext';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const RechargeForm = ({ navigation }) => {
    // Estados para almacenar los datos del formulario
    const [monto, setMonto] = useState('');
    const [banco, setBanco] = useState('');

    const bancos = [
        { label: 'Bancolombia', value: 'Bancolombia' },
        { label: 'Banco Davivienda', value: 'Davivienda' },
        { label: 'Nequi', value: 'Nequi' },
        { label: 'Banco Falabella', value: 'Falabella' },
        { label: 'Banco de Bogotá', value: 'Bogota' }
    ];

    const handleRecharge = async () => {
        if (!monto || !banco) {
            Alert.alert('Error', 'Por favor, ingresa el monto y selecciona un banco.');
            return;
        }

        await Recharge(monto, 'Recarga realizada con éxito', navigation);
    };

    return (
        <>
            <View style={styles.container}>
                {/* Texto centrado */}

                <View style={styles.form_container}>
                    <Text style={styles.title}>Importe el monto a recargar</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa el monto"
                        value={monto}
                        onChangeText={setMonto}
                        keyboardType="numeric"
                        textAlign='center'
                    />
                    {/* Espacio entre monto y bancos */}
                    <View style={styles.spacer} />

                    {/* Texto de selección de banco alineado a la izquierda */}

                    <Text style={styles.subtitle}>Selecciona un banco</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setBanco(value)}
                        items={bancos}
                        style={pickerSelectStyles}
                    />
                    
                </View>
                <View style={styles.termsContainer}>
                    <Image
                        source={require('../assets/shield.png')} // Asegúrate de que la imagen esté en esta ruta
                        style={styles.icon}
                    />
                    <Text style={styles.termsText}>
                        Transacción segura bajo nuestros Términos y Condiciones
                    </Text>
                </View>
            </View>
            <CustomButton title="Pagar" onPress={handleRecharge} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-between', // Distribuye el espacio
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    form_container: {
        width: '100%',
        alignItems: 'center', // Centra todo dentro del form
    },
    title: {
        fontSize: 20,
        fontWeight: '10',
        marginBottom: 15,
        textAlign: 'center', // Texto centrado
    },
    input: {
        height: 50,
        width: '100%',
        backgroundColor: GlobalStyles.light,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginBottom: 20,
    },
    spacer: {
        height: 50, // Añade un espacio entre el monto y el selector de bancos
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '500',
        width: '100%',
        textAlign: 'left', // Alinea el texto a la izquierda
        marginBottom: 10,
    },
    termsContainer: {
        position: 'absolute',
        bottom: 20, // Ajusta el margen inferior si es necesario
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Centra el ícono y el texto horizontalmente
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8, // Espacio entre el ícono y el texto
    },
    termsText: {
        fontSize: 12, // Texto más pequeño para los términos
        color: '#777',
        
    },
    QR: {
        width: 250,
        height: 250,
        margin: 10, // Espacio entre el ícono y el texto
    },
});


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 40,
        width: '100%',
        backgroundColor: GlobalStyles.light,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 25,
    },
    inputAndroid: {
        height: 40,
        width: '100%',
        backgroundColor: GlobalStyles.light,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 25,
    },
});

export default RechargeForm;
