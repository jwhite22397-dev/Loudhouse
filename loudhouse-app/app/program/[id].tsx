import { StyleSheet, ScrollView, View, Text, Pressable, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import Theme from '@/constants/Theme';
import { programs } from '@/data/programs';

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  mic: 'mic',
  upload: 'cloud-upload',
  heart: 'heart',
  school: 'school',
  tag: 'pricetag',
};

export default function ProgramDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const program = programs.find((p) => p.id === id);

  if (!program) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Program not found</Text>
      </View>
    );
  }

  const handleApply = () => {
    Alert.alert(
      program.title,
      'Ready to get started? You\'ll be redirected to complete your application on our website.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: () => WebBrowser.openBrowserAsync('https://www.loudhousestudios.com'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name={ICON_MAP[program.icon]} size={32} color={Theme.colors.text} />
        </View>
        <Text style={styles.subtitle}>{program.subtitle}</Text>
        <Text style={styles.title}>{program.title}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>{program.description}</Text>
      </View>

      {program.id === 'showcase' && (
        <View style={styles.details}>
          <Text style={styles.detailsTitle}>What to Expect</Text>
          {[
            'Live performance in front of industry professionals',
            'Chance to win studio time and prizes',
            'Professional content creation during your set',
            'Networking with other Atlanta artists',
          ].map((item) => (
            <View key={item} style={styles.detailItem}>
              <Ionicons name="checkmark-circle" size={18} color={Theme.colors.success} />
              <Text style={styles.detailText}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      {program.id === 'internship' && (
        <View style={styles.details}>
          <Text style={styles.detailsTitle}>Program Benefits</Text>
          {[
            'Hands-on studio experience',
            'Portfolio development',
            'Industry networking opportunities',
            'Mentorship from LoudHouse engineers',
          ].map((item) => (
            <View key={item} style={styles.detailItem}>
              <Ionicons name="checkmark-circle" size={18} color={Theme.colors.success} />
              <Text style={styles.detailText}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      {program.id === 'date-night' && (
        <View style={styles.details}>
          <Text style={styles.detailsTitle}>Package Includes</Text>
          {[
            '2-hour private studio session',
            'Professional producer guidance',
            'Create a custom song together',
            'Digital copy of your recording',
          ].map((item) => (
            <View key={item} style={styles.detailItem}>
              <Ionicons name="checkmark-circle" size={18} color={Theme.colors.success} />
              <Text style={styles.detailText}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      <Pressable style={styles.ctaButton} onPress={handleApply}>
        <Text style={styles.ctaText}>{program.cta}</Text>
        <Ionicons name="arrow-forward" size={18} color={Theme.colors.background} />
      </Pressable>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.background,
  },
  notFoundText: {
    color: Theme.colors.textSecondary,
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    padding: Theme.spacing.xl,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  subtitle: {
    color: Theme.colors.textMuted,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  title: {
    color: Theme.colors.text,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  content: {
    padding: Theme.spacing.lg,
    paddingTop: 0,
  },
  description: {
    color: Theme.colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  details: {
    padding: Theme.spacing.lg,
    paddingTop: 0,
  },
  detailsTitle: {
    color: Theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Theme.spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  detailText: {
    color: Theme.colors.textSecondary,
    fontSize: 14,
    flex: 1,
  },
  ctaButton: {
    margin: Theme.spacing.lg,
    backgroundColor: Theme.colors.text,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaText: {
    color: Theme.colors.background,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
  },
  bottomPadding: { height: 40 },
});
