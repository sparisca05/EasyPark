import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import colors from '../config/GlobalStyles';

const Button = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
  button: {
    backgroundColor: colors.primary, // Color del botón
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'black', // Color del texto del botón
    fontSize: 24,
    fontWeight: '500',
  },
});

export default Button;