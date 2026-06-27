import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import { EVENTS } from '../constants/data';
import { Event } from '../types';

const { width } = Dimensions.get('window');

const CATEGORY_ICONS: Record<Event['category'], keyof typeof Ionicons.glyphMap> = {
  showcase: 'mic',
  workshop: 'school',
  'open-mic': 'musical-notes',
  'date-night': 'heart',
  other: 'calendar',
};

const CATEGORY_COLORS: Record<Event['category'], string> = {
  showcase: Colors.gold,
  workshop: '#7CB9E8',
  'open-mic': '#98FB98',
  'date-night': '#FFB6C1',
  other: Colors.gray,
};

const FILTERS = ['All', 'Showcase', 'Workshop', 'Date Night'];

export const EventsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = EVENTS.filter((e) => {
    if (activeFilter === 'All') return true;
    const cat = activeFilter.toLowerCase().replace(' ', '-') as Event['category'];
    return e.category === cat;
  });

  const handleRSVP = (event: Event) => {
    Alert.alert(
      'RSVP / Purchase Tickets',
      `Event: ${event.title}\nDate: ${event.date} at ${event.time}\nPrice: ${event.price}\n\nTicket checkout coming soon!`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Get Tickets', onPress: () => Alert.alert('Coming soon!', 'Online ticketing will be available shortly.') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={[Colors.backgroundSecondary, Colors.background]}
          style={[styles.header, { paddingTop: insets.top + 16 }]}
        >
          <Text style={styles.headerEyebrow}>WHAT'S HAPPENING</Text>
          <Text style={styles.headerTitle}>Events</Text>
          <Text style={styles.headerSub}>Shows, workshops & experiences at LoudHouse</Text>
        </LinearGradient>

        {/* Frequency Check Banner */}
        <TouchableOpacity style={styles.showcaseBanner} activeOpacity={0.85}>
          <LinearGradient
            colors={[Colors.goldDark, Colors.gold]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.showcaseBannerGradient}
          >
            <View style={styles.showcaseLeft}>
              <Text style={styles.showcaseEyebrow}>MONTHLY SERIES</Text>
              <Text style={styles.showcaseTitle}>Frequency Check</Text>
              <Text style={styles.showcaseSub}>Atlanta's premier artist showcase & competition</Text>
              <View style={styles.showcaseTags}>
                <View style={styles.showcaseTag}><Text style={styles.showcaseTagText}>LIVE PERFORMANCE</Text></View>
                <View style={styles.showcaseTag}><Text style={styles.showcaseTagText}>PRIZES</Text></View>
                <View style={styles.showcaseTag}><Text style={styles.showcaseTagText}>CONTENT</Text></View>
              </View>
            </View>
            <View style={styles.showcaseIcon}>
              <Ionicons name="mic" size={48} color="rgba(0,0,0,0.3)" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Events List */}
        <View style={styles.eventsList}>
          {filtered.map((event) => {
            const color = CATEGORY_COLORS[event.category];
            const icon = CATEGORY_ICONS[event.category];
            return (
              <View key={event.id} style={styles.eventCard}>
                <View style={[styles.eventAccent, { backgroundColor: color }]} />
                <View style={styles.eventContent}>
                  <View style={styles.eventHeader}>
                    <View style={[styles.eventIconBadge, { backgroundColor: `${color}22` }]}>
                      <Ionicons name={icon} size={16} color={color} />
                    </View>
                    <View style={styles.eventMeta}>
                      <Text style={styles.eventDate}>{event.date}</Text>
                      <Text style={styles.eventTime}>{event.time}</Text>
                    </View>
                    <View style={[styles.categoryTag, { backgroundColor: `${color}22`, borderColor: color }]}>
                      <Text style={[styles.categoryTagText, { color }]}>
                        {event.category.replace('-', ' ').toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.locationRow}>
                    <Ionicons name="location" size={12} color={Colors.gray} />
                    <Text style={styles.locationText}>{event.location}</Text>
                  </View>
                  <Text style={styles.eventDesc} numberOfLines={3}>{event.description}</Text>

                  <View style={styles.eventFooter}>
                    <View style={styles.priceTag}>
                      <Ionicons name="ticket" size={14} color={Colors.gold} />
                      <Text style={styles.priceText}>{event.price}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.rsvpBtn}
                      onPress={() => handleRSVP(event)}
                      activeOpacity={0.85}
                    >
                      <LinearGradient
                        colors={[Colors.goldLight, Colors.goldDark]}
                        style={styles.rsvpBtnGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      >
                        <Text style={styles.rsvpBtnText}>Get Tickets</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Showcase Performer CTA */}
        <View style={styles.performerCta}>
          <Ionicons name="mic-outline" size={36} color={Colors.gold} style={{ marginBottom: 12 }} />
          <Text style={styles.performerCtaTitle}>Want to Perform?</Text>
          <Text style={styles.performerCtaSub}>
            Apply to showcase your talent at Frequency Check and compete for prizes, exposure, and industry connections.
          </Text>
          <TouchableOpacity
            style={styles.performerBtn}
            onPress={() => Alert.alert('Performer Application', 'Applications open soon! Follow @loudhousestudios for updates.')}
          >
            <Text style={styles.performerBtnText}>Apply to Perform</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    paddingBottom: 24,
  },
  headerEyebrow: {
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.gold,
    fontWeight: '600',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: 1,
  },
  headerSub: {
    fontSize: 13,
    color: Colors.gray,
    marginTop: 4,
  },
  showcaseBanner: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  showcaseBannerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  showcaseLeft: {
    flex: 1,
  },
  showcaseEyebrow: {
    fontSize: 9,
    letterSpacing: 2,
    color: 'rgba(0,0,0,0.6)',
    fontWeight: '700',
    marginBottom: 2,
  },
  showcaseTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.background,
    marginBottom: 4,
  },
  showcaseSub: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.7)',
    marginBottom: 10,
  },
  showcaseTags: {
    flexDirection: 'row',
    gap: 6,
  },
  showcaseTag: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  showcaseTagText: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.background,
    letterSpacing: 0.5,
  },
  showcaseIcon: {
    marginLeft: 16,
  },
  filterScroll: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  filterChipActive: {
    backgroundColor: Colors.accentGlow,
    borderColor: Colors.gold,
  },
  filterText: {
    fontSize: 13,
    color: Colors.gray,
    fontWeight: '600',
  },
  filterTextActive: {
    color: Colors.gold,
  },
  eventsList: {
    paddingHorizontal: 16,
    gap: 14,
  },
  eventCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  eventAccent: {
    width: 4,
  },
  eventContent: {
    flex: 1,
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  eventIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventMeta: {
    flex: 1,
  },
  eventDate: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  },
  eventTime: {
    fontSize: 11,
    color: Colors.gray,
  },
  categoryTag: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
  },
  categoryTagText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
    lineHeight: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 11,
    color: Colors.gray,
  },
  eventDesc: {
    fontSize: 12,
    color: Colors.grayLight,
    lineHeight: 18,
    marginBottom: 14,
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  priceText: {
    fontSize: 12,
    color: Colors.gold,
    fontWeight: '700',
  },
  rsvpBtn: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  rsvpBtnGradient: {
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  rsvpBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.background,
  },
  performerCta: {
    margin: 16,
    marginTop: 24,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  performerCtaTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: 8,
  },
  performerCtaSub: {
    fontSize: 13,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  performerBtn: {
    backgroundColor: Colors.accentGlow,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  performerBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.gold,
    letterSpacing: 0.5,
  },
});
