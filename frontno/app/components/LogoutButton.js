import React from 'react';
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutButton = ({navigation}) => {
    const handleLogout = () => {
        Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas cerrar sesión?', [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Sí',
                onPress: () => {
                    AsyncStorage.removeItem('token');
                    navigation.navigate('Login');
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <SimpleLineIcons name="logout" size={24}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 30,
    },
});
export default LogoutButton;