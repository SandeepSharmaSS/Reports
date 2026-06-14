import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../../context/AuthContext';
import {getStockAgeingReport,} from '../../services/authService';

import StockAgeingBackground from '../../shared/StockAgeingBackground';

const today =
  new Date()
    .toISOString()
    .split('T')[0];

const StockAgeingScreen = () => {
  const {
    selectedOrg,
    token,
  } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [data, setData] =
    useState<any[]>([]);

  const [searchText, setSearchText] =
    useState('');

  const [fromDate, setFromDate] =
    useState(today);

  const [toDate, setToDate] =
    useState(today);

  const loadReport = async () => {
    try {
      setLoading(true);

      const res =
        await getStockAgeingReport(
          fromDate,
          toDate,
          Number(selectedOrg),
        );

      if (res?.status === 'ok') {
        setData(res.data || []);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedOrg || !token) {
      return;
    }

    loadReport();
  }, [selectedOrg, token]);

  const filteredData =
    data.filter(item =>
      `${item.ProductName} ${item.Batch_No}`
        .toLowerCase()
        .includes(
          searchText.toLowerCase(),
        ),
    );

  const renderItem = ({
    item,
  }: any) => (
    <View style={styles.card}>
      <Text style={styles.product}>
        {item.ProductName}
      </Text>

      <Text style={styles.batch}>
        Batch : {item.Batch_No}
      </Text>

      <View style={styles.row}>
        <Text>
          Stock :
          {' '}
          {item.Stock}
        </Text>

        <Text>
          ₹
          {Number(
            item.StockValue,
          ).toFixed(2)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text>
          Movement :
          {' '}
          {item.MovementDays}
          d
        </Text>

        <Text>
          DOI :
          {' '}
          {item.DaysOfInventory}
        </Text>
      </View>

      <View style={styles.badgeRow}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                '#DBEAFE',
            },
          ]}>
          <Text
            style={
              styles.badgeText
            }>
            {
              item.MovementCategory
            }
          </Text>
        </View>

        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                item.StockHealth ===
                'Healthy'
                  ? '#DCFCE7'
                  : '#FEE2E2',
            },
          ]}>
          <Text
            style={
              styles.badgeText
            }>
            {item.StockHealth}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={styles.container}>
      <StockAgeingBackground />

      <Text style={styles.header}>
        ⏳ Stock Ageing
      </Text>

      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search Product / Batch"
        style={styles.search}
      />

      <View style={styles.dateRow}>
        <TextInput
          value={fromDate}
          onChangeText={setFromDate}
          style={styles.dateInput}
        />

        <TextInput
          value={toDate}
          onChangeText={setToDate}
          style={styles.dateInput}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={loadReport}>
        <Text
          style={styles.buttonText}>
          Generate Report
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(
            item,
            index,
          ) =>
            `${item.Id}-${index}`
          }
          showsVerticalScrollIndicator={
            false
          }
        />
      )}
    </SafeAreaView>
  );
};

export default StockAgeingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 10,
    marginBottom: 10,
    letterSpacing: -0.8,
  },

  search: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color: '#111827',
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOpacity: 0.08,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  dateInput: {
    width: '48%',
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color: '#111827',
    elevation: 3,
  },

  button: {
    height: 52,
    backgroundColor: '#2563EB',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#2563EB',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    elevation: 8,
    shadowColor: '#2563EB',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  product: {
    fontSize: 17,

    fontWeight: '800',

    color: '#0F172A',

    marginBottom: 8,
  },

  batch: {
    color: '#64748B',

    fontSize: 13,

    marginBottom: 14,
  },

  row: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: 10,
  },

  badgeRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: 14,
  },

  badge: {
    paddingHorizontal: 14,

    paddingVertical: 8,

    borderRadius: 20,
  },

  badgeText: {
    fontSize: 12,

    fontWeight: '800',

    textTransform: 'uppercase',

    color: '#0F172A',
  },
});