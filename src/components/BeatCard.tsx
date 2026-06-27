import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import { Beat } from '../types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface BeatCardProps {
  beat: Beat;
  onPress: () => void;
  onPlay: () => void;
  isPlaying?: boolean;
  compact?: boolean;
}

function formatPlays(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export const BeatCard: React.FC<BeatCardProps> = ({
  beat,
  onPress,
  onPlay,
  isPlaying,
  compact,
}) => {
  if (compact) {
    return (
      <TouchableOpacity style={styles.compactCard} onPress={onPress} activeOpacity={0.8}>
        <Image source={{ uri: beat.imageUrl }} style={styles.compactImage} />
        <View style={styles.compactInfo}>
          <Text style={styles.compactTitle} numberOfLines={1}>{beat.title}</Text>
          <Text style={styles.compactMeta}>{beat.bpm} BPM · {beat.key}</Text>
          <View style={styles.compactBottom}>
            <Text style={styles.compactGenre}>{beat.genre}</Text>
            <Text style={styles.compactPrice}>${beat.price.basic}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.compactPlay} onPress={onPlay}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={18}
            color={Colors.background}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={[styles.card, { width: CARD_WIDTH }]} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: beat.imageUrl }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.85)']}
          style={styles.imageGradient}
        />
        {beat.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
        <TouchableOpacity style={styles.playButton} onPress={onPlay}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={22}
            color={Colors.background}
          />
        </TouchableOpacity>
        <View style={styles.imageBottom}>
          <Text style={styles.bpm}>{beat.bpm} BPM</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{beat.title}</Text>
        <Text style={styles.genre}>{beat.genre} · {beat.key}</Text>
        <View style={styles.bottom}>
          <Text style={styles.price}>${beat.price.basic}</Text>
          <View style={styles.stats}>
            <Ionicons name="play" size={10} color={Colors.gray} />
            <Text style={styles.stat}>{formatPlays(beat.plays)}</Text>
            <Ionicons name="heart" size={10} color={Colors.gray} style={{ marginLeft: 4 }} />
            <Text style={styles.stat}>{formatPlays(beat.likes)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.gold,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  newBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.background,
    letterSpacing: 1,
  },
  playButton: {
    position: 'absolute',
    bottom: 24,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBottom: {
    position: 'absolute',
    bottom: 6,
    left: 8,
  },
  bpm: {
    fontSize: 10,
    color: Colors.grayLight,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 2,
  },
  genre: {
    fontSize: 11,
    color: Colors.gray,
    marginBottom: 6,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.gold,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  stat: {
    fontSize: 10,
    color: Colors.gray,
  },
  // Compact styles
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  compactImage: {
    width: 52,
    height: 52,
    borderRadius: 8,
    marginRight: 12,
  },
  compactInfo: {
    flex: 1,
  },
  compactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 2,
  },
  compactMeta: {
    fontSize: 11,
    color: Colors.gray,
    marginBottom: 4,
  },
  compactBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  compactGenre: {
    fontSize: 10,
    color: Colors.gold,
    backgroundColor: Colors.accentGlow,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  compactPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.gold,
  },
  compactPlay: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
