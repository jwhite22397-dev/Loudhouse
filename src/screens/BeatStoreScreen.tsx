import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { BEATS, GENRES } from '../constants/data';
import { BeatCard } from '../components/BeatCard';
import { MiniPlayer } from '../components/MiniPlayer';
import { Beat } from '../types';

const { width } = Dimensions.get('window');

type ViewMode = 'grid' | 'list';
type SortMode = 'popular' | 'newest' | 'price-low' | 'price-high';

export const BeatStoreScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortMode, setSortMode] = useState<SortMode>('popular');
  const [playingBeatId, setPlayingBeatId] = useState<string | null>(null);
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);

  const filteredBeats = BEATS
    .filter((beat) => {
      const matchesSearch =
        beat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beat.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beat.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesGenre = selectedGenre === 'All' || beat.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      switch (sortMode) {
        case 'popular': return b.plays - a.plays;
        case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'price-low': return a.price.basic - b.price.basic;
        case 'price-high': return b.price.basic - a.price.basic;
        default: return 0;
      }
    });

  const featuredBeats = BEATS.filter((b) => b.isFeatured);

  const handlePlay = useCallback((beat: Beat) => {
    if (playingBeatId === beat.id) {
      setPlayingBeatId(null);
    } else {
      setPlayingBeatId(beat.id);
      setCurrentBeat(beat);
    }
  }, [playingBeatId]);

  const handleBeatPress = useCallback((beat: Beat) => {
    navigation.navigate('BeatDetail', { beat });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + (currentBeat ? 130 : 80) }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        {/* Header */}
        <LinearGradient
          colors={[Colors.backgroundSecondary, Colors.background]}
          style={[styles.header, { paddingTop: insets.top + 16 }]}
        >
          <Text style={styles.headerEyebrow}>LOUDHOUSEMUSIC GROUP</Text>
          <Text style={styles.headerTitle}>Beat Store</Text>
          <Text style={styles.headerSub}>License beats from Atlanta's premier studio</Text>
        </LinearGradient>

        {/* Sticky Search + Filter Bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchInput}>
            <Ionicons name="search" size={16} color={Colors.gray} style={{ marginRight: 8 }} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search beats, genres, vibes..."
              placeholderTextColor={Colors.gray}
              style={styles.input}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={16} color={Colors.gray} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={[styles.viewBtn, viewMode === 'grid' && styles.viewBtnActive]}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            <Ionicons
              name={viewMode === 'grid' ? 'list' : 'grid'}
              size={18}
              color={viewMode === 'grid' ? Colors.gold : Colors.gray}
            />
          </TouchableOpacity>
        </View>

        {/* Featured */}
        {!searchQuery && selectedGenre === 'All' && (
          <>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Featured Beats</Text>
              <View style={styles.fireBadge}>
                <Ionicons name="flame" size={12} color={Colors.gold} />
                <Text style={styles.fireBadgeText}>HOT</Text>
              </View>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredScroll}
            >
              {featuredBeats.map((beat) => (
                <BeatCard
                  key={beat.id}
                  beat={beat}
                  onPress={() => handleBeatPress(beat)}
                  onPlay={() => handlePlay(beat)}
                  isPlaying={playingBeatId === beat.id}
                />
              ))}
            </ScrollView>
          </>
        )}

        {/* Genre Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreScroll}
        >
          {GENRES.map((genre) => (
            <TouchableOpacity
              key={genre}
              style={[styles.genreChip, selectedGenre === genre && styles.genreChipActive]}
              onPress={() => setSelectedGenre(genre)}
            >
              <Text style={[styles.genreText, selectedGenre === genre && styles.genreTextActive]}>
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sort Row */}
        <View style={styles.sortRow}>
          <Text style={styles.resultsCount}>{filteredBeats.length} beats</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {([
              { key: 'popular', label: 'Popular' },
              { key: 'newest', label: 'Newest' },
              { key: 'price-low', label: 'Price ↑' },
              { key: 'price-high', label: 'Price ↓' },
            ] as { key: SortMode; label: string }[]).map((s) => (
              <TouchableOpacity
                key={s.key}
                style={[styles.sortChip, sortMode === s.key && styles.sortChipActive]}
                onPress={() => setSortMode(s.key)}
              >
                <Text style={[styles.sortText, sortMode === s.key && styles.sortTextActive]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Beat Grid / List */}
        {viewMode === 'grid' ? (
          <View style={styles.grid}>
            {filteredBeats.map((beat) => (
              <BeatCard
                key={beat.id}
                beat={beat}
                onPress={() => handleBeatPress(beat)}
                onPlay={() => handlePlay(beat)}
                isPlaying={playingBeatId === beat.id}
              />
            ))}
          </View>
        ) : (
          <View style={styles.list}>
            {filteredBeats.map((beat) => (
              <BeatCard
                key={beat.id}
                beat={beat}
                onPress={() => handleBeatPress(beat)}
                onPlay={() => handlePlay(beat)}
                isPlaying={playingBeatId === beat.id}
                compact
              />
            ))}
          </View>
        )}

        {filteredBeats.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="musical-notes" size={48} color={Colors.grayDark} />
            <Text style={styles.emptyText}>No beats found</Text>
            <Text style={styles.emptySubtext}>Try a different search or genre</Text>
          </View>
        )}
      </ScrollView>

      {/* Mini Player */}
      {currentBeat && (
        <MiniPlayer
          beat={currentBeat}
          isPlaying={playingBeatId === currentBeat.id}
          onToggle={() => handlePlay(currentBeat)}
          onExpand={() => handleBeatPress(currentBeat)}
        />
      )}
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
  searchBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    gap: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  input: {
    flex: 1,
    color: Colors.white,
    fontSize: 14,
  },
  viewBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  viewBtnActive: {
    borderColor: Colors.gold,
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
  },
  fireBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentGlow,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 3,
  },
  fireBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.gold,
    letterSpacing: 1,
  },
  featuredScroll: {
    paddingHorizontal: 20,
    gap: 12,
    paddingBottom: 4,
  },
  genreScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  genreChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  genreChipActive: {
    backgroundColor: Colors.accentGlow,
    borderColor: Colors.gold,
  },
  genreText: {
    fontSize: 13,
    color: Colors.gray,
    fontWeight: '600',
  },
  genreTextActive: {
    color: Colors.gold,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 10,
  },
  resultsCount: {
    fontSize: 12,
    color: Colors.gray,
    minWidth: 55,
  },
  sortChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: Colors.card,
    marginRight: 6,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  sortChipActive: {
    borderColor: Colors.gold,
    backgroundColor: Colors.accentGlow,
  },
  sortText: {
    fontSize: 12,
    color: Colors.gray,
    fontWeight: '500',
  },
  sortTextActive: {
    color: Colors.gold,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 8,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.grayDark,
  },
  emptySubtext: {
    fontSize: 13,
    color: Colors.grayDark,
  },
});
