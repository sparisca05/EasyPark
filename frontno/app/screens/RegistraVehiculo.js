import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import RegisterVehiculoForm from '../components/RegisterVehiculoForm';
import GlobalStyles from '../config/GlobalStyles';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

function RegistraVehiculo({navigation}) {
    return (
        <SafeAreaView style={GlobalStyles.container}>
            <KeyboardAvoidingWrapper>
                <View style={{flex: 1}}>
                    <RegisterVehiculoForm navigation={navigation}/>
                </View>
            </KeyboardAvoidingWrapper>
        </SafeAreaView>
    );
}

export default RegistraVehiculo;