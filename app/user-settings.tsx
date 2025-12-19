import { IPhoneFrame } from '@/components/IPhoneFrame';
import { ThreeDButton } from '@/components/ui/ThreeDButton';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { borderRadius, colors, layout, shadows, spacing, typography } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';

interface SettingsScreenProps {
  onBackToHome?: () => void;
  onSafetyCenter?: () => void;
  onSettings?: () => void;
  onProfile?: () => void;
}

interface SettingsRowProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
  onPress?: () => void;
  showArrow?: boolean;
  isDestructive?: boolean;
}

function SettingsRow({ 
  title, 
  subtitle, 
  rightContent, 
  onPress, 
  showArrow = false, 
  isDestructive = false 
}: SettingsRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingsRow,
        pressed && styles.settingsRowPressed,
      ]}
      disabled={!onPress}
    >
      <View style={styles.settingsRowLeft}>
        <Text style={[styles.settingsRowTitle, isDestructive && styles.destructiveText]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.settingsRowSubtitle}>{subtitle}</Text>
        )}
      </View>
      <View style={styles.settingsRowRight}>
        {rightContent}
        {showArrow && (
          <Text style={styles.arrowIcon}>›</Text>
        )}
      </View>
    </Pressable>
  );
}

export default function SettingsScreen({ 
  onBackToHome, 
  onSafetyCenter, 
  onSettings, 
  onProfile 
}: SettingsScreenProps) {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [newMatches, setNewMatches] = useState(true);
  const [messages, setMessages] = useState(true);
  const [doNotApproach, setDoNotApproach] = useState(false);

  const handleBack = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      router.back();
    }
  };

  const handleUpdateSafewords = () => {
    console.log('Update safewords');
    // TODO: Navigate to safewords edit
  };

  return (
    <IPhoneFrame backgroundColor={colors.background.app} statusBarStyle="dark-content">
      <View style={styles.container}>
        <ScreenHeader 
          title="Settings"
          rizzProgress={1250}
          rizzMax={1500}
        />

        {/* Scrollable Content */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Account & Profile Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account & Profile</Text>
            
            <View style={styles.rowsContainer}>
              <SettingsRow
                title="Email"
                rightContent={<Text style={styles.valueText}>sarah@example.com</Text>}
                showArrow
                onPress={() => console.log('Edit email')}
              />
              <View style={styles.divider} />
              <SettingsRow
                title="Change Password"
                showArrow
                onPress={() => console.log('Change password')}
              />
            </View>
          </View>

          {/* Notifications Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            
            <View style={styles.rowsContainer}>
              <SettingsRow
                title="Push Notifications"
                rightContent={
                  <Switch
                    value={pushNotifications}
                    onValueChange={setPushNotifications}
                    trackColor={{ 
                      false: colors.gray[300], 
                      true: colors.brand.primary 
                    }}
                    thumbColor={colors.background.primary}
                  />
                }
              />
              <View style={styles.divider} />
              <SettingsRow
                title="New Matches"
                rightContent={
                  <Switch
                    value={newMatches}
                    onValueChange={setNewMatches}
                    trackColor={{ 
                      false: colors.gray[300], 
                      true: colors.brand.primary 
                    }}
                    thumbColor={colors.background.primary}
                  />
                }
              />
              <View style={styles.divider} />
              <SettingsRow
                title="Messages"
                rightContent={
                  <Switch
                    value={messages}
                    onValueChange={setMessages}
                    trackColor={{ 
                      false: colors.gray[300], 
                      true: colors.brand.primary 
                    }}
                    thumbColor={colors.background.primary}
                  />
                }
              />
            </View>
          </View>

          {/* Privacy Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacy</Text>
            
            <SettingsRow
              title="Do Not Approach Status"
              subtitle="Prevent others from approaching you"
              rightContent={
                <Switch
                  value={doNotApproach}
                  onValueChange={setDoNotApproach}
                  trackColor={{ 
                    false: colors.gray[300], 
                    true: colors.brand.primary 
                  }}
                  thumbColor={colors.background.primary}
                />
              }
            />
          </View>

          {/* Safety Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Safety</Text>
              <Pressable 
                style={styles.updateButton}
                onPress={handleUpdateSafewords}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </Pressable>
            </View>
            
            <View style={styles.safetyInfoContainer}>
              <View style={styles.safetyInfoItem}>
                <Text style={styles.safetyInfoLabel}>Good Safeword</Text>
                <Text style={styles.safetyInfoValue}>Current: sunshine</Text>
              </View>
              <View style={styles.safetyInfoItem}>
                <Text style={styles.safetyInfoLabel}>Bad Safeword</Text>
                <Text style={styles.safetyInfoValue}>Current: emergency</Text>
              </View>
              <View style={styles.safetyInfoItem}>
                <Text style={styles.safetyInfoLabel}>Emergency Contact</Text>
                <Text style={styles.safetyInfoValue}>Current: +1 (555) 123-4567</Text>
              </View>
            </View>
          </View>

          {/* App Preferences Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Preferences</Text>
            
            <View style={styles.rowsContainer}>
              <SettingsRow
                title="Language"
                rightContent={<Text style={styles.valueText}>English</Text>}
                showArrow
                onPress={() => console.log('Change language')}
              />
              <View style={styles.divider} />
              <SettingsRow
                title="Units"
                rightContent={<Text style={styles.valueText}>Miles</Text>}
                showArrow
                onPress={() => console.log('Change units')}
              />
            </View>
          </View>

          {/* Help & Support Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Help & Support</Text>
            
            <View style={styles.rowsContainer}>
              <SettingsRow
                title="Help Center"
                showArrow
                onPress={() => console.log('Help center')}
              />
              <View style={styles.divider} />
              <SettingsRow
                title="Send Feedback"
                showArrow
                onPress={() => console.log('Send feedback')}
              />
              <View style={styles.divider} />
              <SettingsRow
                title="Privacy Policy"
                showArrow
                onPress={() => console.log('Privacy policy')}
              />
              <View style={styles.divider} />
              <SettingsRow
                title="Terms of Service"
                showArrow
                onPress={() => console.log('Terms')}
              />
              <View style={styles.divider} />
              <SettingsRow
                title="Sign Out"
                showArrow
                onPress={() => console.log('Sign out')}
              />
              <View style={styles.divider} />
              <SettingsRow
                title="Delete Account"
                showArrow
                isDestructive
                onPress={() => console.log('Delete account')}
              />
            </View>
          </View>

          {/* Wingman Version Section */}
          <View style={styles.section}>
            <Text style={styles.versionTitle}>Wingman</Text>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>

          {/* Back Home Button */}
          <ThreeDButton
            priority="secondary"
            colorScheme="wingman"
            onPress={handleBack}
          >
            Back Home
          </ThreeDButton>

          <View style={{ height: spacing.xl }} />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: layout.screen.paddingHorizontal,
    paddingBottom: spacing.lg,
  },
  section: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xl,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  updateButton: {
    backgroundColor: colors.brand.tertiary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xl,
    ...shadows.button3D.tertiary,
  },
  updateButtonText: {
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.sm,
  },
  rowsContainer: {
    gap: 1,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  settingsRowPressed: {
    opacity: 0.6,
  },
  settingsRowLeft: {
    flex: 1,
  },
  settingsRowTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  settingsRowSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  settingsRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  valueText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  arrowIcon: {
    fontSize: typography.fontSize.lg,
    color: colors.gray[400],
  },
  destructiveText: {
    color: colors.error,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[100],
  },
  safetyInfoContainer: {
    gap: spacing.lg,
  },
  safetyInfoItem: {
    gap: spacing.xs,
  },
  safetyInfoLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  safetyInfoValue: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  versionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
  },
  versionText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});