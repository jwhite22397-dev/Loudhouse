import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { GradientButton } from '../components/ui';
import { colors, spacing, radius, typography, gradients } from '../theme/theme';
import { RootStackParamList } from '../navigation/types';

const links = [
  { icon: 'logo-instagram', label: 'Instagram', url: 'https://instagram.com' },
  { icon: 'logo-tiktok', label: 'TikTok', url: 'https://tiktok.com' },
  { icon: 'logo-youtube', label: 'YouTube', url: 'https://youtube.com' },
  { icon: 'globe', label: 'Website', url: 'https://www.loudhousestudios.com/' },
];

export const ContactScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.topTitle}>Contact</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120, padding: spacing.lg }}>
        <LinearGradient colors={gradients.cosmic} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <Ionicons name="planet" size={36} color={colors.white} />
          <Text style={styles.heroTitle}>Let's Make Something</Text>
          <Text style={styles.heroSub}>Reach out to book a session or ask about our programs.</Text>
        </LinearGradient>

        <Pressable style={styles.row} onPress={() => Linking.openURL('tel:+14045550199')}>
          <Ionicons name="call" size={22} color={colors.cyan} />
          <View style={{ flex: 1 }}>
            <Text style={styles.rowLabel}>Phone</Text>
            <Text style={styles.rowValue}>(404) 555-0199</Text>
          </View>
        </Pressable>
        <Pressable style={styles.row} onPress={() => Linking.openURL('mailto:booking@loudhousestudios.com')}>
          <Ionicons name="mail" size={22} color={colors.pink} />
          <View style={{ flex: 1 }}>
            <Text style={styles.rowLabel}>Email</Text>
            <Text style={styles.rowValue}>booking@loudhousestudios.com</Text>
          </View>
        </Pressable>
        <View style={styles.row}>
          <Ionicons name="location" size={22} color={colors.gold} />
          <View style={{ flex: 1 }}>
            <Text style={styles.rowLabel}>Location</Text>
            <Text style={styles.rowValue}>Atlanta, GA</Text>
          </View>
        </View>

        <Text style={styles.socialLabel}>Follow LoudHouse</Text>
        <View style={styles.socials}>
          {links.map((l) => (
            <Pressable key={l.label} style={styles.social} onPress={() => Linking.openURL(l.url)}>
              <Ionicons name={l.icon as any} size={24} color={colors.text} />
              <Text style={styles.socialText}>{l.label}</Text>
            </Pressable>
          ))}
        </View>

        <GradientButton
          label="Book a Room"
          onPress={() => navigation.navigate('Tabs')}
          style={{ marginTop: spacing.xl }}
        />
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
  hero: { borderRadius: radius.xl, padding: spacing.xl, alignItems: 'center', gap: 6, marginBottom: spacing.lg },
  heroTitle: { ...typography.h2, color: colors.white, marginTop: spacing.sm },
  heroSub: { color: '#F0ECFF', textAlign: 'center', fontSize: 13 },
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
  rowLabel: { color: colors.textMuted, fontSize: 12 },
  rowValue: { color: colors.text, fontWeight: '700', fontSize: 15 },
  socialLabel: { color: colors.text, fontWeight: '700', fontSize: 16, marginTop: spacing.lg, marginBottom: spacing.sm },
  socials: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  social: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  socialText: { color: colors.text, fontWeight: '600' },
});
