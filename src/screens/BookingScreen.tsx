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
import { BOOKING_ROOMS } from '../constants/data';
import { BookingRoom } from '../types';

const { width } = Dimensions.get('window');

const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
];

const DURATION_OPTIONS = [1, 2, 3, 4, 5, 6, 8];

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function generateDates() {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}

export const BookingScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [selectedRoom, setSelectedRoom] = useState<BookingRoom>(BOOKING_ROOMS[0]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(2);

  const dates = generateDates();

  const totalCost = selectedRoom.hourlyRate * selectedDuration;

  const handleBook = () => {
    if (!selectedTime) {
      Alert.alert('Select a Time', 'Please select a time slot to continue.');
      return;
    }
    Alert.alert(
      'Booking Request',
      `Room: ${selectedRoom.name}\nDate: ${selectedDate.toDateString()}\nTime: ${selectedTime}\nDuration: ${selectedDuration} hour(s)\nTotal: $${totalCost}\n\nWe'll confirm your booking within 24 hours!`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Request Booking', onPress: () => Alert.alert('Request Sent!', 'We\'ll be in touch shortly.') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={[Colors.backgroundSecondary, Colors.background]}
          style={[styles.header, { paddingTop: insets.top + 16 }]}
        >
          <Text style={styles.headerEyebrow}>PROFESSIONAL RECORDING</Text>
          <Text style={styles.headerTitle}>Book a Room</Text>
          <Text style={styles.headerSub}>Limited spots available — reserve yours today</Text>
          <View style={styles.headerBadge}>
            <Ionicons name="time" size={12} color={Colors.gold} />
            <Text style={styles.headerBadgeText}>Open Mon–Sat 10AM–11PM</Text>
          </View>
        </LinearGradient>

        {/* Room Selection */}
        <Text style={styles.sectionTitle}>Select Room</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.roomScroll}>
          {BOOKING_ROOMS.map((room) => (
            <TouchableOpacity
              key={room.id}
              style={[styles.roomCard, selectedRoom.id === room.id && styles.roomCardSelected]}
              onPress={() => setSelectedRoom(room)}
              activeOpacity={0.8}
            >
              {selectedRoom.id === room.id && (
                <View style={styles.roomSelectedDot}>
                  <Ionicons name="checkmark-circle" size={18} color={Colors.gold} />
                </View>
              )}
              <View style={[styles.roomIconWrap, selectedRoom.id === room.id && styles.roomIconWrapActive]}>
                <Ionicons
                  name="recording"
                  size={22}
                  color={selectedRoom.id === room.id ? Colors.gold : Colors.gray}
                />
              </View>
              <Text style={[styles.roomName, selectedRoom.id === room.id && styles.roomNameActive]}>
                {room.name}
              </Text>
              <Text style={styles.roomDesc} numberOfLines={2}>{room.description}</Text>
              <View style={styles.roomMeta}>
                <Ionicons name="people" size={12} color={Colors.gray} />
                <Text style={styles.roomMetaText}>Up to {room.capacity}</Text>
              </View>
              <Text style={[styles.roomRate, selectedRoom.id === room.id && { color: Colors.gold }]}>
                ${room.hourlyRate}<Text style={styles.roomRateUnit}>/hr</Text>
              </Text>
              <View style={styles.roomFeatures}>
                {room.features.slice(0, 3).map((feat) => (
                  <View key={feat} style={styles.roomFeatureChip}>
                    <Text style={styles.roomFeatureText}>{feat}</Text>
                  </View>
                ))}
                {room.features.length > 3 && (
                  <Text style={styles.roomMoreText}>+{room.features.length - 3} more</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Date Selection */}
        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScroll}>
          {dates.map((date, i) => {
            const isSelected = date.toDateString() === selectedDate.toDateString();
            const isToday = i === 0;
            return (
              <TouchableOpacity
                key={i}
                style={[styles.dateCard, isSelected && styles.dateCardSelected]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={[styles.dateDow, isSelected && styles.dateSelected]}>
                  {isToday ? 'TODAY' : DAYS[date.getDay()]}
                </Text>
                <Text style={[styles.dateNum, isSelected && styles.dateSelected]}>
                  {date.getDate()}
                </Text>
                {isSelected && <View style={styles.dateDot} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Duration Selection */}
        <Text style={styles.sectionTitle}>Session Duration</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.durationScroll}>
          {DURATION_OPTIONS.map((hours) => (
            <TouchableOpacity
              key={hours}
              style={[styles.durationChip, selectedDuration === hours && styles.durationChipActive]}
              onPress={() => setSelectedDuration(hours)}
            >
              <Text style={[styles.durationText, selectedDuration === hours && styles.durationTextActive]}>
                {hours}h
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Time Slot Selection */}
        <Text style={styles.sectionTitle}>Select Time</Text>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map((slot) => (
            <TouchableOpacity
              key={slot}
              style={[styles.timeSlot, selectedTime === slot && styles.timeSlotActive]}
              onPress={() => setSelectedTime(slot)}
            >
              <Text style={[styles.timeSlotText, selectedTime === slot && styles.timeSlotTextActive]}>
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Room Features */}
        <Text style={styles.sectionTitle}>Room Features</Text>
        <View style={styles.featuresCard}>
          {selectedRoom.features.map((feat) => (
            <View key={feat} style={styles.featureRow}>
              <View style={styles.featureCheck}>
                <Ionicons name="checkmark" size={14} color={Colors.background} />
              </View>
              <Text style={styles.featureText}>{feat}</Text>
            </View>
          ))}
        </View>

        {/* Policies */}
        <View style={styles.policiesCard}>
          <Text style={styles.policiesTitle}>Studio Policies</Text>
          {[
            'Full payment required at booking',
            '48-hour cancellation notice required',
            'Engineer available upon request (+$30/hr)',
            'Maximum 2 guests beyond room capacity',
            'No outside food or drinks in control room',
          ].map((policy) => (
            <View key={policy} style={styles.policyRow}>
              <Ionicons name="information-circle" size={14} color={Colors.gray} />
              <Text style={styles.policyText}>{policy}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.bottomBarLeft}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${totalCost}</Text>
          <Text style={styles.totalBreakdown}>{selectedDuration}hr × ${selectedRoom.hourlyRate}/hr</Text>
        </View>
        <TouchableOpacity style={styles.bookBtn} onPress={handleBook} activeOpacity={0.85}>
          <LinearGradient
            colors={[Colors.goldLight, Colors.goldDark]}
            style={styles.bookBtnGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.bookBtnText}>Request Booking</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.background} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 28,
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
    marginBottom: 6,
  },
  headerSub: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 12,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.accentGlow,
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  headerBadgeText: {
    fontSize: 11,
    color: Colors.gold,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  roomScroll: {
    paddingHorizontal: 20,
    gap: 12,
    paddingBottom: 4,
  },
  roomCard: {
    width: width * 0.7,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    position: 'relative',
  },
  roomCardSelected: {
    borderColor: Colors.gold,
    backgroundColor: Colors.accentGlow,
  },
  roomSelectedDot: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  roomIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  roomIconWrapActive: {
    backgroundColor: Colors.accentGlow,
  },
  roomName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 6,
  },
  roomNameActive: {
    color: Colors.goldLight,
  },
  roomDesc: {
    fontSize: 12,
    color: Colors.gray,
    lineHeight: 17,
    marginBottom: 10,
  },
  roomMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  roomMetaText: {
    fontSize: 11,
    color: Colors.gray,
  },
  roomRate: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: 12,
  },
  roomRateUnit: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.gray,
  },
  roomFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  roomFeatureChip: {
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  roomFeatureText: {
    fontSize: 10,
    color: Colors.grayLight,
  },
  roomMoreText: {
    fontSize: 10,
    color: Colors.gold,
    paddingVertical: 3,
  },
  dateScroll: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 4,
  },
  dateCard: {
    width: 56,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  dateCardSelected: {
    borderColor: Colors.gold,
    backgroundColor: Colors.accentGlow,
  },
  dateDow: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.gray,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  dateNum: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
  },
  dateSelected: {
    color: Colors.gold,
  },
  dateDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gold,
    marginTop: 4,
  },
  durationScroll: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 4,
  },
  durationChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    minWidth: 56,
    alignItems: 'center',
  },
  durationChipActive: {
    borderColor: Colors.gold,
    backgroundColor: Colors.accentGlow,
  },
  durationText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gray,
  },
  durationTextActive: {
    color: Colors.gold,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 8,
  },
  timeSlot: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    minWidth: (width - 72) / 3,
    alignItems: 'center',
  },
  timeSlotActive: {
    borderColor: Colors.gold,
    backgroundColor: Colors.accentGlow,
  },
  timeSlotText: {
    fontSize: 12,
    color: Colors.gray,
    fontWeight: '500',
  },
  timeSlotTextActive: {
    color: Colors.gold,
    fontWeight: '700',
  },
  featuresCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 13,
    color: Colors.offWhite,
  },
  policiesCard: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 10,
  },
  policiesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  policyText: {
    fontSize: 12,
    color: Colors.gray,
    flex: 1,
    lineHeight: 18,
  },
  bottomBar: {
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
  bottomBarLeft: {},
  totalLabel: {
    fontSize: 11,
    color: Colors.gray,
  },
  totalAmount: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.gold,
  },
  totalBreakdown: {
    fontSize: 11,
    color: Colors.grayDark,
  },
  bookBtn: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  bookBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 14,
    gap: 8,
  },
  bookBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.background,
    letterSpacing: 0.3,
  },
});
