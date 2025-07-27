import { borderRadius, colors, layout, shadows, sizes, spacing, typography } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ThreeDWidget } from './ThreeDWidget';

interface ScreenHeaderProps {
  title?: string;
  rizzProgress: number;
  rizzMax: number;
  showLogo?: boolean;
  showWidgets?: boolean;
  userName?: string;
}

export function ScreenHeader({ 
  title,
  rizzProgress, 
  rizzMax,
  showLogo = true,
  showWidgets = true,
  userName
}: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {/* Title (optional) */}
      {title && (
        <Text style={styles.headerTitle}>{title}</Text>
      )}

      {/* Progress Bar with Logo */}
      <View style={styles.progressBar}>
        <View style={styles.progressInner}>
          <View style={styles.progressTrack}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(rizzProgress / rizzMax) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{rizzProgress} / {rizzMax} Rizz</Text>
          {showLogo ? (
            <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          ) : (
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>W</Text>
            </View>
          )}
        </View>
      </View>

      {/* Widget Icons */}
      {showWidgets && (
        <View style={styles.widgetsContainer}>
          <ThreeDWidget 
            type="safety"
            colorScheme="wingman"
            onPress={() => router.push('/safety-center')}
          >
            🚨
          </ThreeDWidget>
          <ThreeDWidget 
            type="settings"
            colorScheme="wingman"
            onPress={() => router.push('/user-settings')}
          >
            ⚙️
          </ThreeDWidget>
          <ThreeDWidget 
            type="profile"
            colorScheme="wingman"
            onPress={() => router.push('/profile-edit')}
          >
            👤
          </ThreeDWidget>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: layout.screen.paddingHorizontal,
    paddingTop: layout.screen.paddingVertical,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  progressLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  progressBar: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  progressInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    flex: 1,
    height: sizes.progressBar.height,
    backgroundColor: colors.gray[200],
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginRight: spacing.lg,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.brand.primary,
    borderRadius: borderRadius.full,
  },
  progressText: {
    color: colors.text.primary,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.base,
    marginRight: spacing.md,
  },
  avatarContainer: {
    width: sizes.avatar.medium,
    height: sizes.avatar.medium,
    borderRadius: sizes.avatar.medium / 2,
    backgroundColor: colors.brand.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.lg,
  },
  logoContainer: {
    width: sizes.avatar.medium,
    height: sizes.avatar.medium,
    borderRadius: sizes.avatar.medium / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: '150%',
    height: '150%',
  },
  widgetsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
  },
});