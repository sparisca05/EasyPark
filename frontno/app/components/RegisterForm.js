import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

import GlobalStyles from '../config/GlobalStyles';
import CustomButton from './CustomButton';

const RegisterForm = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [password, setPassword] = useState('');

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleRegister =async () => {
        // Validaciones
        if (!username || !nombre || !apellido || !password) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        if (!validarEmail(username)) {
            Alert.alert('Error', 'Por favor, introduce un correo electrónico válido.');
            return;
        }
       /*
        if (password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
            return;
        }*/

            const userData = {
                username,
                nombre,
                apellido,
                password
            };
    
            try {
                // Realizar la solicitud POST al backend
                const response = await axios.post('http://172.20.10.5:8080/auth/register', userData);
    
                if (response.data.token) {
                    navigation.navigate('Login');
                } else {
                    Alert.alert('Error', 'Hubo un problema con el registro.');
                }
            } catch (error) {
                console.error('Error al registrar:', error);
                if (error.response) {
                    // Error del servidor
                    Alert.alert('Error', `Servidor: ${error.response.data.message}`);
                } else {
                    // Otro tipo de error
                    Alert.alert('Error', 'No se pudo conectar al servidor.');
                }
            }
        };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Registro</Text>
            </View>
            <View style={styles.form_container}>
                <Text style={styles.subtitle}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    placeholder="correo@eia.edu.co"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <Text style={styles.subtitle}>Nombre</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Juan"
                    value={nombre}
                    onChangeText={setNombre}
                    autoCapitalize="none"
                />
                <Text style={styles.subtitle}>Apellido</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Pérez"
                    value={apellido}
                    onChangeText={setApellido}
                    autoCapitalize="none"
                />
                <Text style={styles.subtitle}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="••••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
            </View>
            <CustomButton title="Registrarse" onPress={handleRegister} />
            <View style={styles.other}>
                <Text style={styles.text}>¿Ya estás registrado?  </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.text, {color: 'cornflowerblue'}]}>Inicia Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
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
    other: {
        flexDirection: 'row',
        justifyContent: 'center',
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

export default RegisterForm;
