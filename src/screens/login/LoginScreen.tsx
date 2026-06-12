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

    {/* Background Design */}
    <View style={styles.bgCircle1} />
    <View style={styles.bgCircle2} />

    {/* Header */}
    <View style={styles.headerSection}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>U</Text>
      </View>

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

  marginTop: 40,
  marginBottom: 22,
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
    marginTop: 18,

    fontSize: 30,
    fontWeight: '800',

    color: '#0F172A',
  },

  subTitle: {
    marginTop: 6,

    fontSize: 14,

    color: '#64748B',
  },

card: {
  marginHorizontal: 20,

  backgroundColor: 'rgba(255,255,255,0.96)',

  borderRadius: 30,

  paddingHorizontal: 24,
  paddingVertical: 22,

  elevation: 12,

  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 22,

  shadowOffset: {
    width: 0,
    height: 8,
  },
},

  welcomeText: {
    fontSize: 28,
    fontWeight: '800',

    color: '#0F172A',

    marginBottom: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',

    color: '#334155',

    marginBottom: 8,
    marginTop: 16,
  },

  input: {
    height: 58,

    backgroundColor: '#F8FAFC',

    borderWidth: 1,
    borderColor: '#E2E8F0',

    borderRadius: 18,

    paddingHorizontal: 18,

    fontSize: 15,

    color: '#111827',
  },

  loginButton: {
    height: 60,

    borderRadius: 18,

    backgroundColor: '#1E1B4B',

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 28,

    elevation: 8,

    shadowColor: '#1E1B4B',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  loginButtonText: {
    color: '#FFFFFF',

    fontSize: 15,

    fontWeight: '800',

    letterSpacing: 2,
  },

footer: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingBottom: 22,
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
  fontSize: 14,
  marginBottom: 18,
},
});
