import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { GradientButton } from '../components/ui';
import { colors, spacing, radius, typography } from '../theme/theme';
import { RootStackParamList } from '../navigation/types';

export const SectionDetailScreen: React.FC = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'SectionDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const s = params.section;

  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <LinearGradient
          colors={s.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroIcon}>
            <Ionicons name={s.icon as any} size={34} color={colors.white} />
          </View>
          <Text style={styles.heroSub}>{s.subtitle}</Text>
          <Text style={styles.heroTitle}>{s.title}</Text>
        </LinearGradient>

        <View style={styles.body}>
          <Text style={styles.desc}>{s.description}</Text>

          <Text style={styles.label}>Highlights</Text>
          {s.bullets.map((b) => (
            <View key={b} style={styles.bullet}>
              <Ionicons name="sparkles" size={16} color={colors.cyan} />
              <Text style={styles.bulletText}>{b}</Text>
            </View>
          ))}

          <GradientButton
            label={s.cta}
            gradient={s.gradient}
            onPress={() => navigation.navigate('Contact')}
            style={{ marginTop: spacing.xl }}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  topBar: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  hero: {
    margin: spacing.lg,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: 4,
  },
  heroIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroSub: { color: colors.white, opacity: 0.85, fontWeight: '600', letterSpacing: 1 },
  heroTitle: { ...typography.hero, color: colors.white, fontSize: 32 },
  body: { paddingHorizontal: spacing.lg },
  desc: { color: colors.textDim, fontSize: 15, lineHeight: 23 },
  label: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  bullet: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  bulletText: { color: colors.textDim, fontSize: 14 },
});
