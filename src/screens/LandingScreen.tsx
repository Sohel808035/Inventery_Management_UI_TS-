import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Menu, Users, Gift, Trophy, DollarSign, Target } from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import { SystemTabBar, SystemTab } from '../components/SystemTabBar';
import { RoleActionCard } from '../components/RoleActionCard';
import { PulseFAB } from '../components/PulseFAB';
import { GrinDashboardView } from './GrinDashboardView';

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
  const [activeSystemTab, setActiveSystemTab] = useState<SystemTab>('INVENTORY');
  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  if (activeSystemTab === 'GRIN') {
    return (
      <GrinDashboardView
        mode={mode}
        onToggleTheme={onToggleTheme}
        onBack={() => setActiveSystemTab('INVENTORY')}
      />
    );
  }

  const handleMenuPress = () => {
    Alert.alert(
      'System Options',
      'Inventory Management v2.5\n\n• Admin Dashboard\n• Staff Stock Inspector\n• System Preferences',
      [{ text: 'Close', style: 'cancel' }]
    );
  };

  const handleFabPress = () => {
    const currentSystemName =
      activeSystemTab === 'INVENTORY'
        ? 'Inventory Management'
        : 'Incentive System';

    Alert.alert(
      'Voice & Scanner',
      `Trigger barcode scan or voice action for ${currentSystemName}:`,
      [
        { text: 'Open Admin Dashboard', onPress: () => onSelectRole('Admin') },
        { text: 'Open Staff Stock', onPress: () => onSelectRole('Staff') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleSubOptionPress = (optionName: string) => {
    Alert.alert(
      optionName,
      `Launching ${optionName} details view...`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  // Content configuration for each system tab
  const getSystemConfig = () => {
    switch (activeSystemTab) {
      case 'INVENTORY':
      default:
        return {
          titleLine1: 'Inventory',
          titleLine2: 'Management',
          card1: {
            title: 'Admin',
            icon: Users,
            action: () => onSelectRole('Admin'),
          },
          card2: {
            title: 'Staff',
            icon: Users,
            action: () => onSelectRole('Staff'),
          },
        };

      case 'INCENTIVE':
        return {
          titleLine1: 'Incentive',
          titleLine2: 'System',
          card1: {
            title: 'Commissions',
            icon: DollarSign,
            action: () => handleSubOptionPress('Commissions'),
          },
          card2: {
            title: 'Bonuses',
            icon: Target,
            action: () => handleSubOptionPress('Bonus Targets'),
          },
        };
    }
  };

  const config = getSystemConfig();

  return (
    <View style={[styles.outerWrapper, { backgroundColor: isDark ? '#000000' : '#E2E8F0' }]}>
      {/* Mobile Device Frame Container (390 x 844 px mobile view with 28px rounded corners) */}
      <View
        style={[
          styles.mobileContainer,
          {
            backgroundColor: theme.screenBg,
            borderColor: isDark ? '#1E293B' : '#CBD5E1',
          },
        ]}
      >
        {/* Background Atmospheric Glow Shapes for Light Mode */}
        {!isDark && (
          <>
            <View style={styles.lightAmberGlow} />
            <View style={styles.lightSageGlow} />
          </>
        )}

        {/* Top Header */}
        <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
          <View style={styles.headerLeft}>
            <View
              style={[
                styles.boBadge,
                { backgroundColor: theme.boBg, borderColor: theme.boBorder },
              ]}
            >
              <Text style={[styles.boText, { color: theme.boText }]}>BO</Text>
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

        {/* System Tab Bar (Inventory Management | Grin System | Incentive System) */}
        <SystemTabBar
          mode={mode}
          activeTab={activeSystemTab}
          onSelectTab={setActiveSystemTab}
        />

        {/* Uniform Hero Box Container for All Systems */}
        <View style={styles.heroContainerWrapper}>
          <View
            style={[
              styles.heroBox,
              {
                backgroundColor: theme.heroBoxBg,
                borderColor: theme.heroBoxBorder,
              },
            ]}
          >
            {/* Top Gradient Backdrop Header Area */}
            <View
              style={[
                styles.topGradBackdrop,
                { backgroundColor: theme.heroBoxHeaderBg },
              ]}
            />

            {/* Stacked Central Title */}
            <View style={styles.titleSection}>
              <Text style={[styles.mainTitleLine, { color: theme.heroTitle }]}>
                {config.titleLine1}
              </Text>
              <Text style={[styles.mainTitleLine, { color: theme.heroTitle }]}>
                {config.titleLine2}
              </Text>
            </View>

            {/* Action Rows */}
            <View style={styles.rowsWrapper}>
              <RoleActionCard
                mode={mode}
                title={config.card1.title}
                icon={config.card1.icon}
                onPress={config.card1.action}
              />

              <RoleActionCard
                mode={mode}
                title={config.card2.title}
                icon={config.card2.icon}
                onPress={config.card2.action}
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
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 8,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  boBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boText: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  headerTitle: {
    fontSize: 17,
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
    paddingBottom: 60,
  },
  heroBox: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  topGradBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    opacity: 0.6,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 36,
    zIndex: 2,
  },
  mainTitleLine: {
    fontSize: 34,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: -0.5,
    textAlign: 'center',
    lineHeight: 40,
  },
  rowsWrapper: {
    width: '100%',
    zIndex: 2,
  },
});
