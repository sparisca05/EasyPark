import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text } from 'react-native';

import GlobalStyles from '../config/GlobalStyles';
import Button from './Button';

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
            <Button title="Ingresar" onPress={() => navigation.navigate('Login')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    form_container: {
        width: '100%',
        padding: 20,
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
        paddingHorizontal: 10,
        borderRadius: 25,
    },
});

export default LoginForm;