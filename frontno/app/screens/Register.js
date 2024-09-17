import React from 'react';
import { SafeAreaView, View, StyleSheet, Alert, Text } from 'react-native';

import GlobalStyles from '../config/GlobalStyles';
import RegisterForm from '../components/RegisterForm';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

function Register({navigation}) {
    return (
        <SafeAreaView style={GlobalStyles.container}>
            <KeyboardAvoidingWrapper>
                <View style={{flex: 1}}>
                    <RegisterForm navigation={navigation} />
                </View>
            </KeyboardAvoidingWrapper>
        </SafeAreaView>
    );
}

export default Register;