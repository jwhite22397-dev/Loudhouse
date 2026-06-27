import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Colors } from '../constants/colors';
import { HomeScreen } from '../screens/HomeScreen';
import { BeatStoreScreen } from '../screens/BeatStoreScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { EventsScreen } from '../screens/EventsScreen';
import { MoreScreen } from '../screens/MoreScreen';
import { BeatDetailScreen } from '../screens/BeatDetailScreen';
import { RootStackParamList, TabParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: Colors.grayDark,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'BeatStore':
              iconName = focused ? 'headset' : 'headset-outline';
              break;
            case 'Book':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Events':
              iconName = focused ? 'mic' : 'mic-outline';
              break;
            case 'More':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }
          return (
            <View style={styles.tabIconWrap}>
              <Ionicons name={iconName} size={22} color={color} />
              {focused && <View style={styles.tabActiveDot} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="BeatStore" component={BeatStoreScreen} options={{ title: 'Beats' }} />
      <Tab.Screen name="Book" component={BookingScreen} options={{ title: 'Book' }} />
      <Tab.Screen name="Events" component={EventsScreen} options={{ title: 'Events' }} />
      <Tab.Screen name="More" component={MoreScreen} options={{ title: 'More' }} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: Colors.gold,
          background: Colors.background,
          card: Colors.backgroundSecondary,
          text: Colors.white,
          border: Colors.cardBorder,
          notification: Colors.gold,
        },
        fonts: {
          regular: { fontFamily: 'System', fontWeight: '400' },
          medium: { fontFamily: 'System', fontWeight: '500' },
          bold: { fontFamily: 'System', fontWeight: '700' },
          heavy: { fontFamily: 'System', fontWeight: '900' },
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="BeatDetail" component={BeatDetailScreen} options={{ animation: 'slide_from_bottom' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBar,
    borderTopWidth: 1,
    borderTopColor: Colors.tabBarBorder,
    height: 60,
    paddingBottom: 6,
    paddingTop: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  tabIconWrap: {
    alignItems: 'center',
  },
  tabActiveDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gold,
    marginTop: 2,
  },
});
