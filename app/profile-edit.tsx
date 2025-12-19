/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PROFILE EDIT SCREEN - USER PROFILE MANAGEMENT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Allows users to view and update their profile information.
 * Organized into sections: Photo, Basic Info, About Me, and Interests.
 * 
 * Current State: Display-only with mock data and placeholder edit functions
 * Each section has an "Update" button that will navigate to edit screens
 * 
 * Sections:
 * - Profile Photo: Image upload (placeholder)
 * - Basic Info: Name and age
 * - About Me: Bio text
 * - Interests & Tags: Interest categories with emojis
 * 
 * Actions:
 * - Update buttons per section (TODO: implement navigation to edit forms)
 * - Save All Changes (TODO: implement save to backend)
 * - Back Home (returns to previous screen)
 * 
 * PRD Alignment: Feature #14 - Authentication & Profile Management
 * ═══════════════════════════════════════════════════════════════════════════
 */

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

  /**
   * Save profile changes and return to previous screen
   * TODO: Implement API call to save changes to backend
   */
  const handleSave = () => {
    console.log('Save changes');
    router.back();
  };

  /**
   * Cancel editing and return without saving
   * Currently just navigates back (no unsaved changes warning)
   */
  const handleCancel = () => {
    router.back();
  };

  /**
   * Open image picker to update profile photo
   * TODO: Implement image picker integration (expo-image-picker)
   * TODO: Handle image upload and compression
   */
  const handleUpdatePhoto = () => {
    console.log('Update photo');
    // TODO: Implement image picker
  };

  /**
   * Navigate to basic info edit screen (name, age)
   * TODO: Create dedicated edit screen or modal
   */
  const handleUpdateBasicInfo = () => {
    console.log('Update basic info');
    // TODO: Navigate to edit basic info
  };

  /**
   * Navigate to about me edit screen (bio text)
   * TODO: Create text editor screen with character limit
   */
  const handleUpdateAbout = () => {
    console.log('Update about');
    // TODO: Navigate to edit about
  };

  /**
   * Navigate to interests selection screen
   * TODO: Create multi-select interest picker
   */
  const handleUpdateInterests = () => {
    console.log('Update interests');
    // TODO: Navigate to edit interests
  };

  return (
    <IPhoneFrame backgroundColor={colors.background.app} statusBarStyle="dark-content">
      <View style={styles.container}>
        {/* Header with title and rizz progress */}
        <ScreenHeader 
          title="My Profile"
          rizzProgress={1250}
          rizzMax={1500}
        />

        {/* Scrollable Content - All profile sections */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 
            Profile Photo Section
            Shows placeholder for photo upload
            "Update" button will open image picker
          */}
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
            
            {/* Photo placeholder - currently just emoji and text */}
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoIcon}>📷</Text>
              <Text style={styles.photoText}>Tap to add photo</Text>
            </View>
          </View>

          {/* 
            Basic Info Section
            Displays name and age
            Mock data: "Sarah, 26"
          */}
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

          {/* 
            About Me Section
            Bio text describing the user
            Mock data with personality description
          */}
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

          {/* 
            Interests & Tags Section
            Shows interest categories as colorful pills
            Each tag has an emoji for visual interest
          */}
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
            
            {/* Tags displayed in wrapped grid layout */}
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

          {/* 
            Action Buttons
            Save: Commits all changes and navigates back
            Back Home: Cancels without saving
          */}
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
    flexWrap: 'wrap', // Wraps to next line if tags don't fit
    gap: spacing.md,
  },
  tag: {
    backgroundColor: colors.brand.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full, // Pill shape
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