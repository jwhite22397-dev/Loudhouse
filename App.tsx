import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';

import { RootNavigator } from './src/navigation/RootNavigator';
import { CartProvider } from './src/context/CartContext';
import { PlayerProvider } from './src/context/PlayerContext';
import { colors } from './src/theme/theme';

const navTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.bg,
    card: colors.bgAlt,
    text: colors.text,
    border: colors.border,
    notification: colors.pink,
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PlayerProvider>
          <CartProvider>
            <NavigationContainer theme={navTheme}>
              <StatusBar style="light" />
              <RootNavigator />
            </NavigationContainer>
          </CartProvider>
        </PlayerProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
