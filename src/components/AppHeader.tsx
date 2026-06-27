import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCart } from '../context/CartContext';
import { colors, spacing, radius } from '../theme/theme';
import { RootStackParamList } from '../navigation/types';

interface Props {
  title?: string;
  subtitle?: string;
}

export const AppHeader: React.FC<Props> = ({ title = 'LOUDHOUSE', subtitle = 'STUDIOS' }) => {
  const { count } = useCart();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.header}>
      <View style={styles.logoWrap}>
        <View style={styles.logoMark}>
          <Ionicons name="planet" size={18} color={colors.cyan} />
        </View>
        <View>
          <Text style={styles.logoText}>{title}</Text>
          <Text style={styles.logoSub}>{subtitle}</Text>
        </View>
      </View>
      <Pressable style={styles.cartBtn} onPress={() => navigation.navigate('Cart')} hitSlop={8}>
        <Ionicons name="cart-outline" size={24} color={colors.text} />
        {count > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  logoWrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { color: colors.text, fontWeight: '800', fontSize: 16, letterSpacing: 2 },
  logoSub: { color: colors.cyan, fontWeight: '700', fontSize: 10, letterSpacing: 4 },
  cartBtn: { padding: 6 },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.pink,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: { color: colors.white, fontSize: 10, fontWeight: '800' },
});
