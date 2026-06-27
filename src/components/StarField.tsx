import React, { useMemo } from 'react';
import { View, StyleSheet, DimensionValue } from 'react-native';
import { colors } from '../theme/theme';

interface Star {
  top: DimensionValue;
  left: DimensionValue;
  size: number;
  opacity: number;
}

interface Props {
  count?: number;
  seed?: number;
}

// Simple deterministic pseudo-random so stars don't jump on re-render.
const mulberry32 = (a: number) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export const StarField: React.FC<Props> = ({ count = 40, seed = 7 }) => {
  const stars = useMemo<Star[]>(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }).map(() => ({
      top: `${rand() * 100}%` as DimensionValue,
      left: `${rand() * 100}%` as DimensionValue,
      size: rand() > 0.85 ? 2.5 : 1.5,
      opacity: 0.25 + rand() * 0.6,
    }));
  }, [count, seed]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {stars.map((s, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            borderRadius: s.size,
            backgroundColor: colors.white,
            opacity: s.opacity,
          }}
        />
      ))}
    </View>
  );
};
