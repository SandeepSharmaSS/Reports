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

import DashboardBackground from '../../shared/DashboardBackground';

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
      <DashboardBackground />
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

  <View style={styles.header}>
    <Text style={styles.greeting}>
      Financial Overview
    </Text>

    <Text style={styles.company}>
      CSA : {selectedOrg || 'N/A'}
    </Text>
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

      {/* SALES */}
      <View
        style={[
          styles.statCard,
          styles.salesCard,
        ]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            Sale
          </Text>

          <Text style={styles.cardIcon}>
            ↗
          </Text>
        </View>

        <Text
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          numberOfLines={2}
          style={styles.cardValue}>
          ₹ {sale.toLocaleString('en-IN')}
        </Text>
      </View>

      {/* PURCHASE */}
      <View
        style={[
          styles.statCard,
          styles.purchaseCard,
        ]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            Purchase
          </Text>

          <Text style={styles.cardIcon}>
            ⊡
          </Text>
        </View>

        <Text
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          numberOfLines={2}
          style={styles.cardValue}>
          ₹ {purchase.toLocaleString(
            'en-IN',
          )}
        </Text>
      </View>

      {/* RETAIL */}
      <View
        style={[
          styles.statCard,
          styles.retailCard,
        ]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            Retail
          </Text>

          <Text style={styles.cardIcon}>
            ₹
          </Text>
        </View>

        <Text
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          numberOfLines={2}
          style={styles.cardValue}>
          ₹ {retail.toLocaleString(
            'en-IN',
          )}
        </Text>
      </View>

      {/* PROFIT */}
      <View
        style={[
          styles.statCard,
          styles.profitCard,
        ]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            Status
          </Text>

          <Text style={styles.cardIcon}>
            ∿
          </Text>
        </View>

        <Text
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          numberOfLines={2}
          style={[
            styles.cardValue,
            {
              color:
                profit < 0
                  ? '#DC2626'
                  : '#16A34A',
            },
          ]}>
          {profit < 0 ? '-₹ ' : '₹ '}
          {Math.abs(profit).toLocaleString(
            'en-IN',
          )}
        </Text>

        <Text
          style={{
            marginTop: 6,
            fontSize: 13,
            fontWeight: '700',
            color:
              profit < 0
                ? '#DC2626'
                : '#16A34A',
          }}>
          {profit < 0
            ? 'Loss'
            : 'Profit'}
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
    backgroundColor: '#F5F7FB',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 30,
  },

  header: {
    marginTop: 8,
    marginBottom: 18,
  },

  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },

  company: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  statCard: {
    width: '48%',
    minHeight: 100,

    borderRadius: 24,

    paddingHorizontal: 16,
    paddingVertical: 16,

    marginBottom: 14,

    borderWidth: 1,

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  salesCard: {
    backgroundColor: '#EEF4FF',
    borderColor: '#D9E7FF',
  },

  purchaseCard: {
    backgroundColor: '#EEFDF3',
    borderColor: '#D8F7E3',
  },

  retailCard: {
    backgroundColor: '#FFF8E8',
    borderColor: '#FBE8BA',
  },

  profitCard: {
    backgroundColor: '#F3F8F7',
    borderColor: '#D7EEE8',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardTitle: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },

  cardIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#64748B',
  },

  cardValue: {
    marginTop: 18,

    fontSize: 15,
    lineHeight: 22,

    fontWeight: '800',

    color: '#0F172A',

    flexShrink: 1,
  },
});