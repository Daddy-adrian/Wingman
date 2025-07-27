import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { IPhoneFrame } from '@/components/IPhoneFrame';
import { ThreeDButton } from '@/components/ui/ThreeDButton';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, borderRadius, shadows, layout } from '@/constants/theme';

export default function ProfileEditScreen() {
  const router = useRouter();

  const handleSave = () => {
    console.log('Save changes');
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const handleUpdatePhoto = () => {
    console.log('Update photo');
    // TODO: Implement image picker
  };

  const handleUpdateBasicInfo = () => {
    console.log('Update basic info');
    // TODO: Navigate to edit basic info
  };

  const handleUpdateAbout = () => {
    console.log('Update about');
    // TODO: Navigate to edit about
  };

  const handleUpdateInterests = () => {
    console.log('Update interests');
    // TODO: Navigate to edit interests
  };

  return (
    <IPhoneFrame backgroundColor={colors.background.app} statusBarStyle="dark-content">
      <View style={styles.container}>
        <ScreenHeader 
          title="My Profile"
          rizzProgress={1250}
          rizzMax={1500}
        />

        {/* Scrollable Content */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Photo Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Profile Photo</Text>
              <Pressable 
                style={styles.updateButton}
                onPress={handleUpdatePhoto}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </Pressable>
            </View>
            
            {/* Photo Placeholder */}
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoIcon}>📷</Text>
              <Text style={styles.photoText}>Tap to add photo</Text>
            </View>
          </View>

          {/* Basic Info Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Basic Info</Text>
              <Pressable 
                style={styles.updateButton}
                onPress={handleUpdateBasicInfo}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </Pressable>
            </View>
            
            <Text style={styles.basicInfoText}>Sarah, 26</Text>
          </View>

          {/* About Me Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <Pressable 
                style={styles.updateButton}
                onPress={handleUpdateAbout}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </Pressable>
            </View>
            
            <Text style={styles.aboutText}>
              Adventure seeker and coffee enthusiast ☕ Always up for trying new restaurants and exploring the city. Looking for someone who shares my love of spontaneous weekend trips and deep conversations over good food.
            </Text>
          </View>

          {/* Interests & Tags Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Interests & Tags</Text>
              <Pressable 
                style={styles.updateButton}
                onPress={handleUpdateInterests}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </Pressable>
            </View>
            
            <View style={styles.tagsContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Coffee lover ☕</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Travel lover ✈️</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Foodie 🍕</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Adventurous 🏔️</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <ThreeDButton
              priority="primary"
              colorScheme="wingman"
              onPress={handleSave}
            >
              Save All Changes ✨
            </ThreeDButton>

            <View style={{ height: spacing.md }} />

            <ThreeDButton
              priority="secondary"
              colorScheme="wingman"
              onPress={handleCancel}
            >
              Back Home
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: layout.screen.paddingHorizontal,
    paddingBottom: spacing.lg,
  },
  section: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: layout.screen.paddingVertical,
    marginBottom: layout.section.marginBottom,
    ...shadows.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.screen.paddingVertical,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  updateButton: {
    backgroundColor: colors.brand.tertiary,
    paddingHorizontal: layout.screen.paddingVertical,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    ...shadows.button3D.tertiary,
  },
  updateButtonText: {
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.sm,
  },
  photoPlaceholder: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoIcon: {
    fontSize: typography.fontSize.huge,
    marginBottom: spacing.sm,
  },
  photoText: {
    color: colors.text.tertiary,
    fontSize: typography.fontSize.base,
  },
  basicInfoText: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  aboutText: {
    fontSize: typography.fontSize.lg,
    lineHeight: typography.lineHeight.relaxed,
    color: colors.text.primary,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  tag: {
    backgroundColor: colors.brand.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  tagText: {
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.sm,
  },
  actionsContainer: {
    marginTop: spacing.sm,
    marginBottom: layout.screen.paddingVertical,
  },
});