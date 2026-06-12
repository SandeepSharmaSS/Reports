import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';

import {getUserOrg} from '../services/authService';
import {useAuth} from '../context/AuthContext';

type Props = {
  onMenuPress: () => void;
};

const TopBar = ({onMenuPress}: Props) => {
  const auth = useAuth();

  const selectedOrg = auth?.selectedOrg ?? '';
  const changeCSA = auth?.changeCSA;

  const [orgs, setOrgs] = useState<any[]>([]);
  const [dropdownVisible, setDropdownVisible] =
    useState(false);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      const res = await getUserOrg();

      if (
        res?.status === 'ok' &&
        Array.isArray(res.data)
      ) {
        setOrgs(res.data);
      } else {
        setOrgs([]);
      }
    } catch (error) {
      console.log(error);
      setOrgs([]);
    }
  };

  const selectedOrgData =
    Array.isArray(orgs)
      ? orgs.find(
          item =>
            String(item?.CSA_Id) ===
            String(selectedOrg),
        )
      : null;

  const handleSelectOrg = async (
    csaId: number,
  ) => {
    try {
      if (typeof changeCSA === 'function') {
        await changeCSA(csaId);
      }

      setDropdownVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.appTitle}>
            UniOS Reports
          </Text>

          <Text
            numberOfLines={1}
            style={styles.orgName}>
            {selectedOrgData?.name ??
              'Select Organization'}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.csaButton}
            onPress={() =>
              setDropdownVisible(true)
            }>
            <Text style={styles.csaLabel}>
              {selectedOrgData?.CSA_Id ??
                'CSA'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={onMenuPress}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View
              style={styles.menuLineSmall}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.dropdown}>
            <Text style={styles.headerTitle}>
              Select Organization
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={
                false
              }>
              {Array.isArray(orgs) &&
                orgs.map(item => (
                  <TouchableOpacity
                    key={String(
                      item?.CSA_Id,
                    )}
                    style={styles.item}
                    onPress={() =>
                      handleSelectOrg(
                        item.CSA_Id,
                      )
                    }>
                    <Text
                      style={
                        styles.itemCsa
                      }>
                      CSA ID :{' '}
                      {item.CSA_Id}
                    </Text>

                    <Text
                      style={
                        styles.itemName
                      }>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setDropdownVisible(false)
              }>
              <Text
                style={
                  styles.closeText
                }>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    height: 78,

    marginHorizontal: 16,
    marginTop: 10,

    paddingHorizontal: 18,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#FFFFFF',

    borderRadius: 24,

    elevation: 6,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  leftContainer: {
    flex: 1,
    marginRight: 10,
  },

  appTitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },

  orgName: {
    marginTop: 3,

    fontSize: 16,
    fontWeight: '700',

    color: '#0F172A',
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  csaButton: {
    height: 38,

    paddingHorizontal: 14,

    borderRadius: 14,

    backgroundColor: '#EEF2FF',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 10,
  },

  csaLabel: {
    color: '#3730A3',
    fontWeight: '700',
    fontSize: 13,
  },

  menuButton: {
    width: 42,
    height: 42,

    borderRadius: 14,

    backgroundColor: '#F8FAFC',

    justifyContent: 'center',
    alignItems: 'center',
  },

  menuLine: {
    width: 18,
    height: 2.5,

    borderRadius: 2,

    backgroundColor: '#0F172A',

    marginBottom: 3,
  },

  menuLineSmall: {
    width: 12,
    height: 2.5,

    borderRadius: 2,

    backgroundColor: '#0F172A',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',

    justifyContent: 'center',

    padding: 20,
  },

  dropdown: {
    backgroundColor: '#FFFFFF',

    borderRadius: 28,

    maxHeight: '75%',

    padding: 20,

    elevation: 10,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 15,

    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',

    color: '#111827',

    marginBottom: 16,
  },

  item: {
    backgroundColor: '#F8FAFC',

    padding: 16,

    borderRadius: 18,

    marginBottom: 10,
  },

  itemCsa: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },

  itemName: {
    marginTop: 4,

    fontSize: 14,
    fontWeight: '600',

    color: '#111827',
  },

  closeButton: {
    height: 50,

    borderRadius: 16,

    backgroundColor: '#111827',

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 10,
  },

  closeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});