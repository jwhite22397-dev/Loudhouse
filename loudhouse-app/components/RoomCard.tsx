import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Theme from '@/constants/Theme';
import { StudioRoom } from '@/data/rooms';

interface RoomCardProps {
  room: StudioRoom;
  onPress?: () => void;
  fullWidth?: boolean;
}

export default function RoomCard({ room, onPress, fullWidth }: RoomCardProps) {
  return (
    <Pressable style={({ pressed }) => [styles.card, fullWidth && styles.cardFull, pressed && styles.pressed]} onPress={onPress}>
      <Image source={{ uri: room.image }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.planet}>{room.planet.toUpperCase()}</Text>
        <Text style={styles.name}>{room.name}</Text>
        <Text style={styles.rate}>${room.hourlyRate}/hr</Text>
      </View>
      <View style={styles.features}>
        {room.features.slice(0, 2).map((feature) => (
          <View key={feature} style={styles.featureBadge}>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    marginRight: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  cardFull: {
    width: '100%',
    marginRight: 0,
  },
  pressed: { opacity: 0.9 },
  image: { width: '100%', height: 120 },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: Theme.spacing.md,
    justifyContent: 'flex-end',
  },
  planet: {
    color: Theme.colors.textSecondary,
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '600',
  },
  name: { color: Theme.colors.text, fontSize: 16, fontWeight: '700' },
  rate: { color: Theme.colors.gold, fontSize: 13, fontWeight: '600', marginTop: 2 },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    padding: Theme.spacing.sm,
  },
  featureBadge: {
    backgroundColor: Theme.colors.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Theme.borderRadius.sm,
  },
  featureText: { color: Theme.colors.textMuted, fontSize: 10 },
});
