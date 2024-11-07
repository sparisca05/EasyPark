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

const styles = StyleSheet.create({
    logo: {
      margin: 20,
      width: 20,
      height: 10,
      resizeMode: 'contain',
      transform: [{ scale: 0.7 }],
    }
  });
export default Recarga;
