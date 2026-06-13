import React from 'react';
import {View, StyleSheet} from 'react-native';

const StockAnalysisBackground = () => {
  return (
    <>
      {/* Top Right Cube */}
      <View style={styles.cubeOne} />

      {/* Bottom Left Cube */}
      <View style={styles.cubeTwo} />

      {/* Floating Glass Card */}
      <View style={styles.glassOne} />

      {/* Floating Glass Card */}
      <View style={styles.glassTwo} />

      {/* Accent Cube */}
      <View style={styles.accentCube} />
    </>
  );
};

export default StockAnalysisBackground;

const styles = StyleSheet.create({
  cubeOne: {
    position: 'absolute',

    top: -40,
    right: -40,

    width: 220,
    height: 220,

    borderRadius: 45,

    backgroundColor: '#BFDBFE',

    transform: [
      {rotate: '28deg'},
    ],

    opacity: 0.55,
  },

  cubeTwo: {
    position: 'absolute',

    bottom: -70,
    left: -60,

    width: 190,
    height: 190,

    borderRadius: 40,

    backgroundColor: '#C7D2FE',

    transform: [
      {rotate: '-22deg'},
    ],

    opacity: 0.55,
  },

  glassOne: {
    position: 'absolute',

    top: 130,
    right: -25,

    width: 120,
    height: 120,

    borderRadius: 30,

    backgroundColor:
      'rgba(255,255,255,0.55)',

    borderWidth: 1,

    borderColor:
      'rgba(255,255,255,0.8)',

    transform: [
      {rotate: '18deg'},
    ],
  },

  glassTwo: {
    position: 'absolute',

    bottom: 220,
    left: -20,

    width: 150,
    height: 150,

    borderRadius: 34,

    backgroundColor:
      'rgba(255,255,255,0.45)',

    borderWidth: 1,

    borderColor:
      'rgba(255,255,255,0.75)',

    transform: [
      {rotate: '-16deg'},
    ],
  },

  accentCube: {
    position: 'absolute',

    top: 320,
    left: -25,

    width: 90,
    height: 90,

    borderRadius: 24,

    backgroundColor:
      'rgba(37,99,235,0.10)',

    transform: [
      {rotate: '35deg'},
    ],
  },
});