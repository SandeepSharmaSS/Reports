import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {useAuth} from '../../context/AuthContext';

import {getStockAnalysisERP} from '../../services/authService';

import StockAnalysisBackground from '../../shared/StockBackground';

const StockAnalysisScreen = () => {
  const {
    selectedOrg,
    token,
  } = useAuth();

  const [data, setData] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);


  const [searchText, setSearchText] =
  useState('');

  const [startDate, setStartDate] =
  useState('');

  const [endDate, setEndDate] =
  useState('');

const loadData = async () => {
  try {
    setLoading(true);

if (!selectedOrg) {
  setLoading(false);
  return;
}

    console.log(
      'CALLING STOCK ANALYSIS =>',
      selectedOrg,
    );

const res =
  await getStockAnalysisERP(
    Number(selectedOrg),
    startDate,
    endDate,
  );

    console.log(
      'STOCK RESPONSE =>',
      res,
    );

    if (res?.success) {
      setData(res.data || []);
    } else {
      setData([]);
    }
  } catch (error) {
    console.log(
      'STOCK ERROR =>',
      error,
    );

    setData([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (!selectedOrg || !token) {
      return;
    }

    console.log(
      'STOCK ANALYSIS RELOAD =>',
      selectedOrg,
    );

    loadData();
  }, [selectedOrg, token]);

const filteredData = data.filter(
  item =>
    String(item.ProductName || '')
      .toLowerCase()
      .includes(
        searchText.toLowerCase(),
      ),
);

  const renderItem = ({
    item,
  }: any) => (
    <View style={styles.card}>
      <Text style={styles.name}>
        {item.ProductName}
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>
          Batch
        </Text>

        <Text style={styles.value}>
          {item.Batch_No}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Expiry
        </Text>

        <Text style={styles.value}>
          {item.Exp_Date}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View>
          <Text style={styles.statLabel}>
            Purchase
          </Text>

          <Text style={styles.statValue}>
            {item.PurQty}
          </Text>
        </View>

        <View>
          <Text style={styles.statLabel}>
            Sale
          </Text>

          <Text style={styles.statValue}>
            {item.SalQty}
          </Text>
        </View>

        <View>
          <Text style={styles.statLabel}>
            Remaining
          </Text>

          <Text
            style={[
              styles.statValue,
              styles.remaining,
            ]}>
            {item.ClosingQty}
          </Text>
        </View>
      </View>
    </View>
  );

return (
  <SafeAreaView style={styles.container}>
    <StockAnalysisBackground />

    <View style={styles.topSection}>
      <Text style={styles.header}>
        Stock Analysis
      </Text>

      {/* SEARCH */}
      <TextInput
        placeholder="Search Product..."
        placeholderTextColor="#94A3B8"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
      />

      {/* DATE FILTER */}
      <View style={styles.dateRow}>
        <TextInput
          placeholder="Start Date"
          placeholderTextColor="#94A3B8"
          value={startDate}
          onChangeText={setStartDate}
          style={styles.dateInput}
        />

        <TextInput
          placeholder="End Date"
          placeholderTextColor="#94A3B8"
          value={endDate}
          onChangeText={setEndDate}
          style={styles.dateInput}
        />
      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={loadData}>
        <Text style={styles.filterButtonText}>
          Apply Filter
        </Text>
      </TouchableOpacity>
    </View>

    {loading ? (
      <ActivityIndicator
        size="large"
        color="#2563EB"
        style={{
          marginTop: 40,
        }}
      />
    ) : (
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) =>
          `${item.ProductId}-${item.Batch_No}-${index}`
        }
        renderItem={renderItem}
        initialNumToRender={20}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      />
    )}
  </SafeAreaView>
);
};

export default StockAnalysisScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    paddingHorizontal: 16,
    overflow: 'hidden',
  },

  topSection: {
    marginBottom: 10,
  },

  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 10,
    marginBottom: 18,
    letterSpacing: -0.8,
  },

  searchInput: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    paddingHorizontal: 18,
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  dateInput: {
    width: '48%',
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    elevation: 6,
    shadowColor: '#2563EB',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  filterButton: {
    height: 52,

    backgroundColor: '#2563EB',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    marginBottom: 12,
  },

  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 18,
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#2563EB',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  name: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  label: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '500',
  },

  value: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 13,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },

  statLabel: {
    color: '#64748B',
    fontSize: 12,
    marginBottom: 6,
  },

  statValue: {
    color: '#0F172A',
    fontWeight: '800',
    fontSize: 22,
  },

  remaining: {
    color: '#16A34A',
  },
});