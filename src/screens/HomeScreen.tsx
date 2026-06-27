import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const MENU_SECTIONS = [
  {
    id: 'showcase',
    title: 'Showcase',
    subtitle: 'Frequency Check – monthly artist competition',
    icon: 'mic' as const,
    color: '#C9A84C',
    screen: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
  },
  {
    id: 'submission',
    title: 'Song Submission',
    subtitle: 'Submit to LoudHouse Music Group label',
    icon: 'musical-notes' as const,
    color: '#8B6E3A',
    screen: 'More',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
  },
  {
    id: 'date-night',
    title: 'Date Night',
    subtitle: 'A one-of-a-kind music-making experience',
    icon: 'heart' as const,
    color: '#C9A84C',
    screen: 'Book',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
  },
  {
    id: 'internship',
    title: 'Internship',
    subtitle: 'Hands-on creative industry experience',
    icon: 'school' as const,
    color: '#8B6E3A',
    screen: 'More',
    imageUrl: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=800',
  },
  {
    id: 'beats',
    title: 'Beat Store',
    subtitle: 'Browse & license exclusive beats',
    icon: 'headset' as const,
    color: '#C9A84C',
    screen: 'BeatStore',
    imageUrl: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=800',
  },
  {
    id: 'specials',
    title: 'Specials',
    subtitle: 'Limited offers & exclusive deals',
    icon: 'pricetag' as const,
    color: '#8B6E3A',
    screen: 'More',
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800',
  },
];

const CLIENTS = [
  'Universal Music Group',
  'Atlantic Records',
  'BMG',
  'Empire Distribution',
  'LMNO Label',
  'HITCO Entertainment',
];

const PLANETS = ['mercury', 'venus', 'saturn', 'pluto', 'mars', 'jupiter'];

