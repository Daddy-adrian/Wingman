import { IPhoneFrame } from '@/components/IPhoneFrame';
import { ThreeDButton } from '@/components/ui/ThreeDButton';
import { borderRadius, colors, spacing, typography } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, Image } from 'react-native';

/**
 * WelcomeVideo Screen
 * Entry point of the app - introduces Wingman and provides navigation to signup flow
 * 
 * Navigation paths:
 * - "Get Started" → /signup (normal onboarding flow)
 * - "Learn More" → TODO: Info/tutorial screen
 * - "Skip to Pool" → /(tabs)/pool (dev shortcut for testing)
 */
export default function WelcomeVideo() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signup');
  };

  const handleLearnMore = () => {
    console.log('Learn More pressed');
    // TODO: Navigate to info/tutorial screen
    // router.push('/info');
  };

  const handleSkip = () => {
    router.push('/(tabs)/pool');
  };

  return (
    <IPhoneFrame backgroundColor={colors.background.app} statusBarStyle="dark-content">
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Wingman</Text>
          <Text style={styles.subtitle}>
            Build confidence, make connections
          </Text>
        </View>

        {/* Welcome Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/welcome_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <ThreeDButton
            priority="primary"
            colorScheme="wingman"
            onPress={handleGetStarted}
          >
            Get Started
          </ThreeDButton>

          <View style={styles.buttonSpacer} />

          <ThreeDButton
            priority="secondary"
            colorScheme="wingman"
            onPress={handleLearnMore}
          >
            Learn More
          </ThreeDButton>

          <View style={styles.buttonSpacer} />

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
    justifyContent: 'space-between',
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
    flex: 1,
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
    height: spacing.lg,
  },
});