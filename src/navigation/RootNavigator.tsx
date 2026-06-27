import React from 'react';
import { View, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootStackParamList, TabParamList } from './types';
import { colors } from '../theme/theme';
import { MiniPlayer } from '../components/MiniPlayer';

import { HomeScreen } from '../screens/HomeScreen';
import { BookScreen } from '../screens/BookScreen';
import { BeatsScreen } from '../screens/BeatsScreen';
import { ShopScreen } from '../screens/ShopScreen';
import { MoreScreen } from '../screens/MoreScreen';
import { RoomDetailScreen } from '../screens/RoomDetailScreen';
import { BeatDetailScreen } from '../screens/BeatDetailScreen';
import { SectionDetailScreen } from '../screens/SectionDetailScreen';
import { MerchDetailScreen } from '../screens/MerchDetailScreen';
import { EventsScreen } from '../screens/EventsScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { CartScreen } from '../screens/CartScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const iconFor: Record<keyof TabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ['home', 'home-outline'],
  Book: ['business', 'business-outline'],
  Beats: ['musical-notes', 'musical-notes-outline'],
  Shop: ['bag-handle', 'bag-handle-outline'],
  More: ['grid', 'grid-outline'],
};

const Tabs: React.FC = () => {
  const insets = useSafeAreaInsets();
  const tabBarHeight = 58 + insets.bottom;

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.cyan,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            backgroundColor: colors.bgAlt,
            borderTopColor: colors.border,
            height: tabBarHeight,
            paddingTop: 6,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          tabBarIcon: ({ focused, color, size }) => {
            const [active, inactive] = iconFor[route.name];
            return <Ionicons name={focused ? active : inactive} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Book" component={BookScreen} />
        <Tab.Screen name="Beats" component={BeatsScreen} />
        <Tab.Screen name="Shop" component={ShopScreen} />
        <Tab.Screen name="More" component={MoreScreen} />
      </Tab.Navigator>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: tabBarHeight + (Platform.OS === 'ios' ? 0 : 4),
        }}
        pointerEvents="box-none"
      >
        <MiniPlayer />
      </View>
    </View>
  );
};

export const RootNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
    <Stack.Screen name="Tabs" component={Tabs} />
    <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
    <Stack.Screen name="BeatDetail" component={BeatDetailScreen} />
    <Stack.Screen name="SectionDetail" component={SectionDetailScreen} />
    <Stack.Screen name="MerchDetail" component={MerchDetailScreen} />
    <Stack.Screen name="Events" component={EventsScreen} />
    <Stack.Screen name="Contact" component={ContactScreen} />
    <Stack.Group screenOptions={{ presentation: 'modal' }}>
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Group>
  </Stack.Navigator>
);
