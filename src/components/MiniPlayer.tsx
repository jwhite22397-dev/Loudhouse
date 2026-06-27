import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { usePlayer } from '../context/PlayerContext';
import { colors, radius, spacing } from '../theme/theme';

export const MiniPlayer: React.FC = () => {
  const { current, isPlaying, togglePlay, stop, position, duration } = usePlayer();

  if (!current) return null;

  const progress = duration > 0 ? Math.min(1, position / duration) : 0;

  return (
    <View style={styles.wrap}>
      <View style={styles.bar}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <View style={styles.row}>
          <LinearGradient
            colors={[current.artworkColor, current.artworkAccent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.art}
          >
            <Ionicons name="musical-note" size={18} color={colors.white} />
          </LinearGradient>
          <View style={styles.meta}>
            <Text style={styles.title} numberOfLines={1}>
              {current.title}
            </Text>
            <Text style={styles.producer} numberOfLines={1}>
              {current.producer} · {current.bpm} BPM
            </Text>
          </View>
          <Pressable onPress={togglePlay} hitSlop={10} style={styles.playBtn}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={22} color={colors.white} />
          </Pressable>
          <Pressable onPress={stop} hitSlop={10} style={styles.closeBtn}>
            <Ionicons name="close" size={20} color={colors.textMuted} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: 0,
  },
  bar: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  progressTrack: { height: 3, backgroundColor: colors.border },
  progressFill: { height: 3, backgroundColor: colors.cyan },
  row: { flexDirection: 'row', alignItems: 'center', padding: spacing.sm, gap: spacing.sm },
  art: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: { flex: 1 },
  title: { color: colors.text, fontWeight: '700', fontSize: 14 },
  producer: { color: colors.textMuted, fontSize: 12 },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: { padding: 6 },
});
