import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {useAuth} from '../../context/AuthContext';
import {dellogin} from '../../services/authService';

const LoginScreen = ({navigation}: any) => {
  const {login} = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await dellogin({
        mobile: username.trim(),
        password,
      });

      console.log(
        'LOGIN RESPONSE =>',
        response,
      );

      if (
        response?.status === 'ok' &&
        response?.token
      ) {
        await login(response.token);

        navigation.replace('Home');
      } else {
        console.log(
          'Login Failed =>',
          response,
        );
      }
    } catch (error) {
      console.log(
        'Login Error =>',
        error,
      );
    } finally {
      setLoading(false);
    }
  };

return (
  <SafeAreaView style={styles.container}>
    <StatusBar
      backgroundColor="#EEF4FF"
      barStyle="dark-content"
    />

    <View style={styles.bgCircle1} />
    <View style={styles.bgCircle2} />

    <View style={styles.centerContent}>
      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.appName}>
          UniOS Reports
        </Text>

        <Text style={styles.subTitle}>
          Smart Reporting & Analytics Platform
        </Text>
      </View>

      {/* Login Card */}
      <View style={styles.card}>
        <Text style={styles.welcomeText}>
          Sign In
        </Text>

        <Text style={styles.description}>
          Continue to your dashboard
        </Text>

        <Text style={styles.label}>
          Username
        </Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          placeholderTextColor="#94A3B8"
          autoCapitalize="none"
          style={styles.input}
        />

        <Text style={styles.label}>
          Password
        </Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}>
          <Text style={styles.loginButtonText}>
            {loading
              ? 'PLEASE WAIT...'
              : 'LOGIN'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.footer}>
      <Text style={styles.versionText}>
        Version 1.0.0
      </Text>
    </View>
  </SafeAreaView>
);
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF4FF',
  },

headerSection: {
  alignItems: 'center',
  marginTop: 18,
  marginBottom: 16,
},

centerContent: {
  flex: 1,
  justifyContent: 'center',
  paddingBottom: 40,
},

  logoContainer: {
    width: 92,
    height: 92,
    borderRadius: 28,

    backgroundColor: '#2563EB',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 12,

    shadowColor: '#2563EB',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '800',
  },

appName: {
  marginTop: 8,
  fontSize: 32,
  fontWeight: '900',
  color: '#0F172A',
  letterSpacing: 0.5,
},

subTitle: {
  marginTop: 4,
  fontSize: 13,
  color: '#64748B',
},

card: {
  marginHorizontal: 22,

  backgroundColor: '#FFFFFF',

  borderRadius: 28,

  paddingHorizontal: 22,
  paddingVertical: 18,

  borderWidth: 1,
  borderColor: '#E8EEF9',

  elevation: 10,

  shadowColor: '#1E293B',
  shadowOpacity: 0.08,
  shadowRadius: 20,

  shadowOffset: {
    width: 0,
    height: 10,
  },
},

  welcomeText: {
    fontSize: 28,
    fontWeight: '800',

    color: '#0F172A',

    marginBottom: 6,
  },

label: {
  fontSize: 13,
  fontWeight: '700',
  color: '#334155',
  marginBottom: 6,
  marginTop: 12,
},

input: {
  height: 50,

  backgroundColor: '#F8FAFC',

  borderWidth: 1,
  borderColor: '#E2E8F0',

  borderRadius: 14,

  paddingHorizontal: 16,

  fontSize: 15,

  color: '#111827',
},

loginButton: {
  height: 52,

  borderRadius: 14,

  backgroundColor: '#2563EB',

  justifyContent: 'center',
  alignItems: 'center',

  marginTop: 18,

  elevation: 6,

  shadowColor: '#2563EB',
  shadowOpacity: 0.25,
  shadowRadius: 10,

  shadowOffset: {
    width: 0,
    height: 5,
  },
},

  loginButtonText: {
    color: '#FFFFFF',

    fontSize: 15,

    fontWeight: '800',

    letterSpacing: 2,
  },

footer: {
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingBottom: 14,
},

  versionText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },

  bgCircle1: {
  position: 'absolute',

  width: 260,
  height: 260,

  borderRadius: 130,

  backgroundColor: '#DBEAFE',

  top: -120,
  right: -90,
},

bgCircle2: {
  position: 'absolute',

  width: 180,
  height: 180,

  borderRadius: 90,

  backgroundColor: '#C7D2FE',

  bottom: 120,
  left: -60,
},

description: {
  color: '#64748B',
  fontSize: 13,
  marginBottom: 14,
},
});
