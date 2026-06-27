import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { GradientButton, Tag } from '../components/ui';
import { useCart } from '../context/CartContext';
import { colors, spacing, radius, typography, gradients } from '../theme/theme';
import { RootStackParamList } from '../navigation/types';

export const MerchDetailScreen: React.FC = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'MerchDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { addItem } = useCart();
  const item = params.item;
  const [size, setSize] = useState(item.sizes?.[0]);

  const addToCart = () => {
    addItem({
      id: `merch-${item.id}-${size ?? 'os'}`,
      title: item.name,
      subtitle: size ? `Size ${size}` : item.category,
      price: item.price,
      qty: 1,
      kind: 'merch',
      color: item.accent,
    });
    navigation.navigate('Cart');
  };

  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.topTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
        <LinearGradient
          colors={[item.color, item.accent + '55']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.image}
        >
          <Ionicons name="shirt-outline" size={90} color={item.accent} />
        </LinearGradient>

        <View style={styles.body}>
          {item.badge ? <Tag label={item.badge} color={item.accent} /> : null}
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>

          <Text style={styles.desc}>
            Premium quality {item.name.toLowerCase()} featuring the LoudHouse cosmic branding.
            Designed in Atlanta, made to last.
          </Text>

          {item.sizes && item.sizes.length > 1 ? (
            <>
              <Text style={styles.label}>Size</Text>
              <View style={styles.sizes}>
                {item.sizes.map((s) => (
                  <Pressable
                    key={s}
                    onPress={() => setSize(s)}
                    style={[styles.sizeChip, size === s && styles.sizeChipActive]}
                  >
                    <Text style={[styles.sizeText, size === s && styles.sizeTextActive]}>{s}</Text>
                  </Pressable>
                ))}
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>

      <LinearGradient colors={gradients.night} style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Price</Text>
          <Text style={styles.footerPrice}>${item.price.toFixed(2)}</Text>
        </View>
        <GradientButton label="Add to Cart" onPress={addToCart} style={{ flex: 1, marginLeft: spacing.lg }} />
      </LinearGradient>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  topTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center' },
  image: {
    height: 280,
    margin: spacing.lg,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { paddingHorizontal: spacing.lg, gap: 4 },
  name: { ...typography.h1, color: colors.text, marginTop: spacing.sm },
  category: { color: colors.textMuted, fontSize: 13 },
  price: { color: colors.cyan, fontWeight: '800', fontSize: 22, marginTop: 4 },
  desc: { color: colors.textDim, fontSize: 14, lineHeight: 21, marginTop: spacing.md },
  label: { color: colors.text, fontWeight: '700', fontSize: 15, marginTop: spacing.lg, marginBottom: spacing.sm },
  sizes: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  sizeChip: {
    minWidth: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  sizeChipActive: { borderColor: colors.primary, backgroundColor: colors.primary + '33' },
  sizeText: { color: colors.textDim, fontWeight: '700' },
  sizeTextActive: { color: colors.text },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerLabel: { color: colors.textMuted, fontSize: 12 },
  footerPrice: { color: colors.text, fontWeight: '800', fontSize: 22 },
});
