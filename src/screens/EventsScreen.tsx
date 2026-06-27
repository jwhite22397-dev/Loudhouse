import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing, radius, typography } from '../theme/theme';
import { events } from '../data/sections';
import { RootStackParamList } from '../navigation/types';

export const EventsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.topTitle}>Events</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120, padding: spacing.lg }}>
        <Text style={styles.subtitle}>Live shows, workshops & open mics at LoudHouse.</Text>
        {events.map((e) => (
          <View key={e.id} style={styles.card}>
            <View style={[styles.dateChip, { backgroundColor: e.color + '22', borderColor: e.color }]}>
              <Text style={[styles.dateText, { color: e.color }]}>{e.date.split(',')[0]}</Text>
            </View>
            <Text style={styles.title}>{e.title}</Text>
            <View style={styles.metaRow}>
              <Ionicons name="time-outline" size={14} color={colors.textMuted} />
              <Text style={styles.meta}>{e.time}</Text>
              <Ionicons name="location-outline" size={14} color={colors.textMuted} style={{ marginLeft: spacing.md }} />
              <Text style={styles.meta}>{e.location}</Text>
            </View>
            <Text style={styles.desc}>{e.description}</Text>
          </View>
        ))}
      </ScrollView>
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
  subtitle: { color: colors.textDim, fontSize: 14, marginBottom: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  dateChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  dateText: { fontWeight: '800', fontSize: 12 },
  title: { ...typography.h3, color: colors.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, flexWrap: 'wrap' },
  meta: { color: colors.textMuted, fontSize: 12 },
  desc: { color: colors.textDim, fontSize: 14, lineHeight: 20, marginTop: spacing.sm },
});
