import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { GradientButton, Tag } from '../components/ui';
import { usePlayer } from '../context/PlayerContext';
import { useCart } from '../context/CartContext';
import { colors, spacing, radius, typography, gradients } from '../theme/theme';
import { RootStackParamList } from '../navigation/types';
import { BeatLicense } from '../data/types';

const fmt = (s: number) => {
  if (!s || Number.isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

export const BeatDetailScreen: React.FC = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'BeatDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const beat = params.beat;
  const { current, isPlaying, playBeat, togglePlay, position, duration, seek } = usePlayer();
  const { addItem } = useCart();

  const isActive = current?.id === beat.id;
  const [selected, setSelected] = useState<BeatLicense>(beat.licenses[1] ?? beat.licenses[0]);

  const progress = isActive && duration > 0 ? Math.min(1, position / duration) : 0;

  const addToCart = () => {
    addItem({
      id: `beat-${beat.id}-${selected.type}`,
      title: beat.title,
      subtitle: `${selected.name} · ${beat.producer}`,
      price: selected.price,
      qty: 1,
      kind: 'beat',
      color: beat.artworkColor,
    });
    navigation.navigate('Cart');
  };

  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.topTitle} numberOfLines={1}>
          {beat.title}
        </Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
        <LinearGradient
          colors={[beat.artworkColor, beat.artworkAccent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.art}
        >
          {beat.exclusive ? (
            <View style={styles.exclusiveBadge}>
              <Ionicons name="star" size={12} color={colors.bg} />
              <Text style={styles.exclusiveText}>EXCLUSIVE AVAILABLE</Text>
            </View>
          ) : null}
          <Pressable
            style={styles.bigPlay}
            onPress={() => (isActive ? togglePlay() : playBeat(beat))}
          >
            <Ionicons name={isActive && isPlaying ? 'pause' : 'play'} size={40} color={colors.white} />
          </Pressable>
        </LinearGradient>

        <View style={styles.body}>
          <Text style={styles.title}>{beat.title}</Text>
          <Text style={styles.producer}>prod. {beat.producer}</Text>

          {/* Progress */}
          <View style={styles.progressWrap}>
            <View style={styles.waveform}>
              {Array.from({ length: 44 }).map((_, i) => {
                const filled = i / 44 <= progress;
                const h = 6 + ((i * 7) % 22);
                return (
                  <Pressable
                    key={i}
                    hitSlop={6}
                    onPress={() => duration > 0 && seek((i / 44) * duration)}
                    style={[
                      styles.waveBar,
                      { height: h, backgroundColor: filled ? colors.cyan : colors.border },
                    ]}
                  />
                );
              })}
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.time}>{fmt(isActive ? position : 0)}</Text>
              <Text style={styles.time}>{fmt(isActive ? duration : 0)}</Text>
            </View>
          </View>

          {/* Specs */}
          <View style={styles.specs}>
            <Spec label="BPM" value={`${beat.bpm}`} />
            <Spec label="Key" value={beat.key} />
            <Spec label="Genre" value={beat.genre} />
            <Spec label="Plays" value={`${(beat.plays / 1000).toFixed(1)}k`} />
          </View>

          <View style={styles.tags}>
            {beat.tags.map((t) => (
              <Tag key={t} label={`#${t}`} color={beat.artworkAccent} />
            ))}
          </View>

          <Text style={styles.sectionLabel}>Choose a license</Text>
          {beat.licenses.map((lic) => {
            const active = selected.type === lic.type;
            return (
              <Pressable
                key={lic.type}
                onPress={() => setSelected(lic)}
                style={[styles.license, active && styles.licenseActive]}
              >
                <View style={styles.licenseHead}>
                  <View style={styles.radio}>
                    {active ? <View style={styles.radioDot} /> : null}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.licenseName}>{lic.name}</Text>
                    <Text style={styles.licensePerks} numberOfLines={2}>
                      {lic.perks.join(' · ')}
                    </Text>
                  </View>
                  <Text style={styles.licensePrice}>${lic.price.toFixed(2)}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <LinearGradient colors={gradients.night} style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>{selected.name}</Text>
          <Text style={styles.footerPrice}>${selected.price.toFixed(2)}</Text>
        </View>
        <GradientButton label="Add to Cart" onPress={addToCart} style={{ flex: 1, marginLeft: spacing.lg }} />
      </LinearGradient>
    </ScreenContainer>
  );
};

const Spec: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.spec}>
    <Text style={styles.specValue}>{value}</Text>
    <Text style={styles.specLabel}>{label}</Text>
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
  topTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center' },
  art: {
    height: 240,
    margin: spacing.lg,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exclusiveBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.gold,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  exclusiveText: { color: colors.bg, fontWeight: '800', fontSize: 10, letterSpacing: 1 },
  bigPlay: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  body: { paddingHorizontal: spacing.lg },
  title: { ...typography.h1, color: colors.text },
  producer: { color: colors.cyan, fontWeight: '600', marginTop: 2 },
  progressWrap: { marginTop: spacing.lg },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 32,
  },
  waveBar: { width: 4, borderRadius: 2 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  time: { color: colors.textMuted, fontSize: 11 },
  specs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
  },
  spec: { flex: 1, alignItems: 'center' },
  specValue: { color: colors.text, fontWeight: '800', fontSize: 16 },
  specLabel: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  sectionLabel: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  license: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  licenseActive: { borderColor: colors.primary, backgroundColor: colors.primary + '14' },
  licenseHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: colors.primary },
  licenseName: { color: colors.text, fontWeight: '700', fontSize: 15 },
  licensePerks: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  licensePrice: { color: colors.text, fontWeight: '800', fontSize: 16 },
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
  footerPrice: { color: colors.text, fontWeight: '800', fontSize: 22 },
});
