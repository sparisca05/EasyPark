import React from 'react';

import GlobalStyles from '../config/GlobalStyles';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

function ConsultarSaldo({navigation}) {
    return (
        <SafeAreaView style={GlobalStyles.container}>
            <View style={styles.container}>
                <Text style={styles.greeting}>Consultar Saldo</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      padding: 20,
      backgroundColor: '#FFFFFF',
    },
    greeting: {
      fontSize: 24,
      color: GlobalStyles.dark,
      marginBottom: 5,
    },
});

export default ConsultarSaldo;