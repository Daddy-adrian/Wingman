import {
      animations,
      borderRadius,
      shadows,
      sizes,
      typography,
      widgetColors
} from '@/constants/theme';
import React from 'react';
import { Animated, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

interface ThreeDWidgetProps {
  children: React.ReactNode;
  onPress?: () => void;
  type: 'safety' | 'settings' | 'profile' | 'special';
  colorScheme?: 'wingman' | 'porcelain';
  style?: ViewStyle;
}

export function ThreeDWidget({ 
  children, 
  onPress, 
  type,
  colorScheme = 'wingman',
  style
}: ThreeDWidgetProps) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: animations.widget.duration,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: animations.widget.duration,
      useNativeDriver: true,
    }).start();
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [animations.widget.translateNormal, animations.widget.translatePressed],
  });

  // Get widget colors based on scheme and type
  const getWidgetColors = () => {
    if (colorScheme === 'porcelain') {
      return {
        backgroundColor: widgetColors.porcelain.backgroundColor,
        backgroundHover: widgetColors.porcelain.backgroundHover,
      };
    }
    
    return widgetColors.wingman[type];
  };

  // Get widget shadows based on scheme and type
  const getWidgetShadows = () => {
    if (colorScheme === 'porcelain') {
      return shadows.widget3DPorcelain;
    }
    
    return shadows.widget3D[type];
  };

  const widgetColorConfig = getWidgetColors();
  const widgetShadows = getWidgetShadows();

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.widget,
          {
            backgroundColor: pressed 
              ? widgetColorConfig.backgroundHover 
              : widgetColorConfig.backgroundColor,
            ...(pressed ? widgetShadows.pressed : widgetShadows.normal),
          },
          colorScheme === 'porcelain' && styles.porcelainText,
          style,
        ]}
      >
        {typeof children === 'string' ? (
          <Text 
            style={[
              styles.widgetIcon,
              colorScheme === 'porcelain' && { color: widgetColors.porcelain.iconColor }
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  widget: {
    width: sizes.widget.width,
    height: sizes.widget.height,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  widgetIcon: {
    fontSize: typography.fontSize.xxl,
  },
  porcelainText: {
    // Additional porcelain-specific styles if needed
  },
});