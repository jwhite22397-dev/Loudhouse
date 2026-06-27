import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { AppHeader } from '../components/AppHeader';
import { colors, spacing, radius, typography } from '../theme/theme';
import { merch } from '../data/merch';
import { RootStackParamList } from '../navigation/types';

export const ShopScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer>
      <AppHeader />
      <FlatList
        data={merch}
        keyExtractor={(m) => m.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: spacing.md, paddingHorizontal: spacing.lg }}
        contentContainerStyle={{ paddingBottom: 140, gap: spacing.md }}
        ListHeaderComponent={
          <View style={styles.intro}>
            <Text style={styles.title}>Shop / Merch</Text>
            <Text style={styles.subtitle}>Rep the house. Cosmic fits, accessories & more.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('MerchDetail', { item })}
          >
            <LinearGradient
              colors={[item.color, item.accent + '55']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.image}
            >
              <Ionicons name="shirt-outline" size={48} color={item.accent} />
              {item.badge ? (
                <View style={[styles.badge, { backgroundColor: item.accent }]}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              ) : null}
            </LinearGradient>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          </Pressable>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  intro: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.md },
  title: { ...typography.h1, color: colors.text },
  subtitle: { color: colors.textDim, fontSize: 14, marginTop: 6 },
  card: { flex: 1 },
  image: {
    height: 150,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  badgeText: { color: colors.bg, fontWeight: '800', fontSize: 10 },
  name: { color: colors.text, fontWeight: '700', fontSize: 14 },
  category: { color: colors.textMuted, fontSize: 12 },
  price: { color: colors.cyan, fontWeight: '800', fontSize: 15, marginTop: 2 },
});
