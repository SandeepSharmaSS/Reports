import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

const StockAgeingBackground = () => {
  return (
    <>
      <View style={styles.block1} />
      <View style={styles.block2} />
      <View style={styles.block3} />
    </>
  );
};

export default StockAgeingBackground;

const styles = StyleSheet.create({
  block1: {
    position: 'absolute',
    top: -80,
    right: -40,

    width: 240,
    height: 240,

    backgroundColor:
      'rgba(37,99,235,0.08)',

    borderRadius: 40,

    transform: [
      {rotate: '25deg'},
    ],
  },

  block2: {
    position: 'absolute',

    bottom: 150,
    left: -60,

    width: 180,
    height: 180,

    backgroundColor:
      'rgba(99,102,241,0.08)',

    borderRadius: 30,

    transform: [
      {rotate: '-18deg'},
    ],
  },

  block3: {
    position: 'absolute',

    top: 250,
    right: -50,

    width: 140,
    height: 140,

    backgroundColor:
      'rgba(59,130,246,0.06)',

    borderRadius: 24,

    transform: [
      {rotate: '45deg'},
    ],
  },
});