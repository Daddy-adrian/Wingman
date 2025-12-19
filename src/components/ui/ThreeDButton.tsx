import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

interface ThreeDButtonProps {
  children: string; // Text only for simplicity
  onPress?: () => void;
  priority: 'primary' | 'secondary' | 'tertiary' | 'mini';
  disabled?: boolean;
  colorScheme?: 'wingman' | 'porcelain';
  style?: ViewStyle;
}

/**
 * ThreeDButton - React Native Version
 * 
 * Platform button with 3D press effect using shadow and transform.
 * Automatically handles pressed state with visual feedback.
 * 
 * @example
 * <ThreeDButton 
 *   priority="primary" 
 *   colorScheme="wingman"
 *   onPress={() => console.log('Pressed')}
 * >
 *   Get Started
 * </ThreeDButton>
 */
export function ThreeDButton({ 
  children, 
  onPress, 
  priority, 
  disabled = false, 
  colorScheme = 'wingman',
  style
}: ThreeDButtonProps) {
  
  const getButtonColors = () => {
    if (colorScheme === 'porcelain') {
      switch (priority) {
        case 'primary':
          return {
            bg: '#E8984E',
            shadowColor: '#d67c34',
            text: '#FFFCF0',
            shadowHeight: 8
          };
        case 'secondary':
        case 'tertiary':
          return {
            bg: '#D18B7C',
            shadowColor: '#b36e5e',
            text: '#FFFCF0',
            shadowHeight: 6
          };
        case 'mini':
          return {
            bg: '#FFFCF0',
            shadowColor: '#ebe7dc',
            text: '#E8984E',
            shadowHeight: 4
          };
        default:
          return {
            bg: '#E8984E',
            shadowColor: '#d67c34',
            text: '#FFFCF0',
            shadowHeight: 8
          };
      }
    }
    
    // Wingman colors
    switch (priority) {
      case 'primary':
        return {
          bg: '#F4A261',
          shadowColor: '#d4845a',
          text: '#FFFFFF',
          shadowHeight: 8
        };
      case 'secondary':
        return {
          bg: '#FADA7A',
          shadowColor: '#f0c652',
          text: '#FFFFFF',
          shadowHeight: 6
        };
      case 'mini':
        return {
          bg: '#C6D870',
          shadowColor: '#a4b15c',
          text: '#FFFFFF',
          shadowHeight: 4
        };
      default:
        return {
          bg: '#F4A261',
          shadowColor: '#d4845a',
          text: '#FFFFFF',
          shadowHeight: 8
        };
    }
  };

  const colors = getButtonColors();

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.bg,
          opacity: disabled ? 0.5 : 1,
          // 3D shadow effect
          shadowColor: colors.shadowColor,
          shadowOffset: {
            width: 0,
            height: pressed ? 2 : colors.shadowHeight,
          },
          shadowOpacity: 1,
          shadowRadius: 0,
          // Press animation
          transform: [
            { translateY: pressed ? colors.shadowHeight - 2 : 0 }
          ],
        },
        style
      ]}
    >
      <Text style={[styles.text, { color: colors.text }]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});