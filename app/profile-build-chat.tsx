/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PROFILE BUILD CHAT SCREEN - CONVERSATIONAL ONBOARDING
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Collects user profile data through a chat-style conversation with Wingman.
 * Makes form-filling feel like texting with a friend instead of a boring form.
 * 
 * Data Collected:
 * - Name (gets personalized compliment based on first letter)
 * - Age
 * - Interests/passions
 * 
 * Gamification:
 * - Earns "Rizz" points for each answer (+30, +35, +40)
 * - Animated badge shows points gained
 * - Progress bar in header fills up
 * 
 * Flow:
 * 1. Wingman asks question
 * 2. User types answer
 * 3. Shows rizz gain animation
 * 4. Moves to next question
 * 5. After all questions → navigates to pool screen
 * 
 * PRD Alignment: Phase 2 - Progressive Investment (Feature #3)
 * Behavioral Goal: Make profile building feel engaging, not like a chore
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Animated
} from 'react-native';
import { IPhoneFrame } from '@/components/IPhoneFrame';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors, spacing, typography, borderRadius, shadows, sizes } from '@/constants/theme';
import { useRouter } from 'expo-router';

/**
 * Chat Message Type
 * Represents a single message bubble in the conversation
 */
interface ChatMessage {
  id: number;
  sender: 'wingman' | 'user';
  text: string;
  timestamp: string;
}

