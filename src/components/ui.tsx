import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, spacing, typography, gradients } from '../theme/theme';

export const Tag: React.FC<{ label: string; color?: string; style?: StyleProp<ViewStyle> }> = ({
  label,
  color = colors.primary,
  style,
}) => (
  <View
    style={[
      styles.tag,
      { borderColor: color + '66', backgroundColor: color + '1A' },
      style,
    ]}
  >
    <Text style={[styles.tagText, { color }]}>{label}</Text>
  </View>
);

interface GradientButtonProps {
  label: string;
  onPress?: () => void;
  gradient?: readonly [string, string, ...string[]];
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  small?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  label,
  onPress,
  gradient = gradients.cosmic,
  style,
  textStyle,
  small,
}) => (
  <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }, style]}>
    <LinearGradient
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.btn, small && styles.btnSmall]}
    >
      <Text style={[styles.btnText, small && { fontSize: 13 }, textStyle]}>{label}</Text>
    </LinearGradient>
  </Pressable>
);

export const OutlineButton: React.FC<{
  label: string;
  onPress?: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
}> = ({ label, onPress, color = colors.primary, style }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.outlineBtn,
      { borderColor: color, opacity: pressed ? 0.7 : 1 },
      style,
    ]}
  >
    <Text style={[styles.outlineBtnText, { color }]}>{label}</Text>
  </Pressable>
);

export const SectionTitle: React.FC<{ title: string; action?: string; onAction?: () => void }> = ({
  title,
  action,
  onAction,
}) => (
  <View style={styles.sectionTitleRow}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {action ? (
      <Pressable onPress={onAction} hitSlop={8}>
        <Text style={styles.sectionAction}>{action}</Text>
      </Pressable>
    ) : null}
  </View>
);

export const Card: React.FC<{ children: React.ReactNode; style?: StyleProp<ViewStyle> }> = ({
  children,
  style,
}) => <View style={[styles.card, style]}>{children}</View>;

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  tagText: { ...typography.tiny, textTransform: 'uppercase' },
  btn: {
    paddingVertical: 16,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSmall: { paddingVertical: 10, paddingHorizontal: spacing.lg },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  outlineBtn: {
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  outlineBtnText: { fontSize: 15, fontWeight: '700' },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: { ...typography.h2, color: colors.text },
  sectionAction: { color: colors.cyan, fontWeight: '600', fontSize: 14 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
});
