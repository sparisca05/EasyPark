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
                    <View style={styles.container}>
                        <Text style={styles.logo_title}>EasyPark</Text>
                    </View>
                    <RegisterForm navigation={navigation} />
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

export default Register;