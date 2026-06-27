import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { colors, gradients } from '../theme/theme';
import { StarField } from './StarField';

interface Props {
  children: React.ReactNode;
  edges?: Edge[];
  stars?: boolean;
}

export const ScreenContainer: React.FC<Props> = ({
  children,
  edges = ['top'],
  stars = true,
}) => (
  <View style={styles.root}>
    <StatusBar barStyle="light-content" />
    <LinearGradient colors={gradients.night} style={StyleSheet.absoluteFill} />
    {stars ? <StarField count={50} /> : null}
    <SafeAreaView style={styles.safe} edges={edges}>
      {children}
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  safe: { flex: 1 },
});
