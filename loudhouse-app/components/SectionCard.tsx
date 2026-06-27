import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Theme from '@/constants/Theme';

interface SectionCardProps {
  title: string;
  subtitle?: string;
  description: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function SectionCard({ title, subtitle, description, onPress, icon }: SectionCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      {icon && (
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color={Theme.colors.text} />
        </View>
      )}
      <View style={styles.content}>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
        <View style={styles.ctaRow}>
          <Text style={styles.cta}>ENTER</Text>
          <Ionicons name="arrow-forward" size={16} color={Theme.colors.text} />
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
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  pressed: {
    opacity: 0.85,
    borderColor: Theme.colors.textMuted,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  subtitle: {
    color: Theme.colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    color: Theme.colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: Theme.spacing.sm,
  },
  description: {
    color: Theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: Theme.spacing.md,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cta: {
    color: Theme.colors.text,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 2,
  },
});
