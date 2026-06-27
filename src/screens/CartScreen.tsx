import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { GradientButton } from '../components/ui';
import { useCart } from '../context/CartContext';
import { colors, spacing, radius, typography, gradients } from '../theme/theme';
import { RootStackParamList } from '../navigation/types';

export const CartScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { items, total, updateQty, removeItem } = useCart();

  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.topTitle}>Your Cart</Text>
        <View style={{ width: 26 }} />
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="cart-outline" size={56} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>Add beats, merch, or a studio session to get started.</Text>
          <GradientButton
            label="Browse Beats"
            onPress={() => navigation.navigate('Tabs')}
            style={{ marginTop: spacing.lg }}
          />
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: spacing.lg, paddingBottom: 180 }}
          >
            {items.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={[styles.swatch, { backgroundColor: item.color }]}>
                  <Ionicons
                    name={
                      item.kind === 'beat'
                        ? 'musical-note'
                        : item.kind === 'room'
                        ? 'business'
                        : 'shirt'
                    }
                    size={20}
                    color={colors.white}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSub}>{item.subtitle}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                </View>
                <View style={styles.qtyCol}>
                  <View style={styles.qtyRow}>
                    <Pressable onPress={() => updateQty(item.id, item.qty - 1)} hitSlop={6} style={styles.qtyBtn}>
                      <Ionicons name="remove" size={16} color={colors.text} />
                    </Pressable>
                    <Text style={styles.qty}>{item.qty}</Text>
                    <Pressable onPress={() => updateQty(item.id, item.qty + 1)} hitSlop={6} style={styles.qtyBtn}>
                      <Ionicons name="add" size={16} color={colors.text} />
                    </Pressable>
                  </View>
                  <Pressable onPress={() => removeItem(item.id)} hitSlop={6}>
                    <Text style={styles.remove}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>

          <LinearGradient colors={gradients.night} style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
            <GradientButton label="Checkout" onPress={() => navigation.navigate('Checkout')} />
          </LinearGradient>
        </>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  topTitle: { ...typography.h3, color: colors.text },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.sm },
  emptyTitle: { ...typography.h2, color: colors.text, marginTop: spacing.md },
  emptyText: { color: colors.textMuted, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  swatch: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: { color: colors.text, fontWeight: '700', fontSize: 15 },
  itemSub: { color: colors.textMuted, fontSize: 12 },
  itemPrice: { color: colors.cyan, fontWeight: '800', marginTop: 4 },
  qtyCol: { alignItems: 'flex-end', justifyContent: 'space-between' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: { color: colors.text, fontWeight: '700', minWidth: 18, textAlign: 'center' },
  remove: { color: colors.danger, fontSize: 12, marginTop: spacing.sm },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { color: colors.textDim, fontSize: 15 },
  totalValue: { color: colors.text, fontWeight: '800', fontSize: 24 },
});
