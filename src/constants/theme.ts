/**
 * Wingman Design System
 * Centralized design tokens for colors, spacing, typography, and more
 */

// ============================================================================
// COLORS - All color definitions grouped together for easy experimentation
// ============================================================================

export const colors = {
  // Wingman Brand Colors (PRIMARY COLOR PALETTE)
  brand: {
    primary: '#F4A261',      // Orange - primary actions, CTA buttons
    secondary: '#FADA7A',    // Yellow - secondary actions, highlights
    tertiary: '#C6D870',     // Green - success states, checkmarks, widgets
    blue: '#D6E8F5',         // Background blue - app background
  },

  // Brand Color Shadows (for 3D effects - must be darker than brand colors)
  brandShadows: {
    primary: '#d4845a',      // Darker orange for button shadows
    secondary: '#f0c652',    // Darker yellow for button shadows
    tertiary: '#a4b15c',     // Darker green for button shadows
  },

  // Brand Color Hover States (for interactive feedback)
  brandHover: {
    primary: '#e8956b',      // Lighter orange for hover
    secondary: '#f7d066',    // Lighter yellow for hover
    tertiary: '#b5c566',     // Lighter green for hover
  },

  // Porcelain Color Scheme (alternative theme)
  porcelain: {
    background: '#FFFEF8',   // Off-white background
    backgroundHover: '#f5f3ee', // Hover state
    shadow: '#ebe9e3',       // Shadow color
    accent: '#E8984E',       // Orange accent for text/icons
  },

  // Widget Color Configurations (tied to brand colors)
  widgetColors: {
    wingman: {
      safety: {
        backgroundColor: '#C6D870',      // brand.tertiary
        backgroundHover: '#b5c566',      // brandHover.tertiary
      },
      settings: {
        backgroundColor: '#F4A261',      // brand.primary
        backgroundHover: '#e8956b',      // brandHover.primary
      },
      profile: {
        backgroundColor: '#FADA7A',      // brand.secondary
        backgroundHover: '#f7d066',      // brandHover.secondary
      },
      special: {
        backgroundColor: '#F4A261',      // brand.primary
        backgroundHover: '#e8956b',      // brandHover.primary
      },
    },
    porcelain: {
      backgroundColor: '#FFFEF8',        // porcelain.background
      backgroundHover: '#f5f3ee',        // porcelain.backgroundHover
      iconColor: '#E8984E',              // porcelain.accent
    },
  },

  // Neutral Grays (UI elements, dividers, disabled states)
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Semantic Text Colors
  text: {
    primary: '#1F2937',      // Main text (gray.800)
    secondary: '#4B5563',    // Secondary text, captions (gray.600)
    tertiary: '#9CA3AF',     // Disabled, placeholders (gray.400)
    inverse: '#FFFFFF',      // White text on dark backgrounds
  },

  // Background Colors
  background: {
    app: '#D6E8F5',          // Main app background (brand.blue)
    primary: '#FFFFFF',      // Cards, sections, modals
    secondary: '#F3F4F6',    // Subtle backgrounds (gray.100)
  },

  // State Colors
  success: '#C6D870',        // Success messages, completed states (brand.tertiary)
  warning: '#FADA7A',        // Warnings, cautions (brand.secondary)
  error: '#EF4444',          // Error states, destructive actions
};

// Extracted widget colors for easier access
export const widgetColors = colors.widgetColors;

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
};

// ============================================================================
// TYPOGRAPHY - text design
// ============================================================================

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    huge: 32,
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  } as const,

  lineHeight: {
    tight: 20,
    normal: 24,
    relaxed: 26,
    loose: 32,
  },
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
};

// ============================================================================
// SHADOWS (references colors)
// ============================================================================

export const shadows = {
  // Standard shadows
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },

  // 3D Button Shadows (platform effect)
  button3D: {
    primary: {
      shadowColor: colors.brandShadows.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 8,
    },
    secondary: {
      shadowColor: colors.brandShadows.secondary,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 6,
    },
    tertiary: {
      shadowColor: colors.brandShadows.tertiary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 4,
    },
  },

  // 3D Widget Shadows (Wingman color scheme)
  widget3D: {
    safety: {
      normal: {
        shadowColor: colors.brandShadows.tertiary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
      },
      pressed: {
        shadowColor: colors.brandShadows.tertiary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 2,
      },
    },
    settings: {
      normal: {
        shadowColor: colors.brandShadows.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
      },
      pressed: {
        shadowColor: colors.brandShadows.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 2,
      },
    },
    profile: {
      normal: {
        shadowColor: colors.brandShadows.secondary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
      },
      pressed: {
        shadowColor: colors.brandShadows.secondary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 2,
      },
    },
    special: {
      normal: {
        shadowColor: colors.brandShadows.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
      },
      pressed: {
        shadowColor: colors.brandShadows.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 2,
      },
    },
  },

  // 3D Widget Shadows (Porcelain color scheme)
  widget3DPorcelain: {
    normal: {
      shadowColor: colors.porcelain.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 6,
    },
    pressed: {
      shadowColor: colors.porcelain.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 2,
    },
  },
};

// ============================================================================
// SIZES
// ============================================================================

export const sizes = {
  avatar: {
    small: 32,
    medium: 40,
    large: 80,
  },
  widget: {
    width: 64,
    height: 64,
  },
  progressBar: {
    height: 16,
  },
};

// ============================================================================
// LAYOUT
// ============================================================================

export const layout = {
  screen: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  section: {
    marginBottom: spacing.lg,
  },
  buttonSpacer: spacing.lg,
};

// ============================================================================
// ANIMATIONS
// ============================================================================

export const animations = {
  widget: {
    translateNormal: 0,
    translatePressed: 2,
    duration: 150,
  },
};