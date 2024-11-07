import React from 'react';
import { SafeAreaView, View } from 'react-native';

import RechargeForm from '../components/RechargeForm';
import GlobalStyles from '../config/GlobalStyles';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

function Recarga({ navigation }) {
    return (
        <SafeAreaView style={GlobalStyles.container}>
            <KeyboardAvoidingWrapper>
                <View style={{ flex: 1 }}>
                    <RechargeForm navigation={navigation} />
                </View>
            </KeyboardAvoidingWrapper>
        </SafeAreaView>
    );
}

export default Recarga;
