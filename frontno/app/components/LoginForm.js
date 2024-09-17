import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, Button, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalStyles from '../config/GlobalStyles';
import CustomButton from './CustomButton';

const LoginForm = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const handleLogin = async () => {

        const credentials = { username, password };
        const url = 'http://172.20.10.10:8080/auth/login';

        if (username === '' || password === '') {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await axios.post(url, credentials);
            const token = response.data.token;

            if (token) {
                AsyncStorage.setItem('token', token);
                navigation.navigate('Home');
            } else {
                Alert.alert('Error', 'Usuario o contraseña malos');
            }
        } catch (error) {
            console.log('Error capturado:', error);
            if (error.response) {
                // Error de respuesta del servidor
                console.log('Error de respuesta:', error.response.data);
                Alert.alert('Error', 'Problema con la autenticación');
            } else if (error.request) {
                // La solicitud fue enviada pero no hubo respuesta
                console.log('Error de solicitud:', error.request);
                Alert.alert('Error', 'No se pudo conectar al servidor');
            } else {
                // Error al configurar la solicitud
                console.log('Error en la configuración:', error.message);
                Alert.alert('Error', 'Error al configurar la solicitud');
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form_container}>
                <Text style={styles.title}>Introduce tu correo electrónico</Text>
                <View style={styles.input}>
                    <TextInput
                        style={{width: '90%'}}
                        placeholder="Correo electrónico"
                        value={username}
                        onChangeText={setUsername} // Actualiza el estado
                        autoCapitalize="none"
                        keyboardType='email-address' // Teclado de correo electrónico
                    />
                    <MaterialIcons name='email' size={24}/>
                </View>
                <Text style={styles.title}>Introduce tu contraseña</Text>
                <View style={styles.input}>
                    <TextInput
                        style={{width: '90%'}}
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword} // Actualiza el estado
                        secureTextEntry={hidePassword} // Oculta el texto de la contraseña con el candado
                    />
                    <FontAwesome onPress={() => setHidePassword(!hidePassword)} name={hidePassword ? 'lock' : 'unlock'} size={24}/>
                </View>
            </View>
            <CustomButton title="Ingresar" onPress={handleLogin}
            />
            <View style={styles.other}>
                <TouchableOpacity onPress={() => Alert.alert('Acuérdese como pueda papi')}>
                    <Text style={[styles.text, {color: 'cornflowerblue',}]}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={styles.text}>¿No tienes cuenta?  </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={[styles.text, {color: 'cornflowerblue',}]}>Regístrate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    form_container: {
        width: '100%',
        padding: 30,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10,
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        width: '100%',
        backgroundColor: GlobalStyles.light,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 25,
    },
    other: {
        width: '100%',
        padding: 30,
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        paddingVertical: 5,
        textAlign: 'center',
    },
});

export default LoginForm;