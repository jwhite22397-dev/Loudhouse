import { StyleSheet, ScrollView, View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import Theme from '@/constants/Theme';
import SectionCard from '@/components/SectionCard';
import RoomCard from '@/components/RoomCard';
import BeatCard from '@/components/BeatCard';
import { programs } from '@/data/programs';
import { rooms, BOOKING_URL } from '@/data/rooms';
import { beats } from '@/data/beats';

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  mic: 'mic',
  upload: 'cloud-upload',
  heart: 'heart',
  school: 'school',
  tag: 'pricetag',
};

export default function HomeScreen() {
  const router = useRouter();
  const featuredBeats = beats.slice(0, 3);

  const handleBookRoom = () => {
    router.push('/booking');
  };

  const handleEvents = () => {
    WebBrowser.openBrowserAsync('https://www.loudhousestudios.com/events');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Image
          source={{
            uri: 'https://static.wixstatic.com/media/1efb99_0304330fa6104037917ce8dbce63c64a~mv2.jpg/v1/fill/w_1200,h_600,al_c,q_85/1efb99_0304330fa6104037917ce8dbce63c64a~mv2.jpg',
          }}
          style={styles.heroImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.heroGradient}
        >
          <Image
            source={{
              uri: 'https://static.wixstatic.com/media/c88063_efd1370d647642e99217b874611ee9cd~mv2.png/v1/fill/w_443,h_110,al_c,q_85/c88063_efd1370d647642e99217b874611ee9cd~mv2.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.heroSubtitle}>Professional Recording Studio · Atlanta, GA</Text>
        </LinearGradient>
      </View>

      <View style={styles.section}>
        <Pressable style={styles.bookingCard} onPress={handleBookRoom}>
          <View style={styles.bookingContent}>
            <Text style={styles.bookingLabel}>BOOK A ROOM</Text>
            <Text style={styles.bookingSubtext}>(limited spots available)</Text>
          </View>
          <View style={styles.bookingButton}>
            <Text style={styles.bookingButtonText}>BOOK NOW</Text>
            <Ionicons name="arrow-forward" size={16} color={Theme.colors.background} />
          </View>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Programs</Text>
        {programs.map((program) => (
          <SectionCard
            key={program.id}
            title={program.title}
            subtitle={program.subtitle}
            description={program.description}
            icon={ICON_MAP[program.icon]}
            onPress={() => router.push(`/program/${program.id}`)}
          />
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Studio Rooms</Text>
          <Pressable onPress={() => router.push('/studio')}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.roomsScroll}>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onPress={handleBookRoom} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Fresh Beats</Text>
          <Pressable onPress={() => router.push('/beats')}>
            <Text style={styles.seeAll}>Browse All</Text>
          </Pressable>
        </View>
        {featuredBeats.map((beat) => (
          <BeatCard
            key={beat.id}
            beat={beat}
            compact
            onPress={() => router.push(`/beat/${beat.id}`)}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.quickLinks}>
          <Pressable style={styles.quickLink} onPress={handleEvents}>
            <Ionicons name="calendar" size={24} color={Theme.colors.text} />
            <Text style={styles.quickLinkText}>Events</Text>
          </Pressable>
          <Pressable style={styles.quickLink} onPress={() => router.push('/shop')}>
            <Ionicons name="shirt" size={24} color={Theme.colors.text} />
            <Text style={styles.quickLinkText}>Merch</Text>
          </Pressable>
          <Pressable style={styles.quickLink} onPress={() => router.push('/about')}>
            <Ionicons name="information-circle" size={24} color={Theme.colors.text} />
            <Text style={styles.quickLinkText}>About</Text>
          </Pressable>
          <Pressable style={styles.quickLink} onPress={() => WebBrowser.openBrowserAsync(BOOKING_URL)}>
            <Ionicons name="time" size={24} color={Theme.colors.text} />
            <Text style={styles.quickLinkText}>Book</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>🗣️ Music Speaks, LoudHouse Listens 👂</Text>
        <Text style={styles.footerLocation}>Atlanta, GA</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  hero: {
    height: 280,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    justifyContent: 'flex-end',
    padding: Theme.spacing.lg,
  },
  logo: {
    width: 200,
    height: 50,
    marginBottom: Theme.spacing.sm,
  },
  heroSubtitle: {
    color: Theme.colors.textSecondary,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  section: {
    padding: Theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    color: Theme.colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: Theme.spacing.md,
  },
  seeAll: {
    color: Theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: Theme.spacing.md,
  },
  bookingCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookingContent: { flex: 1 },
  bookingLabel: {
    color: Theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  bookingSubtext: {
    color: Theme.colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  bookingButton: {
    backgroundColor: Theme.colors.text,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: Theme.borderRadius.md,
  },
  bookingButtonText: {
    color: Theme.colors.background,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  roomsScroll: {
    marginHorizontal: -Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
  },
  quickLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickLink: {
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.md,
    width: '23%',
  },
  quickLinkText: {
    color: Theme.colors.textSecondary,
    fontSize: 11,
    marginTop: 6,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    padding: Theme.spacing.xl,
    paddingBottom: 100,
  },
  footerText: {
    color: Theme.colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
  footerLocation: {
    color: Theme.colors.textMuted,
    fontSize: 12,
    marginTop: 8,
  },
});
