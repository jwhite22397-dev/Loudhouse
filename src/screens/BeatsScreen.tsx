import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { AppHeader } from '../components/AppHeader';
import { BeatRow } from '../components/BeatRow';
import { colors, spacing, radius, typography, gradients } from '../theme/theme';
import { beats, genres } from '../data/beats';
import { RootStackParamList } from '../navigation/types';

export const BeatsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return beats.filter((b) => {
      const matchGenre = genre === 'All' || b.genre === genre;
      const matchQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.producer.toLowerCase().includes(q) ||
        b.tags.some((t) => t.includes(q));
      return matchGenre && matchQuery;
    });
  }, [query, genre]);

  return (
    <ScreenContainer>
      <AppHeader />
      <FlatList
        data={filtered}
        keyExtractor={(b) => b.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, paddingHorizontal: spacing.lg }}
        ListHeaderComponent={
          <View>
            <LinearGradient
              colors={gradients.aurora}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.banner}
            >
              <Text style={styles.bannerTitle}>Beat Marketplace</Text>
              <Text style={styles.bannerSub}>
                License exclusive & lease beats from LoudHouse producers. Stream, then check out in
                seconds.
              </Text>
            </LinearGradient>

            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color={colors.textMuted} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search beats, producers, moods"
                placeholderTextColor={colors.textMuted}
                style={styles.searchInput}
              />
              {query ? (
                <Pressable onPress={() => setQuery('')} hitSlop={8}>
                  <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                </Pressable>
              ) : null}
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: spacing.sm, paddingVertical: spacing.sm }}
            >
              {genres.map((g) => (
                <Pressable
                  key={g}
                  onPress={() => setGenre(g)}
                  style={[styles.genreChip, genre === g && styles.genreChipActive]}
                >
                  <Text style={[styles.genreText, genre === g && styles.genreTextActive]}>{g}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <Text style={styles.count}>{filtered.length} beats</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        renderItem={({ item }) => (
          <BeatRow beat={item} onPress={() => navigation.navigate('BeatDetail', { beat: item })} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="planet-outline" size={40} color={colors.textMuted} />
            <Text style={styles.emptyText}>No beats found in this orbit.</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  banner: { borderRadius: radius.lg, padding: spacing.lg, marginTop: spacing.sm },
  bannerTitle: { ...typography.h2, color: colors.bg },
  bannerSub: { color: colors.bg, opacity: 0.8, fontSize: 13, marginTop: 4, lineHeight: 18 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  searchInput: { flex: 1, color: colors.text, paddingVertical: 12, fontSize: 14 },
  genreChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  genreChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  genreText: { color: colors.textDim, fontWeight: '600', fontSize: 13 },
  genreTextActive: { color: colors.white },
  count: { color: colors.textMuted, fontSize: 12, marginBottom: spacing.sm },
  empty: { alignItems: 'center', paddingVertical: spacing.xxxl, gap: spacing.md },
  emptyText: { color: colors.textMuted },
});
