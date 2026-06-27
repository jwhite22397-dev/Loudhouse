import { StyleSheet, ScrollView, View, Text, Image, Pressable, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Theme from '@/constants/Theme';
import { beats } from '@/data/beats';
import { useAudio } from '@/context/AudioContext';
import { useState } from 'react';
import { LicenseType } from '@/data/beats';

export default function BeatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const beat = beats.find((b) => b.id === id);
  const { currentBeat, isPlaying, playBeat, togglePlayPause } = useAudio();
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>('basic');

  if (!beat) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Beat not found</Text>
      </View>
    );
  }

  const isCurrentBeat = currentBeat?.id === beat.id;
  const isCurrentlyPlaying = isCurrentBeat && isPlaying;
  const license = beat.licenses.find((l) => l.type === selectedLicense)!;

  const handlePlay = async () => {
    if (isCurrentBeat) {
      await togglePlayPause();
    } else {
      await playBeat(beat);
    }
  };

  const handlePurchase = () => {
    Alert.alert(
      'Purchase Beat',
      `You're about to purchase "${beat.title}" with a ${license.label} for $${license.price}.\n\nIn a production app, this would connect to Stripe or your payment processor.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue to Checkout', onPress: () => Alert.alert('Checkout', 'Payment integration coming soon!') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.artworkContainer}>
        <Image source={{ uri: beat.coverArt }} style={styles.artwork} />
        <Pressable style={styles.playButton} onPress={handlePlay}>
          <Ionicons
            name={isCurrentlyPlaying ? 'pause' : 'play'}
            size={36}
            color={Theme.colors.background}
          />
        </Pressable>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{beat.title}</Text>
        <Text style={styles.producer}>by {beat.producer}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>BPM</Text>
            <Text style={styles.metaValue}>{beat.bpm}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Key</Text>
            <Text style={styles.metaValue}>{beat.key}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Genre</Text>
            <Text style={styles.metaValue}>{beat.genre}</Text>
          </View>
        </View>

        <View style={styles.tags}>
          {beat.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Ionicons name="play" size={16} color={Theme.colors.textMuted} />
            <Text style={styles.statText}>{beat.plays.toLocaleString()} plays</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="heart" size={16} color={Theme.colors.textMuted} />
            <Text style={styles.statText}>{beat.likes.toLocaleString()} likes</Text>
          </View>
        </View>
      </View>

      <View style={styles.licenseSection}>
        <Text style={styles.sectionTitle}>Choose License</Text>
        {beat.licenses.map((lic) => (
          <Pressable
            key={lic.type}
            style={[
              styles.licenseCard,
              selectedLicense === lic.type && styles.licenseCardActive,
            ]}
            onPress={() => setSelectedLicense(lic.type)}
          >
            <View style={styles.licenseHeader}>
              <View style={styles.radioOuter}>
                {selectedLicense === lic.type && <View style={styles.radioInner} />}
              </View>
              <View style={styles.licenseInfo}>
                <Text style={styles.licenseLabel}>{lic.label}</Text>
                <Text style={styles.licenseDesc}>{lic.description}</Text>
              </View>
              <Text style={styles.licensePrice}>${lic.price}</Text>
            </View>
            <View style={styles.includes}>
              {lic.includes.map((item) => (
                <View key={item} style={styles.includeItem}>
                  <Ionicons name="checkmark" size={14} color={Theme.colors.success} />
                  <Text style={styles.includeText}>{item}</Text>
                </View>
              ))}
            </View>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.purchaseButton} onPress={handlePurchase}>
        <Text style={styles.purchaseText}>
          Buy {license.label} — ${license.price}
        </Text>
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
  artworkContainer: {
    position: 'relative',
    alignItems: 'center',
    padding: Theme.spacing.lg,
  },
  artwork: {
    width: 280,
    height: 280,
    borderRadius: Theme.borderRadius.lg,
    backgroundColor: Theme.colors.surfaceLight,
  },
  playButton: {
    position: 'absolute',
    bottom: Theme.spacing.xl,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Theme.colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    padding: Theme.spacing.lg,
    paddingTop: 0,
  },
  title: {
    color: Theme.colors.text,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  producer: {
    color: Theme.colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: Theme.spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Theme.spacing.xl,
    marginBottom: Theme.spacing.md,
  },
  metaItem: { alignItems: 'center' },
  metaLabel: {
    color: Theme.colors.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  metaValue: {
    color: Theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 2,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  tag: {
    backgroundColor: Theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.full,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  tagText: {
    color: Theme.colors.textSecondary,
    fontSize: 12,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Theme.spacing.lg,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    color: Theme.colors.textMuted,
    fontSize: 13,
  },
  licenseSection: {
    padding: Theme.spacing.lg,
    paddingTop: 0,
  },
  sectionTitle: {
    color: Theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: Theme.spacing.md,
  },
  licenseCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  licenseCardActive: {
    borderColor: Theme.colors.text,
  },
  licenseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Theme.colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.md,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Theme.colors.text,
  },
  licenseInfo: { flex: 1 },
  licenseLabel: {
    color: Theme.colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  licenseDesc: {
    color: Theme.colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  licensePrice: {
    color: Theme.colors.gold,
    fontSize: 18,
    fontWeight: '700',
  },
  includes: {
    marginTop: Theme.spacing.sm,
    marginLeft: 32,
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  includeText: {
    color: Theme.colors.textSecondary,
    fontSize: 12,
  },
  purchaseButton: {
    margin: Theme.spacing.lg,
    backgroundColor: Theme.colors.text,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    alignItems: 'center',
  },
  purchaseText: {
    color: Theme.colors.background,
    fontSize: 16,
    fontWeight: '700',
  },
  bottomPadding: { height: 100 },
});