export default function ProfileBuildChatScreen() {
  const router = useRouter();
  
  /**
   * Ref to scroll view - used to auto-scroll to bottom when new messages arrive
   */
  const scrollViewRef = useRef<ScrollView>(null);
  
  /**
   * Animation value for the floating "+X Rizz" badge
   * Controls fade out and upward movement
   */
  const rizzAnimation = useRef(new Animated.Value(0)).current;

  /**
   * Array of all chat messages (both Wingman and user)
   * Renders in chronological order
   */
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  /**
   * Current text in the input field
   */
  const [currentInput, setCurrentInput] = useState('');
  
  /**
   * Current question index (0 = name, 1 = age, 2 = interests)
   * Used to track conversation progress
   */
  const [currentStep, setCurrentStep] = useState(0);
  
  /**
   * Shows typing indicator (three dots) when Wingman is "thinking"
   */
  const [isTyping, setIsTyping] = useState(false);
  
  /**
   * Current rizz (XP) points - starts at 850, gains +30/+35/+40 per answer
   * Max is 1000 (shown in progress bar)
   */
  const [rizzProgress, setRizzProgress] = useState(850);
  
  /**
   * Controls visibility of the floating "+X Rizz" badge
   */
  const [showRizzGain, setShowRizzGain] = useState(false);
  
  /**
   * Amount of rizz gained (displayed in floating badge)
   */
  const [rizzGainAmount, setRizzGainAmount] = useState(0);
  
  /**
   * Stores collected profile data as key-value pairs
   * Keys: 'name', 'age', 'interests'
   */
  const [userProfile, setUserProfile] = useState<Record<string, string>>({});
  
  /**
   * Flag to prevent starting conversation multiple times
   */
  const [conversationStarted, setConversationStarted] = useState(false);

  /**
   * Maps first letter of name to a compliment
   * Used to personalize Wingman's messages (e.g., "nice to meet you gorgeous sarah!")
   */
  const complimentMap: Record<string, string> = {
    'A': 'Alluring', 'B': 'Breathtaking', 'C': 'Captivating', 'D': 'Dreamy',
    'E': 'Elegant', 'F': 'Fierce', 'G': 'Gorgeous', 'H': 'Hypnotic',
    'I': 'Irresistible', 'J': 'Juicy', 'K': 'Knockout', 'L': 'Luscious',
    'M': 'Magnetic', 'N': 'Naughty', 'O': 'Opulent', 'P': 'Provocative',
    'Q': 'Quixotic', 'R': 'Ravishing', 'S': 'Seductive', 'T': 'Tempting',
    'U': 'Unforgettable', 'V': 'Vibrant', 'W': 'Wicked', 'X': 'X-factor',
    'Y': 'Yummy', 'Z': 'Zesty'
  };

  /**
   * Get compliment based on first letter of name
   * Used to personalize Wingman's greeting
   * 
   * @param name - User's name
   * @returns Compliment word (defaults to "Gorgeous" if letter not found)
   */
  const getCompliment = (name: string): string => {
    const firstLetter = name.charAt(0).toUpperCase();
    return complimentMap[firstLetter] || 'Gorgeous';
  };

  /**
   * Defines the conversation flow with questions and personalization
   * Questions become more personalized after name is collected
   * 
   * @param userName - Optional user name for personalization (available after first question)
   * @returns Array of conversation steps with questions, data keys, and rizz rewards
   */
  const getChatFlow = (userName?: string) => [
    { wingmanMessage: "whats your name? 😊", responseKey: "name", rizzGain: 30 },
    {
      wingmanMessage: userName 
        ? `nice to meet you ${getCompliment(userName).toLowerCase()} ${userName}! 😍 how old r u good looking? 😘✨`
        : "how old r u good looking? 😘✨",
      responseKey: "age", 
      rizzGain: 35
    },
    {
      wingmanMessage: userName
        ? `alright ${userName}, what gets you excited? tell me your passions! 🔥`
        : "what gets you excited? tell me your passions! 🔥",
      responseKey: "interests",
      rizzGain: 40
    }
  ];

  /**
   * Auto-scroll to bottom when new messages arrive
   * Runs whenever messages array or typing indicator changes
   */
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isTyping]);

  /**
   * Start conversation automatically after 1 second delay
   * Only runs once when component mounts
   */
  useEffect(() => {
    if (!conversationStarted) {
      setTimeout(() => {
        startConversation();
      }, 1000);
    }
  }, [conversationStarted]);

  /**
   * Get current time formatted as "HH:MM AM/PM"
   * Used for message timestamps
   */
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  /**
   * Initiate the conversation by sending Wingman's first message
   * Sets conversationStarted flag to prevent multiple starts
   */
  const startConversation = () => {
    setConversationStarted(true);
    const flow = getChatFlow();
    addWingmanMessage(flow[0].wingmanMessage);
  };

  /**
   * Add a message from Wingman to the chat
   * Shows typing indicator, waits 1.5-2.5 seconds, then displays message
   * Simulates realistic typing delay
   * 
   * @param text - Message text to display
   */
  const addWingmanMessage = (text: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const newMessage: ChatMessage = {
        id: Date.now(),
        sender: 'wingman',
        text: text,
        timestamp: getCurrentTime()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  /**
   * Display the floating "+X Rizz" badge with animation
   * Badge moves upward and fades out over 2 seconds
   * 
   * @param amount - Rizz points gained (30, 35, or 40)
   */
  const showRizzGainEffect = (amount: number) => {
    setRizzGainAmount(amount);
    setShowRizzGain(true);
    
    // Reset animation and start
    rizzAnimation.setValue(0);
    Animated.timing(rizzAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    
    // Hide badge after animation completes
    setTimeout(() => {
      setShowRizzGain(false);
    }, 2000);
  };

  /**
   * Handle user sending a message
   * 1. Adds user message to chat
   * 2. Saves answer to profile data
   * 3. Awards rizz points
   * 4. Moves to next question OR completes profile
   */
  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    // Add user's message to chat
    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: currentInput,
      timestamp: getCurrentTime()
    };
    setMessages(prev => [...prev, userMessage]);

    // Save answer to profile
    const updatedProfile = {
      ...userProfile,
      [getChatFlow()[currentStep].responseKey]: currentInput
    };
    setUserProfile(updatedProfile);

    // Award rizz points and show animation
    const rizzGain = getChatFlow()[currentStep].rizzGain;
    setRizzProgress(prev => Math.min(prev + rizzGain, 1000));
    showRizzGainEffect(rizzGain);

    setCurrentInput('');

    // Move to next step or finish
    const nextStep = currentStep + 1;
    const userName = currentStep === 0 ? currentInput.trim() : updatedProfile.name;
    const chatFlow = getChatFlow(userName);
    
    if (nextStep < chatFlow.length) {
      // Ask next question
      setCurrentStep(nextStep);
      setTimeout(() => {
        addWingmanMessage(chatFlow[nextStep].wingmanMessage);
      }, 800);
    } else {
      // Profile complete - show final message and navigate to pool
      setTimeout(() => {
        const finalUserName = userName || 'gorgeous';
        addWingmanMessage(`you're all set ${finalUserName}! let's find your perfect match! 🎉✨`);
        setTimeout(() => {
          router.push('/(tabs)/pool');
        }, 3000);
      }, 1200);
    }
  };

  /**
   * Animation interpolations for floating rizz badge
   * Moves upward (-20px) and fades out over 2 seconds
   */
  const rizzTranslateY = rizzAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const rizzOpacity = rizzAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1, 0],
  });

  return (
    <IPhoneFrame backgroundColor={colors.background.app} statusBarStyle="dark-content">
      {/* 
        KeyboardAvoidingView pushes content up when keyboard appears
        Prevents keyboard from covering input field
      */}
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* 
          Floating Rizz Gain Badge
          Shows "+X Rizz! ⭐" when user sends an answer
          Animates upward and fades out
        */}
        {showRizzGain && (
          <Animated.View 
            style={[
              styles.rizzGainContainer,
              { opacity: rizzOpacity, transform: [{ translateY: rizzTranslateY }] }
            ]}
          >
            <View style={styles.rizzGainBadge}>
              <Text style={styles.rizzGainText}>+{rizzGainAmount} Rizz! ⭐</Text>
            </View>
          </Animated.View>
        )}

        {/* 
          Header with Rizz Progress Bar
          Shows current rizz level filling up as user answers questions
        */}
        <ScreenHeader 
          rizzProgress={rizzProgress}
          rizzMax={1000}
          showLogo={true}
          showWidgets={true}
        />

        {/* 
          Messages Container
          Scrollable list of chat messages
          Auto-scrolls to bottom when new messages arrive
        */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Render all messages */}
          {messages.map((message) => (
            <View key={message.id} style={styles.messageWrapper}>
              {message.sender === 'wingman' ? (
                /* Wingman message - left side with avatar and white bubble */
                <View style={styles.wingmanMessageContainer}>
                  <View style={styles.wingmanAvatar}>
                    <Text style={styles.wingmanAvatarText}>W</Text>
                  </View>
                  <View style={styles.wingmanBubble}>
                    <Text style={styles.wingmanLabel}>Wingman</Text>
                    <Text style={styles.wingmanText}>{message.text}</Text>
                    <Text style={styles.wingmanTimestamp}>{message.timestamp}</Text>
                  </View>
                </View>
              ) : (
                /* User message - right side with brand color bubble */
                <View style={styles.userMessageContainer}>
                  <View style={styles.userBubble}>
                    <Text style={styles.userText}>{message.text}</Text>
                    <Text style={styles.userTimestamp}>{message.timestamp}</Text>
                  </View>
                </View>
              )}
            </View>
          ))}
          
          {/* 
            Typing Indicator
            Shows three animated dots when Wingman is "typing"
          */}
          {isTyping && (
            <View style={styles.wingmanMessageContainer}>
              <View style={styles.wingmanAvatar}>
                <Text style={styles.wingmanAvatarText}>W</Text>
              </View>
              <View style={styles.wingmanBubble}>
                <Text style={styles.wingmanLabel}>Wingman</Text>
                <View style={styles.typingIndicator}>
                  <View style={styles.typingDot} />
                  <View style={styles.typingDot} />
                  <View style={styles.typingDot} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* 
          Input Field
          Shows only during active conversation (hidden after profile complete)
          Text input with send button
          Send button disabled when input is empty
        */}
        {conversationStarted && currentStep < getChatFlow().length && (
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                value={currentInput}
                onChangeText={setCurrentInput}
                onSubmitEditing={handleSendMessage}
                placeholder="Type response..."
                placeholderTextColor={colors.gray[400]}
                style={styles.input}
                autoFocus
                returnKeyType="send"
                blurOnSubmit={false}
              />
              <Pressable
                onPress={handleSendMessage}
                disabled={!currentInput.trim()}
                style={[styles.sendButton, !currentInput.trim() && styles.sendButtonDisabled]}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </Pressable>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </IPhoneFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.app,
  },
  rizzGainContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 50, // Appears above all other content
  },
  rizzGainBadge: {
    backgroundColor: colors.brand.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    ...shadows.lg,
  },
  rizzGainText: {
    color: colors.text.primary,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.base,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  messagesContent: {
    paddingBottom: spacing.lg,
  },
  messageWrapper: {
    marginBottom: spacing.lg,
  },
  wingmanMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    maxWidth: '75%', // Prevents bubbles from being too wide
  },
  wingmanAvatar: {
    width: sizes.avatar.small,
    height: sizes.avatar.small,
    borderRadius: sizes.avatar.small / 2,
    backgroundColor: colors.brand.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    marginTop: spacing.xs,
  },
  wingmanAvatarText: {
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.sm,
  },
  wingmanBubble: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    borderTopLeftRadius: spacing.xs, // Sharp corner where avatar is (iMessage style)
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...shadows.sm,
  },
  wingmanLabel: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.xs,
    marginBottom: spacing.xs,
  },
  wingmanText: {
    color: colors.text.primary,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,
  },
  wingmanTimestamp: {
    color: colors.gray[400],
    fontSize: typography.fontSize.xs,
    marginTop: spacing.sm,
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Aligns to right side
  },
  userBubble: {
    backgroundColor: colors.brand.primary,
    borderRadius: borderRadius.lg,
    borderTopRightRadius: spacing.xs, // Sharp corner on right (iMessage style)
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    maxWidth: '75%',
    ...shadows.sm,
  },
  userText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white for contrast
    fontSize: typography.fontSize.xs,
    marginTop: spacing.sm,
    textAlign: 'right',
  },
  typingIndicator: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray[400],
    // TODO: Add pulsing animation for more realistic typing effect
  },
  inputContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  inputWrapper: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.sm,
  },
  input: {
    flex: 1,
    color: colors.text.primary,
    fontSize: typography.fontSize.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: borderRadius.md,
  },
  sendButton: {
    backgroundColor: colors.brand.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  sendButtonDisabled: {
    opacity: 0.5, // Visual feedback that button is disabled
  },
  sendButtonText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
});