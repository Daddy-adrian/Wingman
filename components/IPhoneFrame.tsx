import React from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, Platform, ViewStyle } from 'react-native';

interface IPhoneFrameProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content';
  showStatusBar?: boolean;
}

/**
 * IPhoneFrame Component
 * 
 * Wraps app content in an iPhone-styled container with:
 * - Safe area handling (notch, home indicator)
 * - Status bar configuration
 * - Proper iOS/Android adaptation
 * - Consistent background and borders
 * 
 * @example
 * <IPhoneFrame backgroundColor="#D6E8F5" statusBarStyle="dark-content">
 *   <YourScreenContent />
 * </IPhoneFrame>
 */
export function IPhoneFrame({ 
  children, 
  backgroundColor = '#FFFFFF',
  statusBarStyle = 'dark-content',
  showStatusBar = true
}: IPhoneFrameProps) {
  
  return (
    <>
      {/* Status Bar Configuration */}
      {showStatusBar && (
        <StatusBar 
          barStyle={statusBarStyle}
          backgroundColor={backgroundColor}
          translucent={Platform.OS === 'android'}
        />
      )}
      
      {/* Safe Area Container - Handles notch and home indicator */}
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        {/* Content Area */}
        <View style={styles.content}>
          {children}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Ensures content respects safe areas (notch, home indicator)
  },
  content: {
    flex: 1,
    // This is where your screen content lives
    // The parent SafeAreaView already handles padding for safe areas
  }
});

/**
 * USAGE EXAMPLES:
 * 
 * // Basic usage with default white background
 * <IPhoneFrame>
 *   <Text>Your content here</Text>
 * </IPhoneFrame>
 * 
 * // Custom background color (Wingman blue)
 * <IPhoneFrame backgroundColor="#D6E8F5">
 *   <HomeScreen />
 * </IPhoneFrame>
 * 
 * // Light status bar for dark backgrounds
 * <IPhoneFrame 
 *   backgroundColor="#1C1C1E" 
 *   statusBarStyle="light-content"
 * >
 *   <DarkModeScreen />
 * </IPhoneFrame>
 * 
 * // Hide status bar completely
 * <IPhoneFrame showStatusBar={false}>
 *   <FullScreenVideo />
 * </IPhoneFrame>
 */