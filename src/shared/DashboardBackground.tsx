import React, {useEffect, useRef} from 'react';

import {
  View,
  StyleSheet,
  Animated,
} from 'react-native';

const DashboardBackground = () => {
  const floatAnim = useRef(
    new Animated.Value(0),
  ).current;

  const pulseAnim = useRef(
    new Animated.Value(0),
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),

        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),

        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <>
      {/* Main Blue Glow */}
      <Animated.View
        style={[
          styles.circle1,
          {
            transform: [
              {
                translateY:
                  floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -25],
                  }),
              },
              {
                scale:
                  pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.15],
                  }),
              },
            ],
          },
        ]}
      />

      {/* Green Glow */}
      <Animated.View
        style={[
          styles.circle2,
          {
            transform: [
              {
                translateY:
                  floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 20],
                  }),
              },
              {
                scale:
                  pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.12],
                  }),
              },
            ],
          },
        ]}
      />

      {/* Purple Orb */}
      <Animated.View
        style={[
          styles.circle3,
          {
            transform: [
              {
                translateY:
                  floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -15],
                  }),
              },
            ],
          },
        ]}
      />

      {/* Orange Orb */}
      <Animated.View
        style={[
          styles.circle4,
          {
            transform: [
              {
                translateY:
                  floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 12],
                  }),
              },
            ],
          },
        ]}
      />

      {/* Tiny Floating Dot */}
      <Animated.View
        style={[
          styles.circle5,
          {
            transform: [
              {
                translateY:
                  floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -18],
                  }),
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default DashboardBackground;

const styles = StyleSheet.create({
  circle1: {
    position: 'absolute',

    width: 320,
    height: 320,

    borderRadius: 160,

    backgroundColor:
      'rgba(37,99,235,0.06)',

    top: -150,
    left: -120,
  },

  circle2: {
    position: 'absolute',

    width: 240,
    height: 240,

    borderRadius: 120,

    backgroundColor:
      'rgba(16,185,129,0.05)',

    bottom: 80,
    left: -100,
  },

  circle3: {
    position: 'absolute',

    width: 140,
    height: 140,

    borderRadius: 70,

    backgroundColor:
      'rgba(124,58,237,0.05)',

    top: 280,
    right: -40,
  },

  circle4: {
    position: 'absolute',

    width: 100,
    height: 100,

    borderRadius: 50,

    backgroundColor:
      'rgba(249,115,22,0.05)',

    bottom: 220,
    right: 20,
  },

  circle5: {
    position: 'absolute',

    width: 50,
    height: 50,

    borderRadius: 25,

    backgroundColor:
      'rgba(59,130,246,0.08)',

    top: 180,
    right: 60,
  },
});