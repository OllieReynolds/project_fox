import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

import foxImage from '../assets/f_normal.png';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Image source={foxImage} style={styles.image} />
      <Button mode="contained" style={styles.button}>
        Feed Fox
      </Button>
      <Button mode="contained" style={styles.button}>
        Play With Fox
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    margin: 10,
  },
});
