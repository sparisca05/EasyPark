import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';

import GlobalStyles from '../config/GlobalStyles';
import CustomButton from './CustomButton';

const LoginForm = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (credentials) => {
        useEffect(() => {
            fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            })
            .then(response => response.json())
            .then((username, password )=> {
                 // Verifica si los campos están vacíos
                if (username === '' || password === '') {
                    Alert.alert('Error', 'Por favor, completa todos los campos.');
                    return;
                }
                // Aquí puedes agregar la lógica de autenticación o hacer una petición HTTP al backend
                if (username === 'admin' && password === '1234') {
                    Alert.alert('Éxito', 'Inicio de sesión exitoso');
                    
                } else {
                    Alert.alert('Error', 'Usuario o contraseña incorrectos');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }, []);

        axios
        .post(url, credentials)
        .then(() => {
           
        })
        .catch(error => {
            console.log('Hubo un error', error);
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.form_container}>
                <Text style={styles.title}>Introduce tu correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={username}
                    onChangeText={setUsername} // Actualiza el estado
                    autoCapitalize="none"
                />
                <Text style={styles.title}>Introduce tu contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword} // Actualiza el estado
                    secureTextEntry={true} // Oculta el texto de la contraseña
                />
            </View>
            <CustomButton title="Ingresar" onPress={() => {
                handleLogin(),
                navigation.navigate('Login')
                }} 
            />
            <View style={styles.other}>
                <TouchableOpacity>
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
    },
    title: {
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