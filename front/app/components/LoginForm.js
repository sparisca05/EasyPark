import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, Button, TouchableOpacity } from 'react-native';

import GlobalStyles from '../config/GlobalStyles';
import CustomButton from './CustomButton';
import colors from '../config/GlobalStyles';

const LoginForm = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Verifica si los campos están vacíos
        if (username === '' || password === '') {
          Alert.alert('Error', 'Por favor, completa todos los campos.');
          return;
        }
        // Aquí puedes agregar la lógica de autenticación o hacer una petición HTTP al backend
        if (username === 'admin' && password === '1234') {
            Alert.alert('Éxito', 'Inicio de sesión exitoso');
            // Redirigir a la pantalla de inicio u otra pantalla
            navigation.navigate('Welcome');
        } else {
            Alert.alert('Error', 'Usuario o contraseña incorrectos');
        }
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
            <CustomButton title="Ingresar" onPress={() => navigation.navigate('Login')} />
            <View style={styles.other}>
                <TouchableOpacity>
                    <Text style={styles.text}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.text, {color: 'cornflowerblue'}]}>Regístrate</Text>
                </TouchableOpacity>
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
        paddingVertical: 30,
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