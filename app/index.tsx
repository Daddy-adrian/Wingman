/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WELCOME SCREEN - APP ENTRY POINT & HOOK VIDEO
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * First screen users see when opening the app. Introduces Wingman's value
 * proposition and provides entry to the onboarding flow.
 * 
 * Current State: Static welcome screen with logo and buttons
 * Future State: Will include hook video showing social scenarios (PRD Phase 1)
 * 
 * User Flow:
 * 1. User opens app for first time
 * 2. Sees welcome message and logo
 * 3. Can choose: Get Started (signup) | Learn More (info) | Skip (dev only)
 * 
 * PRD Alignment: Phase 1 - Emotional Hook (Feature #1: Hook Video System)
 * Behavioral Goal: Pain validation → Hope injection → Signup motivation
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { IPhoneFrame } from '@/components/IPhoneFrame';
import { ThreeDButton } from '@/components/ui/ThreeDButton';
import { borderRadius, colors, spacing, typography } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function WelcomeVideo() {
  const router = useRouter();

  /**
   * Navigate to signup flow
   * Primary CTA - starts the user onboarding journey
   */
  const handleGetStarted = () => {
    router.push('/signup');
  };

  /**
   * Navigate to info/tutorial screen
   * Secondary action for users who want more context before committing
   * TODO: Create info screen explaining Wingman's approach and safety features
   */
  const handleLearnMore = () => {
    console.log('Learn More pressed');
    // TODO: Navigate to info/tutorial screen
    // router.push('/info');
  };

  /**
   * Dev shortcut to skip directly to pool screen
   * Bypasses authentication and onboarding for testing purposes
   * Should be removed or hidden in production build
   */
  const handleSkip = () => {
    router.push('/(tabs)/pool');
  };

  return (
    <IPhoneFrame backgroundColor={colors.background.app} statusBarStyle="dark-content">
      <View style={styles.container}>
        {/* 
          Header Section
          Displays app name and tagline
          Centers user focus on value proposition before any action
        */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Wingman</Text>
          <Text style={styles.subtitle}>
            Build confidence, make connections
          </Text>
        </View>

        {/* 
          Logo/Video Container
          Currently shows static logo
          TODO: Replace with hook video player showing social scenarios
          PRD: "Pain validation videos addressing specific social scenarios"
        */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/welcome_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* 
          Action Buttons
          Three-tier hierarchy: Primary (Get Started) → Secondary (Learn More) → Mini (Skip)
          Vertical stack with spacing between buttons
        */}
        <View style={styles.buttonContainer}>
          {/* Primary CTA - Most prominent button */}
          <ThreeDButton
            priority="primary"
            colorScheme="wingman"
            onPress={handleGetStarted}
          >
            Get Started
          </ThreeDButton>

          <View style={styles.buttonSpacer} />

          {/* Secondary CTA - For users wanting more info */}
          <ThreeDButton
            priority="secondary"
            colorScheme="wingman"
            onPress={handleLearnMore}
          >
            Learn More
          </ThreeDButton>

          <View style={styles.buttonSpacer} />

          {/* Dev shortcut - Should be removed/hidden in production */}
          <ThreeDButton
            priority="mini"
            colorScheme="wingman"
            onPress={handleSkip}
          >
            Skip to Pool
          </ThreeDButton>
        </View>
      </View>
    </IPhoneFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'space-between', // Header at top, logo in middle, buttons at bottom
  },
  header: {
    marginTop: spacing.xxxl,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.huge,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  logoContainer: {
    flex: 1, // Takes up available space between header and buttons
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  logo: {
    width: '100%',
    height: '100%',
    maxWidth: 400,
    maxHeight: 400,
  },
  buttonContainer: {
    marginBottom: spacing.xl,
  },
  buttonSpacer: {
    height: spacing.lg, // Consistent spacing between buttons
  },
});