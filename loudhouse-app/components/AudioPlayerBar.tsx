import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Theme from '@/constants/Theme';
import { useAudio } from '@/context/AudioContext';

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function AudioPlayerBar() {
  const { currentBeat, isPlaying, position, duration, togglePlayPause, stopPlayback } = useAudio();
  const router = useRouter();

  if (!currentBeat) return null;

  const progress = duration > 0 ? position / duration : 0;

  return (
    <View style={styles.container}>
      <Pressable style={styles.content} onPress={() => router.push(`/beat/${currentBeat.id}`)}>
        <Image source={{ uri: currentBeat.coverArt }} style={styles.artwork} />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>{currentBeat.title}</Text>
          <Text style={styles.producer} numberOfLines={1}>{currentBeat.producer}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
        </View>
      </Pressable>
      <View style={styles.controls}>
        <Pressable onPress={togglePlayPause} style={styles.controlButton}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={24}
            color={Theme.colors.text}
          />
        </Pressable>
        <Pressable onPress={stopPlayback} style={styles.controlButton}>
          <Ionicons name="close" size={20} color={Theme.colors.textMuted} />
        </Pressable>
      </View>
      <Text style={styles.time}>{formatTime(position)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
  },
  content: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  artwork: { width: 44, height: 44, borderRadius: Theme.borderRadius.sm },
  info: { flex: 1, marginLeft: Theme.spacing.sm },
  title: { color: Theme.colors.text, fontSize: 13, fontWeight: '600' },
  producer: { color: Theme.colors.textMuted, fontSize: 11 },
  progressBar: {
    height: 2,
    backgroundColor: Theme.colors.border,
    borderRadius: 1,
    marginTop: 4,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: Theme.colors.text },
  controls: { flexDirection: 'row', alignItems: 'center' },
  controlButton: { padding: Theme.spacing.sm },
  time: { color: Theme.colors.textMuted, fontSize: 11, marginLeft: 4, width: 32 },
});
