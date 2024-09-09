import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const HomeButton = ({ text, onPress,icon }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
        <Image source={icon} style={styles.icon}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6BBEBE',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    margin: 10,
  },
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
    fontWeight : 'bold',
  },
  icon: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },
});

export default HomeButton;
