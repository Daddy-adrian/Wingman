import { IPhoneFrame } from '@/components/IPhoneFrame';
import { ThreeDButton } from '@/components/ui/ThreeDButton';
import { borderRadius, colors, layout, sizes, spacing, typography } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface SafetyCenterScreenProps {
  onBackToHome?: () => void;
}

export default function SafetyCenterScreen({ onBackToHome }: SafetyCenterScreenProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      router.back();
    }
  };

  const handleEmergencyTools = () => {
    console.log('Emergency Tools');
    // TODO: Navigate to emergency tools
  };

  const handleSafetyGuidelines = () => {
    console.log('Safety Guidelines');
    // TODO: Navigate to safety guidelines
  };

  const handleReportIssues = () => {
    console.log('Report Issues');
    // TODO: Navigate to report issues
  };

  return (
    <IPhoneFrame backgroundColor={colors.background.app} statusBarStyle="dark-content">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Safety Center</Text>
        </View>

        {/* Scrollable Content */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>🛡️</Text>
            </View>
            <Text style={styles.heroTitle}>Your Safety Matters</Text>
            <Text style={styles.heroDescription}>
              Access safety resources and emergency tools whenever you need them.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <ThreeDButton
              priority="primary"
              colorScheme="wingman"
              onPress={handleEmergencyTools}
            >
              Emergency Tools
            </ThreeDButton>

            <View style={{ height: spacing.lg }} />

            <ThreeDButton
              priority="secondary"
              colorScheme="wingman"
              onPress={handleSafetyGuidelines}
            >
              Safety Guidelines
            </ThreeDButton>

            <View style={{ height: spacing.lg }} />

            <ThreeDButton
              priority="secondary"
              colorScheme="wingman"
              onPress={handleReportIssues}
            >
              Report Issues
            </ThreeDButton>

            <View style={{ height: spacing.lg }} />

            <ThreeDButton
              priority="tertiary"
              colorScheme="wingman"
              onPress={handleBack}
            >
              Back to Home
            </ThreeDButton>
          </View>
        </ScrollView>
      </View>
    </IPhoneFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.app,
  },
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: layout.screen.paddingHorizontal,
    paddingBottom: spacing.xxxl,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  iconContainer: {
    width: sizes.avatar.large,
    height: sizes.avatar.large,
    backgroundColor: 'rgba(198, 216, 112, 0.1)', // brand.tertiary with 10% opacity
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconText: {
    fontSize: 40,
  },
  heroTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.normal,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
  actionsContainer: {
    marginTop: spacing.sm,
  },
});