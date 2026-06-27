import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { Beat, RootStackParamList } from '../types';

const { width, height } = Dimensions.get('window');

const LICENSE_TYPES = [
  {
    name: 'Basic',
    key: 'basic' as const,
    icon: 'musical-note' as const,
    color: Colors.gray,
    features: [
      'MP3 Format',
      'Up to 5,000 streams',
      'Non-profit use',
      'Must credit producer',
      'No live performance',
    ],
  },
  {
    name: 'Premium',
    key: 'premium' as const,
    icon: 'star' as const,
    color: Colors.gold,
    features: [
      'MP3 + WAV Format',
      'Up to 100,000 streams',
      'Unlimited distributions',
      'Must credit producer',
      'Live performance allowed',
    ],
  },
  {
    name: 'Exclusive',
    key: 'exclusive' as const,
    icon: 'diamond' as const,
    color: '#E8C870',
    features: [
      'All Stems Included',
      'Unlimited streams',
      'Full ownership rights',
      'No credit required',
      'Beat removed from store',
    ],
  },
];

type BeatDetailRouteProp = RouteProp<RootStackParamList, 'BeatDetail'>;

export const BeatDetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const route = useRoute<BeatDetailRouteProp>();
  const { beat } = route.params;

  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<'basic' | 'premium' | 'exclusive'>('premium');
  const [isLiked, setIsLiked] = useState(false);

  const handlePurchase = () => {
    Alert.alert(
      'Purchase Beat',
      `You're about to license "${beat.title}" (${selectedLicense.charAt(0).toUpperCase() + selectedLicense.slice(1)} License) for $${beat.price[selectedLicense]}.\n\nCheckout coming soon!`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Proceed', style: 'default' },
      ]
    );
  };

  const handleAddToCart = () => {
    Alert.alert('Added to Cart', `"${beat.title}" has been added to your cart.`);
  };

  const selectedLicenseInfo = LICENSE_TYPES.find((l) => l.key === selectedLicense)!;

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={[styles.backBtn, { top: insets.top + 12 }]}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color={Colors.white} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 120 }} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: beat.imageUrl }} style={styles.heroImage} />
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', Colors.background]}
            style={styles.heroGradient}
          />
          <View style={styles.heroOverlay}>
            <View style={styles.heroBadges}>
              <View style={styles.genreBadge}>
                <Text style={styles.genreBadgeText}>{beat.genre}</Text>
              </View>
              {beat.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>NEW</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Beat Info */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <View style={styles.titleLeft}>
              <Text style={styles.beatTitle}>{beat.title}</Text>
              <Text style={styles.producerName}>prod. by {beat.producer}</Text>
            </View>
            <TouchableOpacity onPress={() => setIsLiked(!isLiked)} style={styles.likeBtn}>
              <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={26}
                color={isLiked ? '#FF4444' : Colors.gray}
              />
            </TouchableOpacity>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            {[
              { icon: 'play' as const, value: beat.plays.toLocaleString(), label: 'plays' },
              { icon: 'heart' as const, value: beat.likes.toLocaleString(), label: 'likes' },
              { icon: 'speedometer' as const, value: `${beat.bpm}`, label: 'bpm' },
              { icon: 'musical-notes' as const, value: beat.key, label: 'key' },
            ].map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <Ionicons name={stat.icon} size={16} color={Colors.gold} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Tags */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsScroll}>
            {beat.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Audio Player */}
          <View style={styles.playerCard}>
            <View style={styles.playerHeader}>
              <Text style={styles.playerTitle}>{beat.title}</Text>
              <Text style={styles.playerDuration}>{beat.duration}</Text>
            </View>
            {/* Waveform placeholder */}
            <View style={styles.waveformContainer}>
              {Array.from({ length: 40 }).map((_, i) => {
                const h = Math.sin(i * 0.8) * 12 + Math.random() * 16 + 8;
                return (
                  <View
                    key={i}
                    style={[
                      styles.waveformBar,
                      {
                        height: h,
                        backgroundColor: i < 15 ? Colors.gold : Colors.grayDark,
                      },
                    ]}
                  />
                );
              })}
            </View>
            <View style={styles.playerControls}>
              <TouchableOpacity style={styles.skipBtn}>
                <Ionicons name="play-back" size={22} color={Colors.gray} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.playPauseBtn}
                onPress={() => setIsPlaying(!isPlaying)}
              >
                <LinearGradient
                  colors={[Colors.goldLight, Colors.goldDark]}
                  style={styles.playPauseBtnGradient}
                >
                  <Ionicons
                    name={isPlaying ? 'pause' : 'play'}
                    size={28}
                    color={Colors.background}
                  />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.skipBtn}>
                <Ionicons name="play-forward" size={22} color={Colors.gray} />
              </TouchableOpacity>
            </View>
          </View>

          {/* License Selection */}
          <Text style={styles.licenseHeading}>Choose Your License</Text>
          <View style={styles.licenseCards}>
            {LICENSE_TYPES.map((license) => (
              <TouchableOpacity
                key={license.key}
                style={[
                  styles.licenseCard,
                  selectedLicense === license.key && styles.licenseCardSelected,
                  license.key === 'premium' && styles.licenseCardPremium,
                ]}
                onPress={() => setSelectedLicense(license.key)}
                activeOpacity={0.8}
              >
                {license.key === 'premium' && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>POPULAR</Text>
                  </View>
                )}
                <View style={[styles.licenseIconCircle, { borderColor: license.color }]}>
                  <Ionicons name={license.icon} size={20} color={license.color} />
                </View>
                <Text style={[styles.licenseName, selectedLicense === license.key && { color: Colors.gold }]}>
                  {license.name}
                </Text>
                <Text style={styles.licensePrice}>${beat.price[license.key]}</Text>
                {license.features.map((feat) => (
                  <View key={feat} style={styles.featureRow}>
                    <Ionicons
                      name="checkmark-circle"
                      size={13}
                      color={selectedLicense === license.key ? Colors.gold : Colors.grayDark}
                    />
                    <Text style={[styles.featureText, selectedLicense === license.key && { color: Colors.grayLight }]}>
                      {feat}
                    </Text>
                  </View>
                ))}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Purchase Bar */}
      <View style={[styles.purchaseBar, { paddingBottom: insets.bottom + 10 }]}>
        <View style={styles.purchaseLeft}>
          <Text style={styles.purchaseLicenseLabel}>{selectedLicenseInfo.name} License</Text>
          <Text style={styles.purchasePrice}>${beat.price[selectedLicense]}</Text>
        </View>
        <View style={styles.purchaseButtons}>
          <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
            <Ionicons name="cart" size={20} color={Colors.gold} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyBtn} onPress={handlePurchase}>
            <LinearGradient
              colors={[Colors.goldLight, Colors.goldDark]}
              style={styles.buyBtnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buyBtnText}>Buy Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContainer: {
    width,
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
    height: 150,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 20,
  },
  heroBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  genreBadge: {
    backgroundColor: 'rgba(201,168,76,0.2)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  genreBadgeText: {
    fontSize: 11,
    color: Colors.gold,
    fontWeight: '700',
    letterSpacing: 1,
  },
  newBadge: {
    backgroundColor: Colors.gold,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  newBadgeText: {
    fontSize: 11,
    color: Colors.background,
    fontWeight: '800',
    letterSpacing: 1,
  },
  infoSection: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleLeft: {
    flex: 1,
  },
  beatTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  producerName: {
    fontSize: 14,
    color: Colors.gold,
    marginTop: 2,
  },
  likeBtn: {
    padding: 4,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.white,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tagsScroll: {
    marginBottom: 20,
  },
  tag: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  tagText: {
    fontSize: 12,
    color: Colors.gray,
  },
  playerCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  playerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  playerDuration: {
    fontSize: 12,
    color: Colors.gray,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    gap: 2,
    marginBottom: 16,
  },
  waveformBar: {
    flex: 1,
    borderRadius: 2,
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  skipBtn: {
    padding: 8,
  },
  playPauseBtn: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  playPauseBtnGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  licenseHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  licenseCards: {
    flexDirection: 'row',
    gap: 10,
  },
  licenseCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    position: 'relative',
  },
  licenseCardSelected: {
    borderColor: Colors.gold,
    backgroundColor: Colors.accentGlow,
  },
  licenseCardPremium: {
    borderColor: Colors.goldDark,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  popularBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.background,
    backgroundColor: Colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    letterSpacing: 1,
    overflow: 'hidden',
  },
  licenseIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  licenseName: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
  },
  licensePrice: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.gold,
    marginBottom: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 10,
    color: Colors.grayDark,
    flex: 1,
    lineHeight: 14,
  },
  purchaseBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.backgroundSecondary,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  purchaseLeft: {},
  purchaseLicenseLabel: {
    fontSize: 11,
    color: Colors.gray,
    marginBottom: 2,
  },
  purchasePrice: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.gold,
  },
  purchaseButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyBtn: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buyBtnGradient: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  buyBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.background,
    letterSpacing: 0.5,
  },
});
