import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Beat } from '../data/types';
import { usePlayer } from '../context/PlayerContext';
import { colors, radius, spacing } from '../theme/theme';

interface Props {
  beat: Beat;
  onPress: () => void;
}

const formatPlays = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`);

export const BeatRow: React.FC<Props> = ({ beat, onPress }) => {
  const { current, isPlaying, playBeat, togglePlay } = usePlayer();
  const isActive = current?.id === beat.id;
  const showPause = isActive && isPlaying;
  const fromPrice = Math.min(...beat.licenses.map((l) => l.price));

  const handlePlay = () => {
    if (isActive) togglePlay();
    else playBeat(beat);
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, isActive && styles.rowActive, { opacity: pressed ? 0.9 : 1 }]}
    >
      <Pressable onPress={handlePlay} hitSlop={6}>
        <LinearGradient
          colors={[beat.artworkColor, beat.artworkAccent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.art}
        >
          <Ionicons name={showPause ? 'pause' : 'play'} size={22} color={colors.white} />
        </LinearGradient>
      </Pressable>

      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={1}>
          {beat.title}
          {beat.exclusive ? '  ' : ''}
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          {beat.producer} · {beat.bpm} BPM · {beat.key}
        </Text>
        <View style={styles.statsRow}>
          <Ionicons name="headset-outline" size={12} color={colors.textMuted} />
          <Text style={styles.stat}>{formatPlays(beat.plays)}</Text>
          <View style={[styles.genrePill, { borderColor: beat.artworkAccent + '66' }]}>
            <Text style={[styles.genreText, { color: beat.artworkAccent }]}>{beat.genre}</Text>
          </View>
        </View>
      </View>

      <View style={styles.priceCol}>
        <Text style={styles.priceLabel}>from</Text>
        <Text style={styles.price}>${fromPrice.toFixed(2)}</Text>
        <View style={styles.cartHint}>
          <Ionicons name="cart-outline" size={14} color={colors.cyan} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    gap: spacing.md,
  },
  rowActive: { borderColor: colors.cyan },
  art: {
    width: 56,
    height: 56,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: { flex: 1, gap: 2 },
  title: { color: colors.text, fontWeight: '700', fontSize: 15 },
  sub: { color: colors.textDim, fontSize: 12 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  stat: { color: colors.textMuted, fontSize: 11, marginRight: 4 },
  genrePill: {
    paddingHorizontal: 7,
    paddingVertical: 1,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  genreText: { fontSize: 10, fontWeight: '700' },
  priceCol: { alignItems: 'flex-end', gap: 1 },
  priceLabel: { color: colors.textMuted, fontSize: 10 },
  price: { color: colors.text, fontWeight: '800', fontSize: 15 },
  cartHint: { marginTop: 2 },
});
