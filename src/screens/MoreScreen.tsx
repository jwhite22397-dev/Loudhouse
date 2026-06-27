import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { AppHeader } from '../components/AppHeader';
import { colors, spacing, radius, typography, gradients } from '../theme/theme';
import { sections } from '../data/sections';
import { RootStackParamList } from '../navigation/types';

export const MoreScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer>
      <AppHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.intro}>
          <Text style={styles.title}>More</Text>
          <Text style={styles.subtitle}>Programs, events & everything LoudHouse.</Text>
        </View>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>Programs</Text>
          {sections.map((s) => (
            <Pressable
              key={s.id}
              style={styles.row}
              onPress={() => navigation.navigate('SectionDetail', { section: s })}
            >
              <LinearGradient
                colors={s.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.icon}
              >
                <Ionicons name={s.icon as any} size={20} color={colors.white} />
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{s.title}</Text>
                <Text style={styles.rowSub} numberOfLines={1}>
                  {s.subtitle}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>Studio</Text>
          <Pressable style={styles.row} onPress={() => navigation.navigate('Events')}>
            <View style={[styles.icon, { backgroundColor: colors.surfaceAlt }]}>
              <Ionicons name="calendar" size={20} color={colors.pink} />
            </View>
            <Text style={[styles.rowTitle, { flex: 1 }]}>Events</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
          <Pressable style={styles.row} onPress={() => navigation.navigate('Contact')}>
            <View style={[styles.icon, { backgroundColor: colors.surfaceAlt }]}>
              <Ionicons name="call" size={20} color={colors.cyan} />
            </View>
            <Text style={[styles.rowTitle, { flex: 1 }]}>Contact & Location</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
          <Pressable
            style={styles.row}
            onPress={() => Linking.openURL('https://www.loudhousestudios.com/')}
          >
            <View style={[styles.icon, { backgroundColor: colors.surfaceAlt }]}>
              <Ionicons name="globe" size={20} color={colors.gold} />
            </View>
            <Text style={[styles.rowTitle, { flex: 1 }]}>Visit Website</Text>
            <Ionicons name="open-outline" size={18} color={colors.textMuted} />
          </Pressable>
        </View>

        <Text style={styles.footerNote}>LoudHouse Studios · Atlanta, GA</Text>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  intro: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.md },
  title: { ...typography.h1, color: colors.text },
  subtitle: { color: colors.textDim, fontSize: 14, marginTop: 6 },
  group: { paddingHorizontal: spacing.lg, marginTop: spacing.md },
  groupLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: { color: colors.text, fontWeight: '700', fontSize: 15 },
  rowSub: { color: colors.textMuted, fontSize: 12 },
  footerNote: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.xl,
  },
});
