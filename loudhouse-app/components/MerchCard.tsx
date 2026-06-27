import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import Theme from '@/constants/Theme';
import { MerchItem } from '@/data/merch';

interface MerchCardProps {
  item: MerchItem;
  onPress?: () => void;
}

export default function MerchCard({ item, onPress }: MerchCardProps) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      {item.preOrder && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PRE-ORDER</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    overflow: 'hidden',
    margin: Theme.spacing.xs,
  },
  pressed: { opacity: 0.9 },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: Theme.colors.surfaceLight,
    resizeMode: 'contain',
    padding: Theme.spacing.md,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Theme.colors.text,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
  },
  badgeText: { color: Theme.colors.background, fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  info: { padding: Theme.spacing.md },
  name: { color: Theme.colors.text, fontSize: 14, fontWeight: '600', marginBottom: 4 },
  price: { color: Theme.colors.gold, fontSize: 16, fontWeight: '700' },
});
