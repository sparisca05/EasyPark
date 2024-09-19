import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';  // Importa el nuevo picker
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyles from '../config/GlobalStyles';
import CustomButton from './CustomButton';
import { useApiUrl } from '../config/ApiUrlContext';

const RegisterVehiculoForm = () => {
    // Estado para almacenar los datos introducidos por el usuario
    const [documento, setDocumento] = useState('');
    const [programa, setPrograma] = useState('');
    const [vehiculo, setVehiculo] = useState('');
    const [placa, setPlaca] = useState('');

    const apiUrl = useApiUrl(); // Obtiene el valor de API_URL
    const url = `${apiUrl}/api/v1/registra-vehiculo`;

    // Función para manejar el registro del vehículo
    const handleRegisterVehicle = async () => {
        // Aquí haces la solicitud al backend para guardar los datos
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post(url , {
                documento,
                programa,
                vehiculo,
                placa,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}` , 
                    'Content-Type': 'application/json'
                }
            });

            if (token) {
                Alert.alert('Éxito', 'El vehículo se ha registrado.')
            } else {
                Alert.alert('Error', 'No se pudo registrar el vehículo');
            }
        } catch (error) {
            console.error('Error al registrar el vehículo:', error);
            Alert.alert('Error', 'Hubo un problema al registrar el vehículo');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.form_container}>
                <Text style={styles.subtitle}>Documento</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ingresa tu numero de documento"
                    value={documento}
                    onChangeText={setDocumento}
                    autoCapitalize="none"
                />
                <Text style={styles.subtitle}>Programa:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setPrograma(value)}
                    items={[
                        { label: 'Economía', value: 'Economia' },
                        { label: 'Empleado', value: 'Empleado' },
                        { label: 'Física', value: 'Fisica' },
                        { label: 'Ingeniería Administrativa', value: 'Ingenieria Administrativa' },
                        { label: 'Ingeniería Ambiental', value: 'Ingenieria Ambiental' },
                        { label: 'Ingeniería Biomédica', value: 'Ingenieria Biomedica' },
                        { label: 'Ingeniería Biotecnológica', value: 'Ingenieria Biotecnologica' },
                        { label: 'Ingeniería Civil', value: 'Ingenieria Civil' },
                        { label: 'Ingeniería Financiera', value: 'Ingenieria Financiera' },
                        { label: 'Ingeniería Geológica', value: 'Ingenieria Geologica' },
                        { label: 'Ingeniería Industrial', value: 'Ingenieria Industrial' },
                        { label: 'Ingeniería Mecánica', value: 'Ingenieria Mecanica' },
                        { label: 'Ingeniería Mecatrónica', value: 'Ingenieria Mecatronica' },
                        { label: 'Ingeniería de Sistemas y Computación', value: 'Ingenieria de Sistemas y Computacion' },
                        { label: 'Postgrados', value: 'Postgrados' },
                        { label: 'Medicina', value: 'Medicina' },
                    ]}
                    placeholder={{
                        label: 'Selecciona tu programa...',
                    }}
                    style={pickerSelectStyles}
                />
                <Text style={styles.subtitle}>Vehículo</Text>
                <RNPickerSelect
                    onValueChange={(value) => setVehiculo(value)}
                    items={[
                        { label: 'Carro', value: 'carro' },
                        { label: 'Moto', value: 'moto' }
                    ]}
                    placeholder={{
                        label: 'Selecciona tu vehículo...',
                    }}
                    style={pickerSelectStyles}
                />
                <Text style={styles.subtitle}>Ingrese su placa</Text>
                <TextInput
                    style={styles.input}
                    placeholder="XXX###"
                    value={placa}
                    onChangeText={setPlaca}
                />
            </View>
            <CustomButton title="Registrar" onPress={handleRegisterVehicle} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-around',
    },
    form_container: {
        width: '100%',
        padding: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: '500',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: GlobalStyles.light,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 25,
    },
    text: {
        fontSize: 18,
        paddingVertical: 5,
        textAlign: 'center',
    },
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        display:'flex',
        alignItems: 'center',
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


export default RegisterVehiculoForm;
