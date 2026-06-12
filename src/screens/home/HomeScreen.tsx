import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import TopBar from '../../shared/TopBar';
import SideBar from '../../shared/SideBar';

import {useAuth} from '../../context/AuthContext';

import {getSalePurchase} from '../../services/authService';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const {
    selectedOrg,
    token,
  } = useAuth();

  const {logout} = useAuth();

  const [sidebarVisible, setSidebarVisible] =
    useState(false);

  const [dashboard, setDashboard] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const handleMenuToggle = () => {
    setSidebarVisible(prev => !prev);
  };

const handleLogout = async () => {
  try {
    await logout();

    navigation.reset({
      index: 0,
      routes: [{name: 'Splash'}],
    });
  } catch (error) {
    console.log(
      'Logout Error =>',
      error,
    );
  }
};

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      console.log(
        'CALLING SALE PURCHASE =>',
        selectedOrg,
      );

      const res =
        await getSalePurchase(
          Number(selectedOrg),
        );

      console.log(
        'SALE PURCHASE RESPONSE =>',
        res,
      );

      if (res?.success) {
        setDashboard(res.data);
      } else {
        setDashboard(null);
      }
    } catch (error) {
      console.log(
        'SALE PURCHASE ERROR =>',
        error,
      );

      setDashboard(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(
      'HOME RENDER =>',
      selectedOrg,
      token,
    );
  }, [selectedOrg, token]);

  useEffect(() => {
    if (!selectedOrg || !token) {
      return;
    }

    console.log(
      'DASHBOARD RELOAD =>',
      selectedOrg,
    );

    loadDashboardData();
  }, [selectedOrg, token]);

  const sale =
    dashboard?.SaleAmount || 0;

  const purchase =
    dashboard?.PurAmount || 0;

  const retail =
    dashboard?.RetailAmount || 0;

  const profit =
    sale - purchase;


      return (
    <SafeAreaView style={styles.container}>
      <SideBar
        visible={sidebarVisible}
        onClose={() =>
          setSidebarVisible(false)
        }
        onLogout={handleLogout}
      />

      <TopBar
        onMenuPress={handleMenuToggle}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>
            Dashboard
          </Text>

          <Text style={styles.heroSubtitle}>
            Financial Analytics &
            Reporting
          </Text>

          <View style={styles.csaBadge}>
            <Text style={styles.csaText}>
              CSA : {selectedOrg || 'N/A'}
            </Text>
          </View>
        </View>

        {loading ? (
          <View
            style={{
              marginTop: 40,
              alignItems: 'center',
            }}>
            <ActivityIndicator
              size="large"
              color="#2563EB"
            />
          </View>
        ) : (
          <View style={styles.grid}>
            <View
              style={[
                styles.kpiCard,
                styles.blueCard,
              ]}>
              <Text style={styles.kpiLabel}>
                Sale Amount
              </Text>

              <Text style={styles.kpiValue}>
                ₹{' '}
                {sale.toLocaleString(
                  'en-IN',
                )}
              </Text>
            </View>

            <View
              style={[
                styles.kpiCard,
                styles.greenCard,
              ]}>
              <Text style={styles.kpiLabel}>
                Purchase
              </Text>

              <Text style={styles.kpiValue}>
                ₹{' '}
                {purchase.toLocaleString(
                  'en-IN',
                )}
              </Text>
            </View>

            <View
              style={[
                styles.kpiCard,
                styles.orangeCard,
              ]}>
              <Text style={styles.kpiLabel}>
                Retail
              </Text>

              <Text style={styles.kpiValue}>
                ₹{' '}
                {retail.toLocaleString(
                  'en-IN',
                )}
              </Text>
            </View>

            <View
              style={[
                styles.kpiCard,
                styles.purpleCard,
              ]}>
              <Text style={styles.kpiLabel}>
                Profit
              </Text>

              <Text style={styles.kpiValue}>
                ₹{' '}
                {profit.toLocaleString(
                  'en-IN',
                )}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  heroCard: {
    marginTop: 12,

    padding: 22,

    borderRadius: 28,

    backgroundColor: '#0F172A',

    overflow: 'hidden',
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },

  heroSubtitle: {
    color: '#CBD5E1',
    marginTop: 4,
    fontSize: 14,
  },

  csaBadge: {
    alignSelf: 'flex-start',

    marginTop: 16,

    backgroundColor:
      'rgba(255,255,255,0.12)',

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 14,
  },

  csaText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    marginTop: 16,
  },

  kpiCard: {
    width: '48%',

    height: 120,

    borderRadius: 24,

    padding: 16,

    marginBottom: 14,
  },

  blueCard: {
    backgroundColor: '#DBEAFE',
  },

  greenCard: {
    backgroundColor: '#DCFCE7',
  },

  orangeCard: {
    backgroundColor: '#FFEDD5',
  },

  purpleCard: {
    backgroundColor: '#F3E8FF',
  },

  kpiLabel: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },

  kpiValue: {
    marginTop: 12,

    fontSize: 24,
    fontWeight: '800',

    color: '#0F172A',
  },
});