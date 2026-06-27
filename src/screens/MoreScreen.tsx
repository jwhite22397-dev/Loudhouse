import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';

const SOCIALS = [
  { icon: 'logo-instagram' as const, label: 'Instagram', handle: '@loudhousestudios', url: 'https://instagram.com/loudhousestudios' },
  { icon: 'logo-youtube' as const, label: 'YouTube', handle: 'LoudHouse Studios', url: 'https://youtube.com' },
  { icon: 'logo-tiktok' as const, label: 'TikTok', handle: '@loudhousestudios', url: 'https://tiktok.com' },
];

const MORE_SECTIONS = [
  {
    title: 'Song Submission',
    icon: 'cloud-upload' as const,
    description: 'Submit your music to LoudHouse Music Group for distribution, marketing, and label services.',
    action: 'Submit Music',
  },
  {
    title: 'LoudHouse Internship',
    icon: 'school' as const,
    description: 'Gain hands-on experience in music production, content creation, and studio operations.',
    action: 'Apply Now',
  },
  {
    title: 'Specials & Deals',
    icon: 'pricetag' as const,
    description: 'Check back for limited-time studio deals, bundle packages, and member-only offers.',
    action: 'View Specials',
  },
  {
    title: 'Merch & Shop',
    icon: 'shirt' as const,
    description: 'Rep LoudHouse Studios with official merchandise. Apparel, accessories, and more.',
    action: 'Shop Now',
  },
];

const SPECIALS = [
  {
    title: 'Early Bird Recording',
    desc: '4-hour studio session + engineer for $200. Mon–Wed before 2PM.',
    tag: 'LIMITED',
    savings: 'Save $100',
  },
  {
    title: 'Bundle: Record + Mix',
    desc: 'Full tracking session plus professional mix for one flat rate.',
    tag: 'BUNDLE',
    savings: 'Save $75',
  },
  {
    title: 'First-Timer Deal',
    desc: 'First-time clients get 1 hour free with a 3-hour booking.',
    tag: 'NEW CLIENTS',
    savings: '+1 FREE HR',
  },
];

