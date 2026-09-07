export type ThemeMode = 'dark' | 'light';

export const ThemeColors = {
  dark: {
    mode: 'dark' as ThemeMode,
    screenBg: '#050B0E', // Deep cyan-black
    background: '#050B0E',
    
    // Header
    headerBg: '#050B0E',
    headerText: '#FFFFFF',
    boBorder: '#A3E635',
    boText: '#A3E635',
    boBg: '#050B0E',

    // Toggle & Menu
    toggleBg: '#FFFFFF',
    toggleIcon: '#000000',
    menuBg: '#1E293B',
    menuIcon: '#FFFFFF',

    // Hero Box Container
    heroBoxBg: '#08171E',
    heroBoxHeaderBg: '#0D2A30',
    heroBoxBorder: 'rgba(0, 229, 255, 0.3)',
    heroTitle: '#FFFFFF',

    // Action Rows
    rowBg: '#0A1F26',
    rowBorder: '#103642',
    rowIconBg: 'rgba(163, 230, 53, 0.18)',
    rowIconColor: '#A3E635',
    rowTitle: '#FFFFFF',

    // Pill Button (See Details ↗)
    pillBg: '#142C34',
    pillBorder: '#1C3E49',
    pillText: '#94A3B8',
    pillArrow: '#94A3B8',

    // Bottom Controls
    settingsBg: '#1E293B',
    settingsIcon: '#94A3B8',

    // FAB (Microphone)
    fabCenterBg: '#A3E635',
    fabIconColor: '#000000',
    fabRing1: 'rgba(0, 229, 255, 0.4)',
    fabRing2: 'rgba(0, 229, 255, 0.18)',

    // Screens
    cardBackground: '#0A1F26',
    cardBorder: 'rgba(0, 229, 255, 0.3)',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    accent: '#A3E635',
    iconButtonBg: '#1E293B',
  },

  light: {
    mode: 'light' as ThemeMode,
    screenBg: '#FBF9F1', // Warm ivory cream
    background: '#FBF9F1',
    
    // Header
    headerBg: '#FBF9F1',
    headerText: '#0F172A',
    boBorder: '#10B981',
    boText: '#059669',
    boBg: '#FFFFFF',

    // Toggle & Menu
    toggleBg: '#0F172A',
    toggleIcon: '#FFFFFF',
    menuBg: '#E2E8F0',
    menuIcon: '#0F172A',

    // Hero Box Container
    heroBoxBg: '#FFFFFF',
    heroBoxHeaderBg: '#FEF3C7', // Warm amber cream header
    heroBoxBorder: 'rgba(203, 213, 225, 0.6)',
    heroTitle: '#0F172A',

    // Action Rows
    rowBg: '#F1F5F9',
    rowBorder: '#E2E8F0',
    rowIconBg: '#DBEAFE',
    rowIconColor: '#2563EB',
    rowTitle: '#0F172A',

    // Pill Button (See Details ↗)
    pillBg: '#E2E8F0',
    pillBorder: '#CBD5E1',
    pillText: '#475569',
    pillArrow: '#475569',

    // Bottom Controls
    settingsBg: '#E2E8F0',
    settingsIcon: '#64748B',

    // FAB (Microphone)
    fabCenterBg: '#2563EB',
    fabIconColor: '#FFFFFF',
    fabRing1: 'rgba(37, 99, 235, 0.35)',
    fabRing2: 'rgba(37, 99, 235, 0.15)',

    // Screens
    cardBackground: '#FFFFFF',
    cardBorder: 'rgba(203, 213, 225, 0.8)',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    accent: '#2563EB',
    iconButtonBg: '#E2E8F0',
  },
};
