import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IPhoneFrame } from '@/components/IPhoneFrame';
import { ThreeDButton } from '@/components/ui/ThreeDButton';
import { colors, spacing, typography } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const router = useRouter();

  const handleGoogleSignUp = () => {
    console.log('Google sign up');
    // TODO: Implement Google OAuth
    router.push('/profile-build-chat');
  };

  const handlePhoneSignUp = () => {
    console.log('Phone sign up');
    // TODO: Implement phone verification
    router.push('/profile-build-chat');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <IPhoneFrame backgroundColor={colors.background.app} statusBarStyle="dark-content">
      <View style={styles.container}>
        {/* Header with back button */}
        <View style={styles.header}>
          <Pressable 
            onPress={handleBack}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Join Wingman</Text>
          <View style={styles.backButton} />
        </View>

        {/* Main content - centered */}
        <View style={styles.mainContent}>
          {/* Main message */}
          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              wingman is here to help you approach, would you let him?
            </Text>
          </View>

          {/* Sign up buttons */}
          <View style={styles.buttonsContainer}>
            <ThreeDButton
              priority="primary"
              colorScheme="wingman"
              onPress={handleGoogleSignUp}
            >
              Continue with Google
            </ThreeDButton>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <ThreeDButton
              priority="secondary"
              colorScheme="wingman"
              onPress={handlePhoneSignUp}
            >
              Continue with Phone
            </ThreeDButton>
          </View>
        </View>

        {/* Terms and Privacy at bottom */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our{' '}
            <Text style={styles.footerLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.footerLink}>Privacy Policy</Text>
            . Wingman helps build confidence through practice - we keep your data safe!
          </Text>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: typography.fontSize.xxl,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  messageContainer: {
    marginBottom: spacing.huge,
  },
  message: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.loose,
    paddingHorizontal: spacing.lg,
  },
  buttonsContainer: {
    marginBottom: spacing.xxl,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray[400],
  },
  dividerText: {
    paddingHorizontal: spacing.lg,
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  footerText: {
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.normal,
  },
  footerLink: {
    textDecorationLine: 'underline',
  },
});