import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, Button, TouchableOpacity } from 'react-native';

import GlobalStyles from '../config/GlobalStyles';
import CustomButton from './CustomButton';

const RegisterForm = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.form_container}>
                <Text style={styles.title}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    placeholder="correo@eia.edu.co"
                    value={username}
                    onChangeText={setUsername} // Actualiza el estado
                    autoCapitalize="none"
                /><Text style={styles.title}>Nombre</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Juan"
                    value={nombre}
                    onChangeText={setNombre} // Actualiza el estado
                    autoCapitalize="none"
                /><Text style={styles.title}>Apellido</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Pérez"
                    value={apellido}
                    onChangeText={setApellido} // Actualiza el estado
                    autoCapitalize="none"
                />
                <Text style={styles.title}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="••••••••••"
                    value={password}
                    onChangeText={setPassword} // Actualiza el estado
                    secureTextEntry={true} // Oculta el texto de la contraseña
                />
            </View>
            <CustomButton title="Registrarse" onPress={() => navigation.navigate('Login')} />
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