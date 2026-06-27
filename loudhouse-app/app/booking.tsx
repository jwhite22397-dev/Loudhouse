import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import Theme from '@/constants/Theme';
import { rooms, BOOKING_URL } from '@/data/rooms';

export default function BookingScreen() {
  const router = useRouter();

  const handleBookNow = () => {
    WebBrowser.openBrowserAsync(BOOKING_URL);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Book a Room</Text>
          <Text style={styles.subtitle}>
            Choose from our six planet-themed studios. Limited spots available — book early to secure your session.
          </Text>
        </View>

        {rooms.map((room) => (
          <View key={room.id} style={styles.roomCard}>
            <View style={styles.roomHeader}>
              <View>
                <Text style={styles.planet}>{room.planet.toUpperCase()}</Text>
                <Text style={styles.roomName}>{room.name}</Text>
              </View>
              <Text style={styles.price}>${room.hourlyRate}/hr</Text>
            </View>
            <Text style={styles.roomDesc}>{room.description}</Text>
            <View style={styles.features}>
              {room.features.map((feature) => (
                <View key={feature} style={styles.featureBadge}>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.note}>
          <Ionicons name="information-circle" size={20} color={Theme.colors.textMuted} />
          <Text style={styles.noteText}>
            Booking is handled through PocketSuite. You'll be redirected to complete your reservation and payment.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>BOOK NOW</Text>
          <Ionicons name="open-outline" size={18} color={Theme.colors.background} />
        </Pressable>
        <Pressable style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    padding: Theme.spacing.lg,
  },
  title: {
    color: Theme.colors.text,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    color: Theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  roomCard: {
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.md,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.sm,
  },
  planet: {
    color: Theme.colors.textMuted,
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '600',
  },
  roomName: {
    color: Theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  price: {
    color: Theme.colors.gold,
    fontSize: 16,
    fontWeight: '700',
  },
  roomDesc: {
    color: Theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: Theme.spacing.sm,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  featureBadge: {
    backgroundColor: Theme.colors.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
  },
  featureText: {
    color: Theme.colors.textMuted,
    fontSize: 11,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Theme.spacing.sm,
    margin: Theme.spacing.lg,
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  noteText: {
    color: Theme.colors.textMuted,
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  footer: {
    padding: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  bookButton: {
    backgroundColor: Theme.colors.text,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  bookButtonText: {
    color: Theme.colors.background,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
  },
  cancelButton: {
    padding: Theme.spacing.md,
    alignItems: 'center',
  },
  cancelText: {
    color: Theme.colors.textMuted,
    fontSize: 14,
  },
});