export const MoreScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleAction = (title: string) => {
    Alert.alert(
      title,
      'This feature will direct you to the appropriate form or page. Coming soon in the full app!',
      [{ text: 'Got it', style: 'default' }]
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
          <Text style={styles.headerEyebrow}>LOUDHOUSE STUDIOS</Text>
          <Text style={styles.headerTitle}>More</Text>
          <Text style={styles.headerSub}>Submissions, programs, deals & connect</Text>
        </LinearGradient>

        {/* Specials */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Current Specials</Text>
          <View style={styles.flashBadge}>
            <Ionicons name="flash" size={12} color={Colors.gold} />
            <Text style={styles.flashText}>LIMITED TIME</Text>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.specialsScroll}>
          {SPECIALS.map((special) => (
            <View key={special.title} style={styles.specialCard}>
              <View style={styles.specialTopRow}>
                <View style={styles.specialTagWrap}>
                  <Text style={styles.specialTag}>{special.tag}</Text>
                </View>
                <Text style={styles.specialSavings}>{special.savings}</Text>
              </View>
              <Text style={styles.specialTitle}>{special.title}</Text>
              <Text style={styles.specialDesc}>{special.desc}</Text>
              <TouchableOpacity
                style={styles.specialBtn}
                onPress={() => handleAction(special.title)}
              >
                <Text style={styles.specialBtnText}>Learn More</Text>
                <Ionicons name="arrow-forward" size={12} color={Colors.gold} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* More Sections */}
        <Text style={styles.sectionTitle}>Studio Programs</Text>
        <View style={styles.programsList}>
          {MORE_SECTIONS.map((section) => (
            <TouchableOpacity
              key={section.title}
              style={styles.programCard}
              onPress={() =>
                setExpandedSection(expandedSection === section.title ? null : section.title)
              }
              activeOpacity={0.8}
            >
              <View style={styles.programHeader}>
                <View style={styles.programIconWrap}>
                  <Ionicons name={section.icon} size={20} color={Colors.gold} />
                </View>
                <Text style={styles.programTitle}>{section.title}</Text>
                <Ionicons
                  name={expandedSection === section.title ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={Colors.gray}
                />
              </View>
              {expandedSection === section.title && (
                <View style={styles.programExpanded}>
                  <Text style={styles.programDesc}>{section.description}</Text>
                  <TouchableOpacity
                    style={styles.programActionBtn}
                    onPress={() => handleAction(section.title)}
                  >
                    <LinearGradient
                      colors={[Colors.goldLight, Colors.goldDark]}
                      style={styles.programActionGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.programActionText}>{section.action}</Text>
                      <Ionicons name="arrow-forward" size={14} color={Colors.background} />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact */}
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactCard}>
          {[
            { icon: 'location' as const, label: 'Location', value: 'Atlanta, GA' },
            { icon: 'call' as const, label: 'Phone', value: 'Contact via social' },
            { icon: 'globe' as const, label: 'Website', value: 'loudhousestudios.com' },
          ].map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.contactRow}
              onPress={() => {
                if (item.label === 'Website') Linking.openURL('https://www.loudhousestudios.com');
              }}
            >
              <View style={styles.contactIcon}>
                <Ionicons name={item.icon} size={16} color={Colors.gold} />
              </View>
              <View>
                <Text style={styles.contactLabel}>{item.label}</Text>
                <Text style={styles.contactValue}>{item.value}</Text>
              </View>
              {item.label === 'Website' && (
                <Ionicons name="open-outline" size={14} color={Colors.gray} style={{ marginLeft: 'auto' }} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Socials */}
        <Text style={styles.sectionTitle}>Follow Us</Text>
        <View style={styles.socialsList}>
          {SOCIALS.map((social) => (
            <TouchableOpacity
              key={social.label}
              style={styles.socialCard}
              onPress={() => Linking.openURL(social.url)}
              activeOpacity={0.8}
            >
              <View style={styles.socialIcon}>
                <Ionicons name={social.icon} size={22} color={Colors.gold} />
              </View>
              <View style={styles.socialInfo}>
                <Text style={styles.socialLabel}>{social.label}</Text>
                <Text style={styles.socialHandle}>{social.handle}</Text>
              </View>
              <Ionicons name="open-outline" size={16} color={Colors.grayDark} />
            </TouchableOpacity>
          ))}
        </View>

        {/* LoudHouse Music Group */}
        <View style={styles.labelBanner}>
          <LinearGradient
            colors={['#1a1500', '#0a0a0a']}
            style={styles.labelBannerGradient}
          >
            <Text style={styles.labelBannerEye}>INDEPENDENT LABEL</Text>
            <Text style={styles.labelBannerTitle}>LoudHouse Music Group</Text>
            <Text style={styles.labelBannerSub}>
              Distribution · Marketing · A&R · Full-Service Artist Development
            </Text>
            <TouchableOpacity
              style={styles.labelBannerBtn}
              onPress={() => handleAction('LoudHouse Music Group')}
            >
              <Text style={styles.labelBannerBtnText}>Learn More About The Label</Text>
            </TouchableOpacity>
          </LinearGradient>
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
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  flashBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.accentGlow,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  flashText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.gold,
    letterSpacing: 1,
  },
  specialsScroll: {
    paddingHorizontal: 20,
    gap: 12,
    paddingBottom: 4,
  },
  specialCard: {
    width: 220,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  specialTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  specialTagWrap: {
    backgroundColor: Colors.accentGlow,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  specialTag: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.gold,
    letterSpacing: 1,
  },
  specialSavings: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.success,
  },
  specialTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 6,
  },
  specialDesc: {
    fontSize: 12,
    color: Colors.gray,
    lineHeight: 17,
    marginBottom: 14,
  },
  specialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  specialBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gold,
  },
  programsList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  programCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  programIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.accentGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  programTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
  programExpanded: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  programDesc: {
    fontSize: 13,
    color: Colors.grayLight,
    lineHeight: 19,
    marginBottom: 14,
  },
  programActionBtn: {
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  programActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    gap: 6,
  },
  programActionText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.background,
  },
  contactCard: {
    marginHorizontal: 16,
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: 'hidden',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.accentGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: {
    fontSize: 11,
    color: Colors.gray,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
  socialsList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  socialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  socialIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.accentGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialInfo: {
    flex: 1,
  },
  socialLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  socialHandle: {
    fontSize: 12,
    color: Colors.gray,
  },
  labelBanner: {
    margin: 16,
    marginTop: 24,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.goldDark,
  },
  labelBannerGradient: {
    padding: 24,
  },
  labelBannerEye: {
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.gold,
    fontWeight: '600',
    marginBottom: 6,
  },
  labelBannerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: 6,
  },
  labelBannerSub: {
    fontSize: 12,
    color: Colors.gray,
    lineHeight: 18,
    marginBottom: 18,
  },
  labelBannerBtn: {
    backgroundColor: Colors.accentGlow,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  labelBannerBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.gold,
  },
});
