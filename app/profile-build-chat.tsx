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

interface ChatMessage {
  id: number;
  sender: 'wingman' | 'user';
  text: string;
  timestamp: string;
}

export default function ProfileBuildChatScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const rizzAnimation = useRef(new Animated.Value(0)).current;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [rizzProgress, setRizzProgress] = useState(850);
  const [showRizzGain, setShowRizzGain] = useState(false);
  const [rizzGainAmount, setRizzGainAmount] = useState(0);
  const [userProfile, setUserProfile] = useState<Record<string, string>>({});
  const [conversationStarted, setConversationStarted] = useState(false);

  const complimentMap: Record<string, string> = {
    'A': 'Alluring', 'B': 'Breathtaking', 'C': 'Captivating', 'D': 'Dreamy',
    'E': 'Elegant', 'F': 'Fierce', 'G': 'Gorgeous', 'H': 'Hypnotic',
    'I': 'Irresistible', 'J': 'Juicy', 'K': 'Knockout', 'L': 'Luscious',
    'M': 'Magnetic', 'N': 'Naughty', 'O': 'Opulent', 'P': 'Provocative',
    'Q': 'Quixotic', 'R': 'Ravishing', 'S': 'Seductive', 'T': 'Tempting',
    'U': 'Unforgettable', 'V': 'Vibrant', 'W': 'Wicked', 'X': 'X-factor',
    'Y': 'Yummy', 'Z': 'Zesty'
  };

  const getCompliment = (name: string): string => {
    const firstLetter = name.charAt(0).toUpperCase();
    return complimentMap[firstLetter] || 'Gorgeous';
  };

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

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isTyping]);

  useEffect(() => {
    if (!conversationStarted) {
      setTimeout(() => {
        startConversation();
      }, 1000);
    }
  }, [conversationStarted]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const startConversation = () => {
    setConversationStarted(true);
    const flow = getChatFlow();
    addWingmanMessage(flow[0].wingmanMessage);
  };

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
    }, 1500 + Math.random() * 1000);
  };

  const showRizzGainEffect = (amount: number) => {
    setRizzGainAmount(amount);
    setShowRizzGain(true);
    
    rizzAnimation.setValue(0);
    Animated.timing(rizzAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    
    setTimeout(() => {
      setShowRizzGain(false);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: currentInput,
      timestamp: getCurrentTime()
    };

    setMessages(prev => [...prev, userMessage]);

    const updatedProfile = {
      ...userProfile,
      [getChatFlow()[currentStep].responseKey]: currentInput
    };
    setUserProfile(updatedProfile);

    const rizzGain = getChatFlow()[currentStep].rizzGain;
    setRizzProgress(prev => Math.min(prev + rizzGain, 1000));
    showRizzGainEffect(rizzGain);

    setCurrentInput('');

    const nextStep = currentStep + 1;
    const userName = currentStep === 0 ? currentInput.trim() : updatedProfile.name;
    const chatFlow = getChatFlow(userName);
    
    if (nextStep < chatFlow.length) {
      setCurrentStep(nextStep);
      setTimeout(() => {
        addWingmanMessage(chatFlow[nextStep].wingmanMessage);
      }, 800);
    } else {
      setTimeout(() => {
        const finalUserName = userName || 'gorgeous';
        addWingmanMessage(`you're all set ${finalUserName}! let's find your perfect match! 🎉✨`);
        setTimeout(() => {
          router.push('/(tabs)/pool');
        }, 3000);
      }, 1200);
    }
  };

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
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
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

        <ScreenHeader 
          rizzProgress={rizzProgress}
          rizzMax={1000}
          showLogo={true}
          showWidgets={true}
        />

        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View key={message.id} style={styles.messageWrapper}>
              {message.sender === 'wingman' ? (
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
                <View style={styles.userMessageContainer}>
                  <View style={styles.userBubble}>
                    <Text style={styles.userText}>{message.text}</Text>
                    <Text style={styles.userTimestamp}>{message.timestamp}</Text>
                  </View>
                </View>
              )}
            </View>
          ))}
          
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
    zIndex: 50,
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
    maxWidth: '75%',
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
    borderTopLeftRadius: spacing.xs,
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
    justifyContent: 'flex-end',
  },
  userBubble: {
    backgroundColor: colors.brand.primary,
    borderRadius: borderRadius.lg,
    borderTopRightRadius: spacing.xs,
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
    color: 'rgba(255, 255, 255, 0.7)',
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
    opacity: 0.5,
  },
  sendButtonText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
});