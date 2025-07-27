import { IPhoneFrame } from '@/components/IPhoneFrame';
import { ThreeDButton } from '@/components/ui/ThreeDButton';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { borderRadius, colors, shadows, spacing, typography } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

interface ProfileCard {
  id: number;
  name: string;
  age: number;
  hasCheckmark: boolean;
}

export default function PoolScreen() {
  const router = useRouter();
  const userName = 'gorgeous'; // TODO: Get from user state/context

  const [expandedProfile, setExpandedProfile] = useState<ProfileCard | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filterTags = [
    'blonde', 'brunette', 'redhead', 'dark hair',
    'light skin', 'dark skin', 'tanned',
    'short hair', 'long hair', 'curly hair',
    'blue eyes', 'brown eyes', 'green eyes',
    'tall', 'short', 'athletic', 'petite',
    'tattoos', 'glasses', 'beard', 'clean shaven'
  ];

  const profiles: ProfileCard[] = [
    { id: 1, name: "Alex", age: 24, hasCheckmark: true },
    { id: 2, name: "Sam", age: 26, hasCheckmark: true },
    { id: 3, name: "Jordan", age: 23, hasCheckmark: false },
    { id: 4, name: "Taylor", age: 25, hasCheckmark: true },
    { id: 5, name: "Casey", age: 27, hasCheckmark: false },
    { id: 6, name: "Riley", age: 22, hasCheckmark: true },
    { id: 7, name: "Avery", age: 28, hasCheckmark: true },
    { id: 8, name: "Morgan", age: 24, hasCheckmark: false },
    { id: 9, name: "Quinn", age: 26, hasCheckmark: true },
    { id: 10, name: "Blake", age: 25, hasCheckmark: true },
    { id: 11, name: "Jesse", age: 29, hasCheckmark: false },
    { id: 12, name: "Parker", age: 27, hasCheckmark: true }
  ];

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const handleProfileClick = (profile: ProfileCard) => {
    setExpandedProfile(profile);
  };

  const handleCloseExpanded = () => {
    setExpandedProfile(null);
  };

  const handleNudge = () => {
    console.log('Nudge sent to:', expandedProfile?.name);
    setExpandedProfile(null);
  };

  const handleIceBreaker = () => {
    console.log('Ice breaker game');
    setExpandedProfile(null);
  };

  const handlePractice = () => {
    console.log('Practice mode');
  };

  const renderProfileCard = ({ item }: { item: ProfileCard }) => (
    <Pressable
      style={styles.profileCard}
      onPress={() => handleProfileClick(item)}
    >
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage}>
          <Text style={styles.profileIcon}>👤</Text>
        </View>
        {item.hasCheckmark && (
          <View style={styles.checkmarkBadge}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{item.name}</Text>
        <Text style={styles.profileAge}>{item.age}</Text>
      </View>
    </Pressable>
  );

  return (
    <IPhoneFrame backgroundColor={colors.background.app} statusBarStyle="dark-content">
      <View style={styles.container}>
        <ScreenHeader 
          title={userName ? `hey there, ${userName}` : 'Wingman'}
          rizzProgress={850}
          rizzMax={1000}
        />

        {/* Narrow Search Section */}
        <View style={styles.searchContainer}>
          <Pressable
            style={styles.filterButton}
            onPress={handleToggleFilters}
          >
            <Text style={styles.filterButtonText}>
              🔍 narrow search {showFilters ? '▲' : '▼'}
            </Text>
          </Pressable>

          {showFilters && (
            <View style={styles.filterPanel}>
              <View style={styles.filterHeader}>
                <Text style={styles.filterHeaderText}>Filter by appearance:</Text>
                {selectedFilters.length > 0 && (
                  <Pressable onPress={clearFilters}>
                    <Text style={styles.clearButton}>clear all</Text>
                  </Pressable>
                )}
              </View>

              <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterTagsContainer}
              >
                {filterTags.map((tag) => (
                  <Pressable
                    key={tag}
                    style={[
                      styles.filterTag,
                      selectedFilters.includes(tag) && styles.filterTagSelected
                    ]}
                    onPress={() => handleFilterToggle(tag)}
                  >
                    <Text style={[
                      styles.filterTagText,
                      selectedFilters.includes(tag) && styles.filterTagTextSelected
                    ]}>
                      #{tag}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>

              {selectedFilters.length > 0 && (
                <Text style={styles.filterSummary}>
                  {selectedFilters.length} filter{selectedFilters.length !== 1 ? 's' : ''} selected: {selectedFilters.join(', ')}
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Profile Cards Grid */}
        <FlatList
          data={profiles}
          renderItem={renderProfileCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Practice Button */}
        <View style={styles.practiceButtonContainer}>
          <ThreeDButton
            priority="primary"
            colorScheme="wingman"
            onPress={handlePractice}
          >
            {userName ? `lets build together ${userName}` : 'Practice'}
          </ThreeDButton>
        </View>

        {/* Expanded Profile Modal */}
        <Modal
          visible={expandedProfile !== null}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCloseExpanded}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Pressable 
                style={styles.closeButton}
                onPress={handleCloseExpanded}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>

              {expandedProfile && (
                <>
                  <View style={styles.expandedProfileImage}>
                    <Text style={styles.expandedProfileIcon}>👤</Text>
                  </View>

                  <Text style={styles.expandedProfileName}>
                    {expandedProfile.name}, {expandedProfile.age}
                  </Text>

                  <Text style={styles.expandedProfileBio}>
                    This is where the profile bio and details would appear.
                  </Text>

                  <View style={styles.expandedActions}>
                    <ThreeDButton
                      priority="primary"
                      colorScheme="wingman"
                      onPress={handleNudge}
                    >
                      Send Nudge 💫
                    </ThreeDButton>

                    <View style={{ height: spacing.md }} />

                    <ThreeDButton
                      priority="secondary"
                      colorScheme="wingman"
                      onPress={handleIceBreaker}
                    >
                      Play Ice Breaker 🎮
                    </ThreeDButton>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </IPhoneFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.app,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  filterButton: {
    backgroundColor: colors.brand.tertiary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    alignSelf: 'flex-start',
    ...shadows.button3D.tertiary,
  },
  filterButtonText: {
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.sm,
  },
  filterPanel: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    ...shadows.sm,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  filterHeaderText: {
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    fontSize: typography.fontSize.sm,
  },
  clearButton: {
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.sm,
  },
  filterTagsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  filterTag: {
    backgroundColor: colors.brand.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.full,
    shadowColor: colors.brandShadows.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  filterTagSelected: {
    backgroundColor: colors.brand.primary,
    shadowColor: colors.brandShadows.primary,
  },
  filterTagText: {
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.sm,
  },
  filterTagTextSelected: {
    color: colors.text.inverse,
  },
  filterSummary: {
    marginTop: spacing.md,
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
  gridContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  profileCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    width: '31%',
    ...shadows.sm,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  profileImage: {
    aspectRatio: 1,
    backgroundColor: colors.gray[400],
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: typography.fontSize.huge,
  },
  checkmarkBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.brand.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.sm,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.xs,
  },
  profileAge: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
  practiceButtonContainer: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    padding: spacing.xl,
    minHeight: '60%',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: typography.fontSize.xl,
    color: colors.text.secondary,
  },
  expandedProfileImage: {
    width: 200,
    height: 200,
    backgroundColor: colors.gray[400],
    borderRadius: borderRadius.lg,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  expandedProfileIcon: {
    fontSize: 80,
  },
  expandedProfileName: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  expandedProfileBio: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: typography.lineHeight.normal,
  },
  expandedActions: {
    marginTop: 'auto',
  },
});