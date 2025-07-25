// app/skip.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from '@/constants/theme';

export default function SkipScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the next screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,  // theme background
    padding: spacing.md,                 // theme spacing
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: fontSizes.large,           // theme font size
    color: colors.primary,                  // theme text color
  },
});
