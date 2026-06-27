import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { AppHeader } from '../components/AppHeader';
import { Tag } from '../components/ui';
import { colors, spacing, radius, typography } from '../theme/theme';
import { rooms } from '../data/rooms';
import { RootStackParamList } from '../navigation/types';

export const BookScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer>
      <AppHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.intro}>
          <Text style={styles.title}>Book a Room</Text>
          <Text style={styles.subtitle}>
            Six rooms, each tuned to a different vibe and named for the planets. Pick your orbit.
          </Text>
        </View>

        {rooms.map((room) => (
          <Pressable
            key={room.id}
            style={styles.card}
            onPress={() => navigation.navigate('RoomDetail', { room })}
          >
            <LinearGradient
              colors={[room.color, room.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.planet}
            >
              <Text style={styles.glyph}>{room.planet}</Text>
            </LinearGradient>
            <View style={styles.cardBody}>
              <View style={styles.cardHead}>
                <Text style={styles.roomName}>{room.name}</Text>
                {room.available ? (
                  <Tag label="Available" color={colors.success} />
                ) : (
                  <Tag label="Booked" color={colors.danger} />
                )}
              </View>
              <Text style={styles.tagline}>{room.tagline}</Text>
              <Text style={styles.desc} numberOfLines={2}>
                {room.description}
              </Text>
              <Text style={styles.price}>
                ${room.pricePerHour}
                <Text style={styles.priceUnit}> / hour</Text>
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  intro: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.md },
  title: { ...typography.h1, color: colors.text },
  subtitle: { color: colors.textDim, fontSize: 14, marginTop: 6, lineHeight: 20 },
  card: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  planet: { width: 96, alignItems: 'center', justifyContent: 'center' },
  glyph: { fontSize: 40, color: colors.white },
  cardBody: { flex: 1, padding: spacing.md, gap: 4 },
  cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  roomName: { ...typography.h3, color: colors.text },
  tagline: { color: colors.cyan, fontSize: 12, fontWeight: '600' },
  desc: { color: colors.textDim, fontSize: 13, lineHeight: 18 },
  price: { color: colors.text, fontWeight: '800', fontSize: 18, marginTop: 4 },
  priceUnit: { color: colors.textMuted, fontWeight: '400', fontSize: 13 },
});
