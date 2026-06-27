import { useState, useMemo } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Theme from '@/constants/Theme';
import BeatCard from '@/components/BeatCard';
import FilterChips from '@/components/FilterChips';
import { beats, genres } from '@/data/beats';

export default function BeatsScreen() {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBeats = useMemo(() => {
    return beats.filter((beat) => {
      const matchesGenre = !selectedGenre || beat.genre === selectedGenre;
      const matchesSearch =
        !searchQuery ||
        beat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beat.producer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beat.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesGenre && matchesSearch;
    });
  }, [selectedGenre, searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color={Theme.colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search beats, producers, tags..."
          placeholderTextColor={Theme.colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Ionicons
            name="close-circle"
            size={18}
            color={Theme.colors.textMuted}
            onPress={() => setSearchQuery('')}
          />
        )}
      </View>

      <FilterChips
        options={genres}
        selected={selectedGenre}
        onSelect={setSelectedGenre}
      />

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.count}>{filteredBeats.length} beats</Text>
          <Text style={styles.subtitle}>Produced by LoudHouse engineers</Text>
        </View>

        {filteredBeats.map((beat) => (
          <BeatCard
            key={beat.id}
            beat={beat}
            onPress={() => router.push(`/beat/${beat.id}`)}
          />
        ))}

        {filteredBeats.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="musical-notes-outline" size={48} color={Theme.colors.textMuted} />
            <Text style={styles.emptyText}>No beats found</Text>
            <Text style={styles.emptySubtext}>Try a different search or genre</Text>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    margin: Theme.spacing.md,
    marginBottom: 0,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    gap: Theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: Theme.colors.text,
    fontSize: 15,
    paddingVertical: 12,
  },
  list: { flex: 1 },
  listContent: { padding: Theme.spacing.md },
  header: { marginBottom: Theme.spacing.md },
  count: {
    color: Theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: Theme.colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.xxl,
  },
  emptyText: {
    color: Theme.colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
    marginTop: Theme.spacing.md,
  },
  emptySubtext: {
    color: Theme.colors.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
  bottomPadding: { height: 80 },
});
