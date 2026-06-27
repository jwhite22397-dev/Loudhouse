export const colors = {
  // Deep space backgrounds
  bg: '#07060F',
  bgAlt: '#0B0A1A',
  surface: '#15132A',
  surfaceAlt: '#1E1B38',
  border: '#2A274D',

  // Brand / accents
  primary: '#8A5CFF',
  primaryDark: '#6C3CE0',
  cyan: '#36E0E0',
  pink: '#FF5CA8',
  gold: '#F4C04E',

  // Text
  text: '#F5F4FF',
  textDim: '#B9B5D6',
  textMuted: '#827FA3',

  // Status
  success: '#3FD68C',
  danger: '#FF5C6C',

  black: '#000000',
  white: '#FFFFFF',
};

export const gradients = {
  cosmic: ['#6C3CE0', '#8A5CFF', '#FF5CA8'] as const,
  nebula: ['#150E33', '#2A1B5E', '#0B0A1A'] as const,
  aurora: ['#36E0E0', '#8A5CFF'] as const,
  sunset: ['#FF5CA8', '#F4C04E'] as const,
  night: ['#0B0A1A', '#07060F'] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const typography = {
  hero: { fontSize: 40, fontWeight: '800' as const, letterSpacing: 1 },
  h1: { fontSize: 28, fontWeight: '800' as const },
  h2: { fontSize: 22, fontWeight: '700' as const },
  h3: { fontSize: 18, fontWeight: '700' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  bodyBold: { fontSize: 15, fontWeight: '600' as const },
  small: { fontSize: 13, fontWeight: '400' as const },
  tiny: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 1 },
};

export const shadow = {
  glow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
};
