import { StyleSheet, ScrollView, View, Text } from 'react-native';
import Theme from '@/constants/Theme';
import { team } from '@/data/team';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>About Us</Text>
        <Text style={styles.heroSubtitle}>From a Dream to a Movement</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.paragraph}>
          LoudHouse Studios was born from a passion for music, creativity, and the relentless
          pursuit of artistic freedom. What started as a vision — an idea to create a space where
          artists could truly be heard — quickly evolved into something greater: a movement.
        </Text>
        <Text style={styles.paragraph}>
          Before LoudHouse, we saw the struggle firsthand: talented artists with limitless
          potential, yet limited resources. Studios that felt transactional rather than inspiring.
          Gatekeepers controlling access to opportunities. That's why LoudHouse Studios was built
          differently — not just as a recording space, but as a launchpad for independent artists.
        </Text>
        <Text style={styles.paragraph}>
          We created LoudHouse Studios to be more than four walls and a mic. It's a hub where
          creativity thrives, where artists, producers, and visionaries come together to
          collaborate, innovate, and disrupt the industry.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Vision</Text>
        <Text style={styles.sectionSubtitle}>Powering the Future of Independent Music</Text>

        {[
          { emoji: '🎶', title: 'Create Freely', desc: 'A space where authenticity comes first. No industry politics, just pure artistry.' },
          { emoji: '🚀', title: 'Amplify Talent', desc: 'Through LoudHouse Distribution, we give artists the power to control their own music and reach global audiences.' },
          { emoji: '🌎', title: 'Build a Community', desc: 'Collaboration fuels success. We connect like-minded artists, producers, and creatives to push culture forward.' },
          { emoji: '📡', title: 'Innovate & Elevate', desc: 'Whether through cutting-edge production, marketing strategies, or industry partnerships, we help artists thrive.' },
        ].map((item) => (
          <View key={item.title} style={styles.visionItem}>
            <Text style={styles.visionEmoji}>{item.emoji}</Text>
            <View style={styles.visionContent}>
              <Text style={styles.visionTitle}>{item.title}</Text>
              <Text style={styles.visionDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meet The Team</Text>
        {team.map((member) => (
          <View key={member.id} style={styles.teamMember}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{member.nickname.charAt(0)}</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>
                {member.name.split(' ')[0]} "{member.nickname}" {member.name.split(' ').slice(1).join(' ')}
              </Text>
              <Text style={styles.memberRole}>{member.role}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          LoudHouse Studios isn't just a name — it's a movement for the creators who refuse to be silenced.
        </Text>
        <Text style={styles.tagline}>🗣️ Music Speaks, LoudHouse Listens 👂</Text>
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
    padding: Theme.spacing.xl,
    alignItems: 'center',
  },
  heroTitle: {
    color: Theme.colors.text,
    fontSize: 32,
    fontWeight: '700',
  },
  heroSubtitle: {
    color: Theme.colors.textSecondary,
    fontSize: 16,
    marginTop: Theme.spacing.sm,
  },
  section: {
    padding: Theme.spacing.lg,
    paddingTop: 0,
  },
  paragraph: {
    color: Theme.colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    color: Theme.colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: Theme.colors.textMuted,
    fontSize: 14,
    marginBottom: Theme.spacing.lg,
  },
  visionItem: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.lg,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  visionEmoji: {
    fontSize: 28,
    marginRight: Theme.spacing.md,
  },
  visionContent: { flex: 1 },
  visionTitle: {
    color: Theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  visionDesc: {
    color: Theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
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
    marginRight: Theme.spacing.md,
  },
  avatarText: {
    color: Theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  memberInfo: { flex: 1 },
  memberName: {
    color: Theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  memberRole: {
    color: Theme.colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  footer: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    color: Theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
  },
  tagline: {
    color: Theme.colors.text,
    fontSize: 15,
    fontWeight: '500',
  },
});