export const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const scrollY = useRef(new Animated.Value(0)).current;

  const heroOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const heroScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.1, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <Animated.View style={[styles.hero, { transform: [{ scale: heroScale }] }]}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=1200' }}
            style={styles.heroBg}
            imageStyle={{ opacity: 0.4 }}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(10,10,10,0.95)']}
              style={styles.heroGradient}
            >
              <Animated.View style={{ opacity: heroOpacity, paddingTop: insets.top + 20 }}>
                <Text style={styles.heroEyebrow}>ATLANTA, GA</Text>
                <Text style={styles.heroTitle}>LOUDHOUSE</Text>
                <Text style={styles.heroSubtitle}>STUDIOS</Text>
                <View style={styles.heroDivider} />
                <Text style={styles.heroPlanets}>{PLANETS.join('  ·  ')}</Text>
                <TouchableOpacity
                  style={styles.heroButton}
                  onPress={() => navigation.navigate('Book')}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[Colors.goldLight, Colors.goldDark]}
                    style={styles.heroButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.heroButtonText}>BOOK A ROOM</Text>
                    <Ionicons name="arrow-forward" size={16} color={Colors.background} />
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            </LinearGradient>
          </ImageBackground>
        </Animated.View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'Years Active', value: '5+' },
            { label: 'Artists Served', value: '500+' },
            { label: 'Tracks Recorded', value: '2K+' },
          ].map((stat) => (
            <View key={stat.label} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Services Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
        </View>
        <View style={styles.grid}>
          {MENU_SECTIONS.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={styles.gridItem}
              onPress={() => navigation.navigate(section.screen)}
              activeOpacity={0.85}
            >
              <ImageBackground
                source={{ uri: section.imageUrl }}
                style={styles.gridImage}
                imageStyle={{ borderRadius: 14, opacity: 0.5 }}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.88)']}
                  style={styles.gridGradient}
                >
                  <View style={styles.gridIconRow}>
                    <View style={[styles.gridIcon, { backgroundColor: Colors.accentGlow }]}>
                      <Ionicons name={section.icon} size={20} color={Colors.gold} />
                    </View>
                  </View>
                  <Text style={styles.gridTitle}>{section.title}</Text>
                  <Text style={styles.gridSub}>{section.subtitle}</Text>
                  <View style={styles.gridEnter}>
                    <Text style={styles.gridEnterText}>ENTER</Text>
                    <Ionicons name="arrow-forward" size={12} color={Colors.gold} />
                  </View>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>

        {/* Our Space */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our Space</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.spaceScroll}
        >
          {[
            'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=600',
            'https://images.unsplash.com/photo-1519508234439-4f23643125c1?w=600',
            'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600',
            'https://images.unsplash.com/photo-1571266028243-d220c6a7c9b3?w=600',
          ].map((uri, index) => (
            <ImageBackground
              key={index}
              source={{ uri }}
              style={styles.spaceImage}
              imageStyle={{ borderRadius: 14, opacity: 0.85 }}
            >
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.6)']}
                style={styles.spaceGradient}
              />
            </ImageBackground>
          ))}
        </ScrollView>

        {/* Our Clients */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our Clients</Text>
        </View>
        <View style={styles.clientsGrid}>
          {CLIENTS.map((client) => (
            <View key={client} style={styles.clientChip}>
              <Text style={styles.clientText}>{client}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.ctaBanner}
          onPress={() => navigation.navigate('BeatStore')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.goldDark, Colors.gold, Colors.goldLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <View>
              <Text style={styles.ctaTitle}>Beat Store Now Open</Text>
              <Text style={styles.ctaSub}>Browse exclusive beats from LoudHouse producers</Text>
            </View>
            <Ionicons name="headset" size={36} color={Colors.background} style={{ opacity: 0.8 }} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    width,
    height: height * 0.52,
  },
  heroBg: {
    flex: 1,
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 32,
  },
  heroEyebrow: {
    fontSize: 11,
    letterSpacing: 4,
    color: Colors.gold,
    fontWeight: '600',
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 52,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: 3,
    lineHeight: 56,
  },
  heroSubtitle: {
    fontSize: 52,
    fontWeight: '900',
    color: Colors.gold,
    letterSpacing: 3,
    lineHeight: 56,
    marginBottom: 12,
  },
  heroDivider: {
    width: 60,
    height: 2,
    backgroundColor: Colors.gold,
    marginBottom: 12,
  },
  heroPlanets: {
    fontSize: 10,
    color: Colors.gray,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 24,
  },
  heroButton: {
    alignSelf: 'flex-start',
    borderRadius: 30,
    overflow: 'hidden',
  },
  heroButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    gap: 8,
  },
  heroButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.background,
    letterSpacing: 1.5,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.gold,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.gray,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    gap: 10,
  },
  gridItem: {
    width: (width - 38) / 2,
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  gridImage: {
    flex: 1,
  },
  gridGradient: {
    flex: 1,
    padding: 12,
    justifyContent: 'flex-end',
  },
  gridIconRow: {
    marginBottom: 'auto',
  },
  gridIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 2,
  },
  gridSub: {
    fontSize: 10,
    color: Colors.grayLight,
    marginBottom: 8,
  },
  gridEnter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gridEnterText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.gold,
    letterSpacing: 1,
  },
  spaceScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  spaceImage: {
    width: 220,
    height: 160,
    borderRadius: 14,
    overflow: 'hidden',
  },
  spaceGradient: {
    flex: 1,
    borderRadius: 14,
  },
  clientsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 4,
  },
  clientChip: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  clientText: {
    fontSize: 12,
    color: Colors.grayLight,
    fontWeight: '500',
  },
  ctaBanner: {
    marginHorizontal: 16,
    marginTop: 28,
    borderRadius: 16,
    overflow: 'hidden',
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.background,
    marginBottom: 4,
  },
  ctaSub: {
    fontSize: 12,
    color: Colors.background,
    opacity: 0.8,
  },
});
