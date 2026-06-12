import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getCsaProfile,
  refreshToken,
} from '../services/authService';

type AuthContextType = {
  token: string;
  isAuthenticated: boolean;

  selectedOrg: string;
  setSelectedOrg: React.Dispatch<
    React.SetStateAction<string>
  >;

  profile: any;
  setProfile: React.Dispatch<
    React.SetStateAction<any>
  >;

  loading: boolean;

  login: (newToken: string) => Promise<void>;

  logout: () => Promise<void>;

  changeCSA: (
    csaId: string | number,
  ) => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType | null>(
    null,
  );

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] =
    useState('');

  const [
    selectedOrg,
    setSelectedOrg,
  ] = useState('');

  const [profile, setProfile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const isAuthenticated = !!token;

  // INITIAL LOAD
  useEffect(() => {
    const loadStorage = async () => {
      try {
        const savedToken =
          await AsyncStorage.getItem(
            'token',
          );

        const savedOrg =
          await AsyncStorage.getItem(
            'selected_org',
          );

        if (savedToken) {
          setToken(savedToken);
        }

        if (savedOrg) {
          setSelectedOrg(savedOrg);
        }
      } catch (error) {
        console.log(
          'Storage Load Error',
          error,
        );
      }
    };

    loadStorage();
  }, []);

  // PROFILE LOAD
  /*useEffect(() => {
    const loadProfile =
      async () => {
        if (
          !selectedOrg ||
          !token
        ) {
          return;
        }

        try {
          const res =
            await getCsaProfile(
              Number(selectedOrg),
            );

          if (
            res?.status === 'ok'
          ) {
            setProfile(
              res.data?.[0] || null,
            );
          } else {
            setProfile(null);
          }
        } catch (error) {
          console.log(
            'Profile Load Error',
            error,
          );

          setProfile(null);
        }
      };

    loadProfile();
  }, [selectedOrg, token]);*/

  // LOGIN
  const login = async (
    newToken: string,
  ) => {
    if (!newToken) {
      return;
    }

    await AsyncStorage.setItem(
      'token',
      String(newToken),
    );

    setToken(
      String(newToken),
    );
  };

  // CHANGE CSA
  const changeCSA = async (
    csaId: string | number,
  ) => {
    const nextCSA =
      String(csaId);

    if (!nextCSA) {
      return;
    }

    try {
      setLoading(true);

      setSelectedOrg(
        nextCSA,
      );

      await AsyncStorage.setItem(
        'selected_org',
        nextCSA,
      );

      let res = null;

      try {
        res =
          await refreshToken(
            Number(nextCSA),
          );
      } catch (e) {
        console.log(
          'Refresh Token Error',
          e,
        );
      }

      if (res?.token) {
        await AsyncStorage.setItem(
          'token',
          String(res.token),
        );

        setToken(
          String(res.token),
        );
      }

      try {
        const profileRes =
          await getCsaProfile(
            Number(nextCSA),
          );

        if (
          profileRes?.status ===
          'ok'
        ) {
          setProfile(
            profileRes.data?.[0] ||
              null,
          );
        } else {
          setProfile(null);
        }
      } catch (e) {
        console.log(
          'Profile Error',
          e,
        );

        setProfile(null);
      }
    } catch (error) {
      console.log(
        'CSA Switch Error',
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
const logout = async () => {
  await Promise.all([
    AsyncStorage.removeItem('token'),
    AsyncStorage.removeItem('selected_org'),
  ]);

  setToken('');
  setSelectedOrg('');
  setProfile(null);
};

  const value = useMemo(
    () => ({
      token,

      isAuthenticated,

      selectedOrg,
      setSelectedOrg,

      profile,
      setProfile,

      loading,

      login,
      logout,

      changeCSA,
    }),
    [
      token,
      isAuthenticated,
      selectedOrg,
      profile,
      loading,
    ],
  );

  return (
    <AuthContext.Provider
      value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider',
    );
  }

  return context;
};