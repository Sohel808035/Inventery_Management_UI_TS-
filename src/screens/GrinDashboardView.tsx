import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import {
  Users,
  FileText,
  Laptop,
  ArrowUpRight,
  Menu,
  ChevronLeft,
} from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import { PulseFAB } from '../components/PulseFAB';
import { UserManagementView } from './UserManagementView';
import { GsnGrinFormsView } from './GsnGrinFormsView';

interface GrinDashboardViewProps {
  mode: ThemeMode;
  onToggleTheme: () => void;
  onBack?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type GrinSubScreen = 'DASHBOARD' | 'USER_MANAGEMENT' | 'FORMS';

export const GrinDashboardView: React.FC<GrinDashboardViewProps> = ({
  mode,
  onToggleTheme,
  onBack,
}) => {
  const [subScreen, setSubScreen] = useState<GrinSubScreen>('DASHBOARD');
  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  if (subScreen === 'USER_MANAGEMENT') {
    return (
      <UserManagementView
        mode={mode}
        onToggleTheme={onToggleTheme}
        onBack={() => setSubScreen('DASHBOARD')}
      />
    );
  }

  if (subScreen === 'FORMS') {
    return (
      <GsnGrinFormsView
        mode={mode}
        onToggleTheme={onToggleTheme}
        onBack={() => setSubScreen('DASHBOARD')}
      />
    );
  }

  const handleCardPress = (title: string, subtitle: string) => {
    if (title === 'User Management') {
      setSubScreen('USER_MANAGEMENT');
    } else if (title === 'GSN/GRIN Forms') {
      setSubScreen('FORMS');
    } else {
      Alert.alert(title, `Opening ${title} (${subtitle})...`, [
        { text: 'OK', style: 'default' },
      ]);
    }
  };

  const handleFabPress = () => {
    Alert.alert(
      'Grin System Voice Assistant',
      'Trigger voice command or barcode audit for Grin System:',
      [
        {
          text: 'Process GRIN Form',
          onPress: () => setSubScreen('FORMS'),
        },
        {
          text: 'User Directory',
          onPress: () => setSubScreen('USER_MANAGEMENT'),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleMenuPress = () => {
    Alert.alert(
      'Grin System Options',
      'Grin System v2.5\n\n• User Management\n• GSN/GRIN Forms\n• Inward Register',
      [{ text: 'Close', style: 'cancel' }]
    );
  };

  return (
    <View style={[styles.outerWrapper, { backgroundColor: isDark ? '#000000' : '#E2E8F0' }]}>
      {/* Mobile Frame Container (390 x 844 px) */}
      <View
        style={[
          styles.mobileContainer,
          {
            backgroundColor: theme.screenBg,
            borderColor: isDark ? '#1E293B' : '#CBD5E1',
          },
        ]}
      >
        {/* Background Atmospheric Glow Shapes */}
        {!isDark && (
          <>
            <View style={styles.lightAmberGlow} />
            <View style={styles.lightSageGlow} />
          </>
        )}
        {isDark && <View style={styles.darkCyanGlow} />}

        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
          <View style={styles.headerLeft}>
            {onBack && (
              <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backTouch}>
                <ChevronLeft size={20} color={theme.headerText} />
              </TouchableOpacity>
            )}

            <View
              style={[
                styles.boBadge,
                { backgroundColor: theme.boBg, borderColor: theme.boBorder },
              ]}
            >
              <Text style={[styles.boText, { color: theme.boText }]}>BO</Text>
            </View>

            <Text style={[styles.headerTitle, { color: theme.headerText }]}>
              Grin Dashboard
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

        {/* Scrollable Main Content */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Central Hero Outer Container Card with glowing border */}
          <View
            style={[
              styles.heroBoxContainer,
              {
                backgroundColor: theme.heroBoxBg,
                borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#CBD5E1',
              },
            ]}
          >
            {/* Card 1: User Management */}
            <TouchableOpacity
              style={[
                styles.actionCard,
                {
                  borderColor: isDark ? '#A3E635' : '#3B82F6',
                  backgroundColor: isDark ? 'rgba(6, 23, 30, 0.92)' : '#BFDBFE',
                },
              ]}
              onPress={() => handleCardPress('User Management', 'View and manage system users')}
              activeOpacity={0.85}
            >
              <View style={styles.cardHeaderRow}>
                <View style={styles.cardHeaderLeft}>
                  <View style={[styles.iconBadge, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#FFFFFF' }]}>
                    <Users size={18} color={isDark ? '#A3E635' : '#2563EB'} />
                  </View>
                  <View>
                    <Text style={[styles.cardTitleText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                      User Management
                    </Text>
                    <Text style={[styles.cardSubtitleText, { color: isDark ? '#94A3B8' : '#334155' }]}>
                      View and manage system users
                    </Text>
                  </View>
                </View>

                <View style={[styles.arrowBadge, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#FFFFFF' }]}>
                  <ArrowUpRight size={16} color={isDark ? '#94A3B8' : '#2563EB'} />
                </View>
              </View>
            </TouchableOpacity>

            {/* Card 2: GSN/GRIN Forms */}
            <TouchableOpacity
              style={[
                styles.actionCard,
                {
                  borderColor: isDark ? '#A3E635' : '#3B82F6',
                  backgroundColor: isDark ? 'rgba(6, 23, 30, 0.92)' : '#BFDBFE',
                },
              ]}
              onPress={() => handleCardPress('GSN/GRIN Forms', 'Process Good Received Notes')}
              activeOpacity={0.85}
            >
              <View style={styles.cardHeaderRow}>
                <View style={styles.cardHeaderLeft}>
                  <View style={[styles.iconBadge, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#FFFFFF' }]}>
                    <FileText size={18} color={isDark ? '#A3E635' : '#2563EB'} />
                  </View>
                  <View>
                    <Text style={[styles.cardTitleText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                      GSN/GRIN Forms
                    </Text>
                    <Text style={[styles.cardSubtitleText, { color: isDark ? '#94A3B8' : '#334155' }]}>
                      Process Good Received Notes
                    </Text>
                  </View>
                </View>

                <View style={[styles.arrowBadge, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#FFFFFF' }]}>
                  <ArrowUpRight size={16} color={isDark ? '#94A3B8' : '#2563EB'} />
                </View>
              </View>
            </TouchableOpacity>

            {/* Card 3: Inward Register */}
            <TouchableOpacity
              style={[
                styles.actionCard,
                {
                  borderColor: isDark ? '#A3E635' : '#3B82F6',
                  backgroundColor: isDark ? 'rgba(6, 23, 30, 0.92)' : '#BFDBFE',
                },
              ]}
              onPress={() => handleCardPress('Inward Register', 'Track item inventory flow')}
              activeOpacity={0.85}
            >
              <View style={styles.cardHeaderRow}>
                <View style={styles.cardHeaderLeft}>
                  <View style={[styles.iconBadge, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#FFFFFF' }]}>
                    <Laptop size={18} color={isDark ? '#A3E635' : '#2563EB'} />
                  </View>
                  <View>
                    <Text style={[styles.cardTitleText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                      Inward Register
                    </Text>
                    <Text style={[styles.cardSubtitleText, { color: isDark ? '#94A3B8' : '#334155' }]}>
                      Track item inventory flow
                    </Text>
                  </View>
                </View>

                <View style={[styles.arrowBadge, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#FFFFFF' }]}>
                  <ArrowUpRight size={16} color={isDark ? '#94A3B8' : '#2563EB'} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

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
  darkCyanGlow: {
    position: 'absolute',
    top: 80,
    left: '10%',
    width: 280,
    height: 280,
    borderRadius: 140,
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
    opacity: 0.55,
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
    paddingBottom: 16,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backTouch: {
    marginRight: 4,
  },
  boBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boText: {
    fontSize: 11,
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 90,
  },
  heroBoxContainer: {
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    gap: 14,
    width: '100%',
  },
  actionCard: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitleText: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  cardSubtitleText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter',
    marginTop: 2,
  },
  arrowBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
