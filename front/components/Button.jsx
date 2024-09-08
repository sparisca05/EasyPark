import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#63AEB1', // Aquí defines el color de fondo
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25, // Bordes redondeados para darle un estilo más de iOS
    alignItems: 'center',
    width: '80%', // Ancho del botón
  },
  buttonText: {
    color: 'black', // Color del texto del botón
    fontSize: 24,
  },
});

export default Button;