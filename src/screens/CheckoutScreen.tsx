import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { GradientButton } from '../components/ui';
import { useCart } from '../context/CartContext';
import { colors, spacing, radius, typography, gradients } from '../theme/theme';
import { RootStackParamList } from '../navigation/types';

export const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { items, total, clear } = useCart();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', card: '' });

  const tax = total * 0.08;
  const grand = total + tax;

  const placeOrder = () => {
    setDone(true);
    clear();
  };

  if (done) {
    return (
      <ScreenContainer>
        <View style={styles.successWrap}>
          <LinearGradient colors={gradients.aurora} style={styles.successIcon}>
            <Ionicons name="checkmark" size={48} color={colors.white} />
          </LinearGradient>
          <Text style={styles.successTitle}>Order Confirmed!</Text>
          <Text style={styles.successText}>
            Thanks for supporting LoudHouse. Your beats & downloads are on the way to your email, and
            any bookings are pending confirmation.
          </Text>
          <GradientButton
            label="Back to Home"
            onPress={() => navigation.navigate('Tabs')}
            style={{ marginTop: spacing.xl, alignSelf: 'stretch' }}
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.topTitle}>Checkout</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: 180 }}>
        <Text style={styles.label}>Contact</Text>
        <Field icon="person-outline" placeholder="Full name" value={form.name} onChangeText={(t) => setForm({ ...form, name: t })} />
        <Field icon="mail-outline" placeholder="Email address" value={form.email} onChangeText={(t) => setForm({ ...form, email: t })} keyboardType="email-address" />

        <Text style={styles.label}>Payment</Text>
        <Field icon="card-outline" placeholder="Card number" value={form.card} onChangeText={(t) => setForm({ ...form, card: t })} keyboardType="number-pad" />
        <View style={styles.payNote}>
          <Ionicons name="lock-closed" size={14} color={colors.textMuted} />
          <Text style={styles.payNoteText}>Demo checkout — no real payment is processed.</Text>
        </View>

        <Text style={styles.label}>Order summary</Text>
        <View style={styles.summary}>
          {items.map((i) => (
            <View key={i.id} style={styles.sumRow}>
              <Text style={styles.sumName} numberOfLines={1}>
                {i.qty}× {i.title}
              </Text>
              <Text style={styles.sumVal}>${(i.price * i.qty).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.sumRow}>
            <Text style={styles.sumLabel}>Subtotal</Text>
            <Text style={styles.sumVal}>${total.toFixed(2)}</Text>
          </View>
          <View style={styles.sumRow}>
            <Text style={styles.sumLabel}>Tax (8%)</Text>
            <Text style={styles.sumVal}>${tax.toFixed(2)}</Text>
          </View>
          <View style={styles.sumRow}>
            <Text style={styles.grandLabel}>Total</Text>
            <Text style={styles.grandVal}>${grand.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <LinearGradient colors={gradients.night} style={styles.footer}>
        <GradientButton label={`Pay $${grand.toFixed(2)}`} onPress={placeOrder} />
      </LinearGradient>
    </ScreenContainer>
  );
};

const Field: React.FC<{
  icon: any;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: 'default' | 'email-address' | 'number-pad';
}> = ({ icon, placeholder, value, onChangeText, keyboardType = 'default' }) => (
  <View style={styles.field}>
    <Ionicons name={icon} size={18} color={colors.textMuted} />
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textMuted}
      keyboardType={keyboardType}
      autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  topTitle: { ...typography.h3, color: colors.text },
  label: { color: colors.text, fontWeight: '700', fontSize: 16, marginTop: spacing.lg, marginBottom: spacing.sm },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  input: { flex: 1, color: colors.text, paddingVertical: 14, fontSize: 15 },
  payNote: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  payNoteText: { color: colors.textMuted, fontSize: 12 },
  summary: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sumName: { color: colors.textDim, fontSize: 14, flex: 1, marginRight: spacing.sm },
  sumLabel: { color: colors.textMuted, fontSize: 14 },
  sumVal: { color: colors.text, fontWeight: '600', fontSize: 14 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 4 },
  grandLabel: { color: colors.text, fontWeight: '800', fontSize: 16 },
  grandVal: { color: colors.cyan, fontWeight: '800', fontSize: 18 },
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
  },
  successWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  successIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  successTitle: { ...typography.h1, color: colors.text, textAlign: 'center' },
  successText: { color: colors.textDim, textAlign: 'center', marginTop: spacing.sm, lineHeight: 21 },
});
