import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { Beat } from '../types';

interface MiniPlayerProps {
  beat: Beat;
  isPlaying: boolean;
  onToggle: () => void;
  onExpand: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  beat,
  isPlaying,
  onToggle,
  onExpand,
}) => {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(100)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.05, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [isPlaying]);

  return (
    <Animated.View
      style={[
        styles.container,
        { paddingBottom: insets.bottom > 0 ? 0 : 8, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <TouchableOpacity style={styles.inner} onPress={onExpand} activeOpacity={0.9}>
        <Animated.Image
          source={{ uri: beat.imageUrl }}
          style={[styles.image, isPlaying && { transform: [{ scale: pulseAnim }] }]}
        />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>{beat.title}</Text>
          <Text style={styles.meta}>{beat.genre} · {beat.bpm} BPM</Text>
        </View>
        <TouchableOpacity style={styles.playBtn} onPress={onToggle}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={22} color={Colors.background} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    left: 12,
    right: 12,
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
    zIndex: 100,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 2,
  },
  meta: {
    fontSize: 11,
    color: Colors.gray,
  },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});
