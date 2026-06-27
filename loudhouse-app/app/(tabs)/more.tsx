import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import Theme from '@/constants/Theme';
import { team } from '@/data/team';

const MENU_ITEMS = [
  {
    icon: 'information-circle' as const,
    title: 'About Us',
    subtitle: 'Our story and mission',
    route: '/about',
  },
  {
    icon: 'calendar' as const,
    title: 'Events',
    subtitle: 'Upcoming shows and showcases',
    url: 'https://www.loudhousestudios.com/events',
  },
  {
    icon: 'mic' as const,
    title: 'Book a Room',
    subtitle: 'Reserve studio time',
    route: '/booking',
  },
  {
    icon: 'globe' as const,
    title: 'Website',
    subtitle: 'Visit loudhousestudios.com',
    url: 'https://www.loudhousestudios.com',
  },
  {
    icon: 'logo-instagram' as const,
    title: 'Instagram',
    subtitle: '@loudhousestudios',
    url: 'https://www.instagram.com/loudhousestudios',
  },
  {
    icon: 'mail' as const,
    title: 'Contact',
    subtitle: 'Get in touch with our team',
    url: 'mailto:info@loudhousestudios.com',
  },
];

export default function MoreScreen() {
  const router = useRouter();

  const handlePress = (item: typeof MENU_ITEMS[0]) => {
    if (item.route) {
      router.push(item.route as '/about' | '/booking');
    } else if (item.url) {
      WebBrowser.openBrowserAsync(item.url);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.teamSection}>
        <Text style={styles.sectionTitle}>Meet The Team</Text>
        <View style={styles.teamGrid}>
          {team.map((member) => (
            <View key={member.id} style={styles.teamCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {member.nickname.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.memberName}>{member.nickname}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.menuSection}>
        {MENU_ITEMS.map((item) => (
          <Pressable
            key={item.title}
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
            onPress={() => handlePress(item)}
          >
            <View style={styles.menuIcon}>
              <Ionicons name={item.icon} size={22} color={Theme.colors.text} />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Theme.colors.textMuted} />
          </Pressable>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>LOUDHOUSE STUDIOS</Text>
        <Text style={styles.footerTagline}>Music Speaks, LoudHouse Listens</Text>
        <Text style={styles.footerVersion}>App v1.0.0</Text>
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
  teamSection: {
    padding: Theme.spacing.lg,
  },
  sectionTitle: {
    color: Theme.colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: Theme.spacing.md,
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  teamCard: {
    width: '31%',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.sm,
  },
  avatarText: {
    color: Theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  memberName: {
    color: Theme.colors.text,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  memberRole: {
    color: Theme.colors.textMuted,
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
  },
  menuSection: {
    paddingHorizontal: Theme.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  menuItemPressed: {
    opacity: 0.85,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.sm,
    backgroundColor: Theme.colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    color: Theme.colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  menuSubtitle: {
    color: Theme.colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    padding: Theme.spacing.xl,
    marginTop: Theme.spacing.lg,
  },
  footerBrand: {
    color: Theme.colors.text,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 3,
  },
  footerTagline: {
    color: Theme.colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  footerVersion: {
    color: Theme.colors.textMuted,
    fontSize: 11,
    marginTop: Theme.spacing.md,
  },
  bottomPadding: { height: 100 },
});
