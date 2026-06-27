import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScreenContainer } from '../components/ScreenContainer';
import { AppHeader } from '../components/AppHeader';
import { GradientButton, SectionTitle, Tag } from '../components/ui';
import { colors, spacing, radius, typography, gradients } from '../theme/theme';
import { rooms } from '../data/rooms';
import { beats } from '../data/beats';
import { sections } from '../data/sections';
import { RootStackParamList, TabParamList } from '../navigation/types';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const featuredBeats = beats.slice(0, 5);

  return (
    <ScreenContainer>
      <AppHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Hero */}
        <LinearGradient
          colors={gradients.cosmic}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroOverlay}>
            <Tag label="Atlanta, GA" color={colors.white} />
            <Text style={styles.heroTitle}>Where Sound{'\n'}Takes Off</Text>
            <Text style={styles.heroSub}>
              Professional recording studio. Six rooms, infinite frequencies. Book a session or
              shop exclusive beats.
            </Text>
            <View style={styles.heroBtns}>
              <GradientButton
                label="Book a Room"
                gradient={['#0B0A1A', '#15132A']}
                onPress={() => navigation.navigate('Book')}
                style={{ flex: 1 }}
              />
              <GradientButton
                label="Shop Beats"
                gradient={gradients.aurora}
                onPress={() => navigation.navigate('Beats')}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </LinearGradient>

        {/* Rooms */}
        <View style={styles.section}>
          <SectionTitle
            title="Book a Room"
            action="See all"
            onAction={() => navigation.navigate('Book')}
          />
          <Text style={styles.sectionNote}>Limited spots available · named for the planets</Text>
          <FlatList
            data={rooms}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(r) => r.id}
            contentContainerStyle={{ gap: spacing.md, paddingTop: spacing.sm }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.navigate('RoomDetail', { room: item })}
                style={styles.roomCard}
              >
                <LinearGradient
                  colors={[item.color, item.accent]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.roomPlanet}
                >
                  <Text style={styles.roomGlyph}>{item.planet}</Text>
                </LinearGradient>
                <Text style={styles.roomName}>{item.name}</Text>
                <Text style={styles.roomTagline} numberOfLines={2}>
                  {item.tagline}
                </Text>
                <Text style={styles.roomPrice}>${item.pricePerHour}/hr</Text>
              </Pressable>
            )}
          />
        </View>

        {/* Featured beats */}
        <View style={styles.section}>
          <SectionTitle
            title="Fresh Beats"
            action="Marketplace"
            onAction={() => navigation.navigate('Beats')}
          />
          {featuredBeats.map((beat) => (
            <Pressable
              key={beat.id}
              onPress={() => navigation.navigate('BeatDetail', { beat })}
              style={styles.beatMini}
            >
              <LinearGradient
                colors={[beat.artworkColor, beat.artworkAccent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.beatMiniArt}
              >
                <Ionicons name="musical-notes" size={18} color={colors.white} />
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={styles.beatMiniTitle}>{beat.title}</Text>
                <Text style={styles.beatMiniSub}>
                  {beat.genre} · {beat.bpm} BPM
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>

        {/* Programs */}
        <View style={styles.section}>
          <SectionTitle title="Explore LoudHouse" />
          {sections.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => navigation.navigate('SectionDetail', { section: s })}
              style={styles.programCard}
            >
              <LinearGradient
                colors={s.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.programIcon}
              >
                <Ionicons name={s.icon as any} size={22} color={colors.white} />
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={styles.programTitle}>{s.title}</Text>
                <Text style={styles.programSub} numberOfLines={1}>
                  {s.subtitle}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>

        {/* Events banner */}
        <Pressable style={styles.section} onPress={() => navigation.navigate('Events')}>
          <LinearGradient
            colors={gradients.sunset}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.eventsBanner}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.eventsTitle}>Upcoming Events</Text>
              <Text style={styles.eventsSub}>Frequency Check, workshops & open mics</Text>
            </View>
            <Ionicons name="calendar" size={28} color={colors.white} />
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  hero: {
    margin: spacing.lg,
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
  heroOverlay: { padding: spacing.xl, gap: spacing.md },
  heroTitle: { ...typography.hero, color: colors.white, fontSize: 36 },
  heroSub: { color: '#F0ECFF', fontSize: 14, lineHeight: 20 },
  heroBtns: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  sectionNote: { color: colors.textMuted, fontSize: 12, marginTop: -spacing.sm, marginBottom: 4 },
  roomCard: {
    width: 150,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 4,
  },
  roomPlanet: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  roomGlyph: { fontSize: 26, color: colors.white },
  roomName: { color: colors.text, fontWeight: '800', fontSize: 16 },
  roomTagline: { color: colors.textDim, fontSize: 12, minHeight: 32 },
  roomPrice: { color: colors.cyan, fontWeight: '700', marginTop: 4 },
  beatMini: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  beatMiniArt: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  beatMiniTitle: { color: colors.text, fontWeight: '700', fontSize: 15 },
  beatMiniSub: { color: colors.textMuted, fontSize: 12 },
  programCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  programIcon: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  programTitle: { color: colors.text, fontWeight: '700', fontSize: 15 },
  programSub: { color: colors.textMuted, fontSize: 12 },
  eventsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  eventsTitle: { color: colors.white, fontWeight: '800', fontSize: 18 },
  eventsSub: { color: '#FFF4FA', fontSize: 13, marginTop: 2 },
});
