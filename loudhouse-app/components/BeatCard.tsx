import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Theme from '@/constants/Theme';
import { Beat } from '@/data/beats';
import { useAudio } from '@/context/AudioContext';

interface BeatCardProps {
  beat: Beat;
  onPress: () => void;
  compact?: boolean;
}

function formatPlays(plays: number): string {
  if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
  return plays.toString();
}

export default function BeatCard({ beat, onPress, compact }: BeatCardProps) {
  const { currentBeat, isPlaying, playBeat } = useAudio();
  const isCurrentBeat = currentBeat?.id === beat.id;
  const isCurrentlyPlaying = isCurrentBeat && isPlaying;

  const handlePlayPress = async (e: { stopPropagation?: () => void }) => {
    e.stopPropagation?.();
    await playBeat(beat);
  };

  if (compact) {
    return (
      <Pressable style={({ pressed }) => [styles.compactCard, pressed && styles.pressed]} onPress={onPress}>
        <Image source={{ uri: beat.coverArt }} style={styles.compactImage} />
        <View style={styles.compactInfo}>
          <Text style={styles.compactTitle} numberOfLines={1}>{beat.title}</Text>
          <Text style={styles.compactMeta}>{beat.producer} · {beat.bpm} BPM</Text>
        </View>
        <Pressable style={styles.playButton} onPress={handlePlayPress}>
          <Ionicons
            name={isCurrentlyPlaying ? 'pause' : 'play'}
            size={18}
            color={Theme.colors.background}
          />
        </Pressable>
        <Text style={styles.compactPrice}>${beat.licenses[0].price}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: beat.coverArt }} style={styles.image} />
        <Pressable style={styles.overlayPlay} onPress={handlePlayPress}>
          <Ionicons
            name={isCurrentlyPlaying ? 'pause' : 'play'}
            size={28}
            color={Theme.colors.text}
          />
        </Pressable>
        <View style={styles.genreBadge}>
          <Text style={styles.genreText}>{beat.genre}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{beat.title}</Text>
        <Text style={styles.producer}>{beat.producer}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{beat.bpm} BPM</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.meta}>{beat.key}</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Ionicons name="play" size={12} color={Theme.colors.textMuted} />
            <Text style={styles.statText}>{formatPlays(beat.plays)}</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="heart" size={12} color={Theme.colors.textMuted} />
            <Text style={styles.statText}>{formatPlays(beat.likes)}</Text>
          </View>
          <Text style={styles.price}>From ${beat.licenses[0].price}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    overflow: 'hidden',
    marginBottom: Theme.spacing.md,
  },
  pressed: { opacity: 0.9 },
  imageContainer: { position: 'relative' },
  image: { width: '100%', height: 160, backgroundColor: Theme.colors.surfaceLight },
  overlayPlay: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  genreBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
  },
  genreText: { color: Theme.colors.text, fontSize: 11, fontWeight: '600' },
  info: { padding: Theme.spacing.md },
  title: { color: Theme.colors.text, fontSize: 16, fontWeight: '700', marginBottom: 2 },
  producer: { color: Theme.colors.textSecondary, fontSize: 13, marginBottom: 6 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  meta: { color: Theme.colors.textMuted, fontSize: 12 },
  metaDot: { color: Theme.colors.textMuted, marginHorizontal: 6 },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4, marginRight: 12 },
  statText: { color: Theme.colors.textMuted, fontSize: 12 },
  price: { color: Theme.colors.gold, fontSize: 13, fontWeight: '600', marginLeft: 'auto' },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  compactImage: { width: 48, height: 48, borderRadius: Theme.borderRadius.sm },
  compactInfo: { flex: 1, marginLeft: Theme.spacing.sm },
  compactTitle: { color: Theme.colors.text, fontSize: 14, fontWeight: '600' },
  compactMeta: { color: Theme.colors.textMuted, fontSize: 12, marginTop: 2 },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Theme.colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.sm,
  },
  compactPrice: { color: Theme.colors.gold, fontSize: 13, fontWeight: '600' },
});
