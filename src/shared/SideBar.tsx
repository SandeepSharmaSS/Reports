import React, {
  useEffect,
  useRef,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const {height} = Dimensions.get('window');


type Props = {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const SideBar = ({
  visible,
  onClose,
  onLogout,
}: Props) => {

  const navigation = useNavigation<any>();

  const slideAnim = useRef(
    new Animated.Value(height),
  ).current;

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(height);

      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 9,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

return (
  <View style={styles.overlay}>
    <TouchableOpacity
      activeOpacity={1}
      style={styles.backdrop}
      onPress={onClose}
    />

    <Animated.View
      style={[
        styles.bottomSheet,
        {
          transform: [
            {
              translateY: slideAnim,
            },
          ],
        },
      ]}>

      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <View style={styles.handle} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Menu
        </Text>

        <TouchableOpacity
          onPress={onClose}>
          <Text style={styles.closeIcon}>
            ✕
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileLetter}>
            U
          </Text>
        </View>

        <View>
          <Text style={styles.profileTitle}>
            UniOS Reports
          </Text>

          <Text style={styles.profileSub}>
            Analytics & Reporting
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 20,
        }}>

        <TouchableOpacity
          style={styles.menuCard}>
          <View>
            <Text
              style={styles.menuTitle}>
              Home
            </Text>

            <Text
              style={styles.menuSub}>
              Dashboard overview
            </Text>
          </View>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => {
            onClose();

            navigation.navigate(
              'StockAnalysis',
            );
          }}>
          <View>
            <Text style={styles.menuTitle}>
              Stock Analysis
            </Text>

            <Text style={styles.menuSub}>
              View stock & remaining quantity
            </Text>
          </View>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}>
          <View>
            <Text
              style={styles.menuTitle}>
              Settings
            </Text>

            <Text
              style={styles.menuSub}>
              Manage preferences
            </Text>
          </View>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutCard}
          onPress={onLogout}>
          <View>
            <Text
              style={styles.logoutLabel}>
              Sign Out
            </Text>

            <Text
              style={styles.logoutSub}>
              End current session
            </Text>
          </View>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

      </ScrollView>

    </Animated.View>
  </View>
);
};

export default SideBar;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    justifyContent: 'flex-end',
  },

  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

bottomSheet: {
  height: height * 0.78,

  backgroundColor: '#F8FAFC',

  borderTopLeftRadius: 38,
  borderTopRightRadius: 38,

  paddingTop: 12,
  paddingHorizontal: 22,

  overflow: 'hidden',

  elevation: 20,
},

bgCircle1: {
  position: 'absolute',

  width: 220,
  height: 220,

  borderRadius: 110,

  backgroundColor: '#DBEAFE',

  top: -60,
  right: -80,
},

bgCircle2: {
  position: 'absolute',

  width: 170,
  height: 170,

  borderRadius: 85,

  backgroundColor: '#E0E7FF',

  bottom: 100,
  left: -60,
},

handle: {
  width: 46,
  height: 5,

  borderRadius: 20,

  backgroundColor: '#CBD5E1',

  alignSelf: 'center',

  marginBottom: 20,
},

header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  marginBottom: 20,
},

headerTitle: {
  fontSize: 24,
  fontWeight: '700',
  color: '#111827',
},

closeIcon: {
  fontSize: 22,
  color: '#94A3B8',
},

profileCard: {
  flexDirection: 'row',
  alignItems: 'center',

  backgroundColor: '#FFFFFF',

  borderRadius: 24,

  padding: 18,

  marginBottom: 24,

  elevation: 4,
},

profileAvatar: {
  width: 56,
  height: 56,

  borderRadius: 28,

  backgroundColor: '#2563EB',

  justifyContent: 'center',
  alignItems: 'center',

  marginRight: 14,
},

profileLetter: {
  color: '#FFF',
  fontSize: 22,
  fontWeight: '700',
},

profileTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#111827',
},

profileSub: {
  marginTop: 3,
  color: '#64748B',
  fontSize: 13,
},

menuCard: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  backgroundColor: '#FFFFFF',

  borderRadius: 22,

  padding: 18,

  marginBottom: 14,

  elevation: 2,
},

menuTitle: {
  fontSize: 16,
  fontWeight: '700',
  color: '#111827',
},

menuSub: {
  marginTop: 4,
  color: '#64748B',
  fontSize: 12,
},

arrow: {
  fontSize: 26,
  color: '#94A3B8',
},

logoutCard: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  backgroundColor: '#EEF2FF',

  borderRadius: 22,

  padding: 18,

  marginTop: 10,
},

logoutLabel: {
  fontSize: 16,
  fontWeight: '700',
  color: '#3730A3',
},

logoutSub: {
  marginTop: 4,
  fontSize: 12,
  color: '#6366F1',
},
});