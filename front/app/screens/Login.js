import React, { useContext, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Alert, Text } from 'react-native';

import GlobalStyles from '../config/GlobalStyles';
import LoginForm from '../components/LoginForm';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

function Login({ navigation }) {
    return (
        <SafeAreaView style={[GlobalStyles.container, {justifyContent: 'space-between'}]}>
            <KeyboardAvoidingWrapper>
                <View style={{flex: 1}}>
                    <View style={styles.container}>
                        <Text style={styles.logo_title}>EasyPark</Text>
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
});

export default Login;