import React, { useContext, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Alert, Text, Image } from 'react-native';

import GlobalStyles from '../config/GlobalStyles';
import LoginForm from '../components/LoginForm';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

function Login({ navigation }) {
    return (
        <SafeAreaView style={GlobalStyles.container}>
            <KeyboardAvoidingWrapper>
                <View style={{flex: 1}}>
                    <View style={styles.container}>
                        <Image source={require('../assets/Login.png')} style={styles.logo_eia}/>
                    </View>
                    <LoginForm navigation={navigation} />
                </View>
            </KeyboardAvoidingWrapper>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo_eia: {
        margin: 50,
        width: 800,
        height: 400,
        resizeMode: 'contain',
        transform: [{ scale: 0.7 }],
      },
});

export default Login;