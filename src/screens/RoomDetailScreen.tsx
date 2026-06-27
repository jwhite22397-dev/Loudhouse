import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { GradientButton, Tag } from '../components/ui';
import { useCart } from '../context/CartContext';
import { colors, spacing, radius, typography, gradients } from '../theme/theme';
import { RootStackParamList } from '../navigation/types';

const slots = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'];

export const RoomDetailScreen: React.FC = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'RoomDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { addItem } = useCart();
  const room = params.room;

  const [hours, setHours] = useState(2);
  const [slot, setSlot] = useState(slots[2]);

  const total = room.pricePerHour * hours;

  const book = () => {
    addItem({
      id: `room-${room.id}-${slot}-${hours}`,
      title: `${room.name} Session`,
      subtitle: `${hours}h @ ${slot}`,
      price: total,
      qty: 1,
      kind: 'room',
      color: room.color,
    });
    navigation.navigate('Cart');
  };

  return (
    <ScreenContainer edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.topTitle}>{room.name}</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
        <LinearGradient
          colors={[room.color, room.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Text style={styles.heroGlyph}>{room.planet}</Text>
          <Text style={styles.heroName}>{room.name}</Text>
          <Text style={styles.heroTagline}>{room.tagline}</Text>
        </LinearGradient>

        <View style={styles.body}>
          {room.available ? (
            <Tag label="Available Today" color={colors.success} />
          ) : (
            <Tag label="Currently Booked" color={colors.danger} />
          )}

          <Text style={styles.desc}>{room.description}</Text>

          <Text style={styles.label}>What's inside</Text>
          <View style={styles.features}>
            {room.features.map((f) => (
              <View key={f} style={styles.feature}>
                <Ionicons name="checkmark-circle" size={16} color={colors.cyan} />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.label}>Session length</Text>
          <View style={styles.hoursRow}>
            {[1, 2, 3, 4].map((h) => (
              <Pressable
                key={h}
                onPress={() => setHours(h)}
                style={[styles.hourChip, hours === h && styles.hourChipActive]}
              >
                <Text style={[styles.hourText, hours === h && styles.hourTextActive]}>{h}h</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Start time</Text>
          <View style={styles.slotRow}>
            {slots.map((s) => (
              <Pressable
                key={s}
                onPress={() => setSlot(s)}
                style={[styles.slotChip, slot === s && styles.slotChipActive]}
              >
                <Text style={[styles.slotText, slot === s && styles.slotTextActive]}>{s}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <LinearGradient colors={gradients.night} style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Total</Text>
          <Text style={styles.footerTotal}>${total.toFixed(2)}</Text>
        </View>
        <GradientButton
          label={room.available ? 'Add Booking' : 'Join Waitlist'}
          onPress={book}
          style={{ flex: 1, marginLeft: spacing.lg }}
        />
      </LinearGradient>
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
  hero: {
    margin: spacing.lg,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
  },
  heroGlyph: { fontSize: 64, color: colors.white },
  heroName: { ...typography.h1, color: colors.white, marginTop: spacing.sm },
  heroTagline: { color: colors.white, opacity: 0.9, fontWeight: '600' },
  body: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  desc: { color: colors.textDim, fontSize: 14, lineHeight: 21, marginVertical: spacing.sm },
  label: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
    marginTop: spacing.md,
    marginBottom: 4,
  },
  features: { gap: spacing.sm },
  feature: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  featureText: { color: colors.textDim, fontSize: 14 },
  hoursRow: { flexDirection: 'row', gap: spacing.sm },
  hourChip: {
    width: 56,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hourChipActive: { borderColor: colors.primary, backgroundColor: colors.primary + '33' },
  hourText: { color: colors.textDim, fontWeight: '700' },
  hourTextActive: { color: colors.text },
  slotRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  slotChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  slotChipActive: { borderColor: colors.cyan, backgroundColor: colors.cyan + '22' },
  slotText: { color: colors.textDim, fontWeight: '600' },
  slotTextActive: { color: colors.text },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerLabel: { color: colors.textMuted, fontSize: 12 },
  footerTotal: { color: colors.text, fontWeight: '800', fontSize: 22 },
});
