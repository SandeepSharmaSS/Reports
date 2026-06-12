import React, {useEffect, useRef} from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
Animated,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = ({
  navigation,
}: any) => {
  useEffect(() => {
    checkAuth();
  }, []);

  const floatAnim =
  useRef(new Animated.Value(0))
    .current;

useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(floatAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }),

      Animated.timing(floatAnim, {
        toValue: 0,
        duration: 2500,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  checkAuth();
}, []);


  const checkAuth = async () => {
    try {
      const token =
        await AsyncStorage.getItem(
          'token',
        );

      const selectedOrg =
        await AsyncStorage.getItem(
          'selected_org',
        );

      console.log(
        'SPLASH TOKEN =>',
        token,
      );

      console.log(
        'SPLASH CSA =>',
        selectedOrg,
      );

      setTimeout(() => {
        if (token) {
          navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      }, 2200);
    } catch (error) {
      console.log(error);

      navigation.replace('Login');
    }
  };

return (
  <View style={styles.container}>
    <StatusBar
      backgroundColor="#F8FAFC"
      barStyle="dark-content"
    />

    <Animated.View
      style={[
        styles.bgTopGlow,
        {
          transform: [
            {
              translateY:
                floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -25],
                }),
            },
          ],
        },
      ]}
    />

    <Animated.View
      style={[
        styles.bgBottomGlow,
        {
          transform: [
            {
              translateY:
                floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 20],
                }),
            },
          ],
        },
      ]}
    />

    <Animated.View
      style={[
        styles.floatingCard1,
        {
          transform: [
            {
              translateY:
                floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -18],
                }),
            },
            {rotate: '18deg'},
          ],
        },
      ]}
    />

    <Animated.View
      style={[
        styles.floatingCard2,
        {
          transform: [
            {
              translateY:
                floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 15],
                }),
            },
            {rotate: '-15deg'},
          ],
        },
      ]}
    />

    <Animated.View
      style={[
        styles.floatingCard3,
        {
          transform: [
            {
              translateY:
                floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -12],
                }),
            },
            {rotate: '25deg'},
          ],
        },
      ]}
    />

    <Animated.View
      style={[
        styles.logoBox,
        {
          transform: [
            {
              scale:
                floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    1,
                    1.05,
                  ],
                }),
            },
            {
              translateY:
                floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
            },
          ],
        },
      ]}>
<Text style={styles.logoText}>
  U
</Text>

<View
  style={{
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1.5,
    borderColor:
      'rgba(255,255,255,0.25)',
  }}
/>
    </Animated.View>

    <Text style={styles.title}>
      UniOS Reports
    </Text>

    <Text style={styles.subtitle}>
      Smart Reporting & Analytics
      Platform
    </Text>

    <View style={styles.loader}>
      <Animated.View
        style={[
          styles.loaderBar,
          {
            transform: [
              {
                translateX:
                  floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      -20,
                      20,
                    ],
                  }),
              },
            ],
          },
        ]}
      />
    </View>

    <Text style={styles.version}>
      Version 1.0.0
    </Text>
  </View>
);

};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F8FAFC',

    justifyContent: 'center',
    alignItems: 'center',
  },

  bgTopGlow: {
    position: 'absolute',

    top: -140,
    right: -80,

    width: 320,
    height: 320,

    borderRadius: 160,

    backgroundColor: '#3B82F6',

    opacity: 0.12,
  },

  bgBottomGlow: {
    position: 'absolute',

    bottom: -120,
    left: -70,

    width: 260,
    height: 260,

    borderRadius: 130,

    backgroundColor: '#6366F1',

    opacity: 0.12,
  },

  floatingCard1: {
    position: 'absolute',

    top: 120,
    right: 35,

    width: 90,
    height: 90,

    borderRadius: 26,

    backgroundColor:
      'rgba(255,255,255,0.7)',

    borderWidth: 1,

    borderColor:
      'rgba(255,255,255,0.9)',

    transform: [{rotate: '18deg'}],
  },

  floatingCard2: {
    position: 'absolute',

    bottom: 180,
    left: 25,

    width: 70,
    height: 70,

    borderRadius: 22,

    backgroundColor:
      'rgba(255,255,255,0.6)',

    borderWidth: 1,

    borderColor:
      'rgba(255,255,255,0.9)',

    transform: [{rotate: '-15deg'}],
  },

  floatingCard3: {
    position: 'absolute',

    top: 260,
    left: -20,

    width: 140,
    height: 140,

    borderRadius: 34,

    backgroundColor:
      'rgba(59,130,246,0.08)',

    transform: [{rotate: '25deg'}],
  },

  logoBox: {
    width: 125,
    height: 125,

    borderRadius: 36,

    backgroundColor: '#1E40AF',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 4,

    borderColor:
      'rgba(255,255,255,0.4)',

    elevation: 18,

    shadowColor: '#2563EB',
    shadowOpacity: 0.45,
    shadowRadius: 24,

    shadowOffset: {
      width: 0,
      height: 12,
    },
  },

  logoText: {
    color: '#FFFFFF',

    fontSize: 58,
    fontWeight: '800',
  },

  title: {
    marginTop: 28,

    fontSize: 34,
    fontWeight: '800',

    color: '#0F172A',
  },

  subtitle: {
    marginTop: 8,

    color: '#64748B',

    fontSize: 15,
  },

  loader: {
    width: 180,
    height: 7,

    backgroundColor: '#E2E8F0',

    borderRadius: 50,

    marginTop: 42,

    overflow: 'hidden',
  },

  loaderBar: {
    width: '75%',
    height: 7,

    backgroundColor: '#2563EB',

    borderRadius: 50,
  },

  version: {
    position: 'absolute',

    bottom: 40,

    color: '#94A3B8',

    fontSize: 13,
    fontWeight: '500',
  },
});