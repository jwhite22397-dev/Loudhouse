import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Theme from '@/constants/Theme';
import RoomCard from '@/components/RoomCard';
import { rooms } from '@/data/rooms';

export default function StudioScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Our Space</Text>
        <Text style={styles.heroSubtitle}>
          Six uniquely designed rooms named after the planets. Each space is equipped with
          professional-grade gear to bring your vision to life.
        </Text>
      </View>

      <View style={styles.planetsRow}>
        {rooms.map((room) => (
          <View key={room.id} style={styles.planetBadge}>
            <Text style={styles.planetText}>{room.planet}</Text>
          </View>
        ))}
      </View>

      <Pressable style={styles.bookingBanner} onPress={() => router.push('/booking')}>
        <View>
          <Text style={styles.bookingTitle}>Book a Room</Text>
          <Text style={styles.bookingSubtext}>Limited spots available</Text>
        </View>
        <View style={styles.bookingCta}>
          <Text style={styles.bookingCtaText}>BOOK NOW</Text>
          <Ionicons name="arrow-forward" size={16} color={Theme.colors.background} />
        </View>
      </Pressable>

      <View style={styles.roomsGrid}>
        {rooms.map((room) => (
          <View key={room.id} style={styles.roomItem}>
            <RoomCard room={room} fullWidth onPress={() => router.push('/booking')} />
          </View>
        ))}
      </View>

      <View style={styles.amenities}>
        <Text style={styles.amenitiesTitle}>Studio Amenities</Text>
        <View style={styles.amenitiesGrid}>
          {[
            { icon: 'wifi', label: 'Free WiFi' },
            { icon: 'cafe', label: 'Lounge Area' },
            { icon: 'car', label: 'Free Parking' },
            { icon: 'snow', label: 'A/C' },
            { icon: 'water', label: 'Refreshments' },
            { icon: 'headset', label: 'Engineer On-Site' },
          ].map((amenity) => (
            <View key={amenity.label} style={styles.amenityItem}>
              <Ionicons name={amenity.icon as keyof typeof Ionicons.glyphMap} size={24} color={Theme.colors.text} />
              <Text style={styles.amenityLabel}>{amenity.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  hero: {
    padding: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
  },
  heroTitle: {
    color: Theme.colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: Theme.spacing.sm,
  },
  heroSubtitle: {
    color: Theme.colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  planetsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,
  },
  planetBadge: {
    backgroundColor: Theme.colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: Theme.borderRadius.full,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  planetText: {
    color: Theme.colors.textSecondary,
    fontSize: 12,
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  bookingBanner: {
    marginHorizontal: Theme.spacing.lg,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
  },
  bookingTitle: {
    color: Theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  bookingSubtext: {
    color: Theme.colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  bookingCta: {
    backgroundColor: Theme.colors.text,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: Theme.borderRadius.md,
  },
  bookingCtaText: {
    color: Theme.colors.background,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  roomsGrid: {
    paddingHorizontal: Theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  roomItem: {
    width: '47%',
  },
  amenities: {
    padding: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
  },
  amenitiesTitle: {
    color: Theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: Theme.spacing.md,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  amenityItem: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  amenityLabel: {
    color: Theme.colors.textSecondary,
    fontSize: 11,
    marginTop: 6,
    textAlign: 'center',
  },
  bottomPadding: { height: 100 },
});
