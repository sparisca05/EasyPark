import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

import GlobalStyles from '../config/GlobalStyles';

const HomeButton = ({ text, onPress, icon }) => {
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
    width: 130,
    height: 130,
    margin: 10,
  },
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: GlobalStyles.dark,
    marginBottom: 10,
    fontWeight : 'bold',
    textAlign: 'center',
  },
  icon: {
    height: 50,
    resizeMode: 'contain',
  },
});

export default HomeButton;
