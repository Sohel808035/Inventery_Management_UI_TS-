import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Menu, Users } from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import { RoleActionCard } from '../components/RoleActionCard';
import { PulseFAB } from '../components/PulseFAB';

interface LandingScreenProps {
  mode: ThemeMode;
  onToggleTheme: () => void;
  onSelectRole: (role: 'Admin' | 'Staff') => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const LandingScreen: React.FC<LandingScreenProps> = ({
  mode,
  onToggleTheme,
  onSelectRole,
}) => {
  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  const handleMenuPress = () => {
    Alert.alert(
      'System Options',
      'Inventory Management v2.5\n\n• Admin Dashboard\n• Staff Dashboard\n• System Preferences',
      [{ text: 'Close', style: 'cancel' }]
    );
  };

  const handleFabPress = () => {
    Alert.alert(
      'Voice Assistant & Scanner',
      'Select a role or trigger quick action:',
      [
        { text: 'Open Admin Dashboard', onPress: () => onSelectRole('Admin') },
        { text: 'Open Staff Dashboard', onPress: () => onSelectRole('Staff') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={[styles.outerWrapper, { backgroundColor: isDark ? '#000000' : '#E2E8F0' }]}>
      {/* Mobile Device Frame Container (390 x 844 px) */}
      <View
        style={[
          styles.mobileContainer,
          {
            backgroundColor: theme.screenBg,
            borderColor: isDark ? '#1E293B' : '#CBD5E1',
          },
        ]}
      >
        {/* Soft Background Cyan Glow for Dark Mode */}
        {isDark ? (
          <View style={styles.softCyanRadialGlow} />
        ) : (
          <>
            <View style={styles.lightAmberGlow} />
            <View style={styles.lightSageGlow} />
          </>
        )}

        {/* Top Header Bar */}
        <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
          <View style={styles.headerLeft}>
            <View
              style={[
                styles.boBadge,
                {
                  backgroundColor: isDark ? '#050B0E' : '#FFFFFF',
                  borderColor: isDark ? '#A3E635' : '#10B981',
                },
              ]}
            >
              <Text style={[styles.boText, { color: isDark ? '#A3E635' : '#059669' }]}>BO</Text>
            </View>
            <Text style={[styles.headerTitle, { color: theme.headerText }]}>
              Inventory Management
            </Text>
          </View>

          <View style={styles.headerRight}>
            <ThemeToggle mode={mode} onToggle={onToggleTheme} />

            <TouchableOpacity
              style={[styles.menuBtn, { backgroundColor: theme.menuBg }]}
              onPress={handleMenuPress}
              activeOpacity={0.8}
            >
              <Menu size={18} color={theme.menuIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content Area */}
        <View style={styles.heroContainerWrapper}>
          {/* Main Hero Card - Matching Reference Screenshot Exactly */}
          <View
            style={[
              styles.heroBox,
              {
                backgroundColor: isDark ? 'rgba(7, 26, 33, 0.95)' : '#FFFFFF',
                borderColor: isDark ? 'rgba(0, 229, 255, 0.35)' : 'rgba(203, 213, 225, 0.8)',
              },
            ]}
          >
            {/* Title: Inventory Management */}
            <View style={styles.titleSection}>
              <Text style={[styles.mainTitleLine, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                Inventory
              </Text>
              <Text style={[styles.mainTitleLine, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                Management
              </Text>
            </View>

            {/* Role Action Cards Stack */}
            <View style={styles.rowsWrapper}>
              <RoleActionCard
                mode={mode}
                title="Admin"
                icon={Users}
                onPress={() => onSelectRole('Admin')}
              />

              <RoleActionCard
                mode={mode}
                title="Staff"
                icon={Users}
                onPress={() => onSelectRole('Staff')}
              />
            </View>
          </View>
        </View>

        {/* Bottom Right Glowing Microphone FAB */}
        <PulseFAB mode={mode} onPress={handleFabPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileContainer: {
    width: Math.min(SCREEN_WIDTH, 390),
    height: 844,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    position: 'relative',
  },
  softCyanRadialGlow: {
    position: 'absolute',
    top: 140,
    alignSelf: 'center',
    width: 320,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#00E5FF',
    opacity: 0.1,
  },
  lightAmberGlow: {
    position: 'absolute',
    top: -20,
    right: -40,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#FDE68A',
    opacity: 0.5,
  },
  lightSageGlow: {
    position: 'absolute',
    bottom: 40,
    left: -40,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#DCFCE7',
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 14,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  boBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boText: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  headerTitle: {
    fontSize: 17.5,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContainerWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heroBox: {
    borderRadius: 28,
    paddingVertical: 36,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    gap: 28,
  },
  titleSection: {
    alignItems: 'center',
    gap: 2,
  },
  mainTitleLine: {
    fontSize: 32,
    fontWeight: '800',
    fontFamily: 'Inter',
    letterSpacing: -0.5,
    textAlign: 'center',
    lineHeight: 38,
  },
  rowsWrapper: {
    width: '100%',
    gap: 4,
  },
});
