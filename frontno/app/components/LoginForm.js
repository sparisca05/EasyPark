import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalStyles from '../config/GlobalStyles';
import CustomButton from './CustomButton';
import LoadingComponent from '../config/Loading';
import { ApiUrlContext } from '../config/ApiUrlContext';

const LoginForm = ({ navigation }) => {
    const apiUrl = useContext(ApiUrlContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);  // Estado para mostrar una carga

    const handleLogin = async () => {
        const credentials = { username, password };
        const url = `${apiUrl}/auth/login`;
        
        if (username === '' || password === '') {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(url, credentials);
            const token = response.data.token;

            if (token) {
                AsyncStorage.setItem('token', token);
                setLoading(false);
                navigation.navigate('Home');
            }
        } catch (error) {
            console.log('Error capturado:', error);
            if (error.response) {
                // Error de respuesta del servidor
                Alert.alert('Error', 'Usuario o contraseña erróneos, por favor intente de nuevo.');
                setLoading(false);
            } else if (error.request) {
                // La solicitud fue enviada pero no hubo respuesta
                Alert.alert('Error', 'No se pudo conectar al servidor, inténtelo mas tarde');
                setLoading(false);
            } else {
                // Error al configurar la solicitud
                Alert.alert('Error', 'Error al configurar la solicitud');
                setLoading(false);
            }
        }
    };

    if (loading) {
        return (
            <LoadingComponent/>
        );
    }

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
                        keyboardType='email-address'
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
                <TouchableOpacity onPress={() => Alert.alert('bobo hpta','Acuérdese como pueda papi')}>
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