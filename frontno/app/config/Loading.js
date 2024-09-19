import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import GlobalStyles from './GlobalStyles';

const LoadingComponent = () => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color={GlobalStyles.primary} />
            <Text style={styles.text}>Cargando...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        paddingVertical: 5,
        textAlign: 'center',
    },
});

export default LoadingComponent;
