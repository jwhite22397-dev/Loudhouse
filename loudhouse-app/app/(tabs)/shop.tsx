import { StyleSheet, ScrollView, View, Text, Pressable, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Theme from '@/constants/Theme';
import MerchCard from '@/components/MerchCard';
import { merchItems, SHOP_URL } from '@/data/merch';

export default function ShopScreen() {
  const handleMerchPress = (item: typeof merchItems[0]) => {
    Alert.alert(
      item.name,
      `${item.description}\n\nPrice: $${item.price.toFixed(2)}${item.preOrder ? '\n\nThis item is available for pre-order.' : ''}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Order on Website',
          onPress: () => WebBrowser.openBrowserAsync(SHOP_URL),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Shop / Merch</Text>
        <Text style={styles.heroSubtitle}>
          Rep LoudHouse with official studio merchandise. Premium quality, bold designs.
        </Text>
      </View>

      <View style={styles.grid}>
        {merchItems.map((item) => (
          <MerchCard
            key={item.id}
            item={item}
            onPress={() => handleMerchPress(item)}
          />
        ))}
      </View>

      <Pressable
        style={styles.shopAllButton}
        onPress={() => WebBrowser.openBrowserAsync(SHOP_URL)}
      >
        <Text style={styles.shopAllText}>View Full Store</Text>
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Shipping & Returns</Text>
        <Text style={styles.infoText}>
          All orders ship within 5-7 business days. Pre-order items ship when available.
          Contact us for returns or exchanges within 30 days of delivery.
        </Text>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  hero: {
    padding: Theme.spacing.lg,
  },
  heroTitle: {
    color: Theme.colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: Theme.spacing.sm,
  },
  heroSubtitle: {
    color: Theme.colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Theme.spacing.md,
  },
  shopAllButton: {
    marginHorizontal: Theme.spacing.lg,
    backgroundColor: Theme.colors.text,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    alignItems: 'center',
  },
  shopAllText: {
    color: Theme.colors.background,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
  info: {
    padding: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
  },
  infoTitle: {
    color: Theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Theme.spacing.sm,
  },
  infoText: {
    color: Theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  bottomPadding: { height: 100 },
});
