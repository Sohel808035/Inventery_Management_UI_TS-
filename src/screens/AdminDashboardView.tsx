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
  Package,
  Warehouse,
  Database,
  ArrowUpRight,
  Menu,
  ChevronLeft,
} from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import { PulseFAB } from '../components/PulseFAB';
import { InventoryItemManagementView } from './InventoryItemManagementView';
import { DataManagementView } from './DataManagementView';

interface AdminDashboardViewProps {
  mode: ThemeMode;
  onToggleTheme: () => void;
  onBack: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type AdminSubScreen = 'DASHBOARD' | 'ITEM_MANAGEMENT' | 'DATA_MANAGEMENT';

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  mode,
  onToggleTheme,
  onBack,
}) => {
  const [subView, setSubView] = useState<AdminSubScreen>('DASHBOARD');
  const [initialTab, setInitialTab] = useState<'ALL' | 'FACTORY' | 'GODOWN' | 'TRANSIT'>('ALL');
  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  if (subView === 'ITEM_MANAGEMENT') {
    return (
      <InventoryItemManagementView
        mode={mode}
        onToggleTheme={onToggleTheme}
        onBack={() => setSubView('DASHBOARD')}
        initialTab={initialTab}
      />
    );
  }

  if (subView === 'DATA_MANAGEMENT') {
    return (
      <DataManagementView
        mode={mode}
        onToggleTheme={onToggleTheme}
        onBack={() => setSubView('DASHBOARD')}
      />
    );
  }

  const handleAction = (actionName: string) => {
    if (actionName === 'Inventory') {
      setInitialTab('ALL');
      setSubView('ITEM_MANAGEMENT');
    } else if (actionName === 'Godown Management' || actionName === 'Godown') {
      setInitialTab('GODOWN');
      setSubView('ITEM_MANAGEMENT');
    } else if (actionName === 'Data Management') {
      setSubView('DATA_MANAGEMENT');
    } else {
      Alert.alert(
        actionName,
        `Executing ${actionName}...`,
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  const handleFabPress = () => {
    Alert.alert(
      'Voice Assistant & Scanner',
      'Trigger voice command or barcode audit for Admin Dashboard:',
      [
        { text: 'Open Item Management', onPress: () => setSubView('ITEM_MANAGEMENT') },
        { text: 'Scan Asset Tag', onPress: () => handleAction('Scan Asset') },
        { text: 'Cancel', style: 'cancel' },
      ]
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
        {/* Background Atmospheric Glow Shapes for Light Mode */}
        {!isDark && (
          <>
            <View style={styles.lightAmberGlow} />
            <View style={styles.lightSageGlow} />
          </>
        )}

        {/* Dark Mode Background Cyan Glow */}
        {isDark && <View style={styles.darkCyanGlow} />}

        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backTouch}>
              <ChevronLeft size={20} color={theme.headerText} />
            </TouchableOpacity>

            <View
              style={[
                styles.boBadge,
                { backgroundColor: theme.boBg, borderColor: theme.boBorder },
              ]}
            >
              <Text style={[styles.boText, { color: theme.boText }]}>BO</Text>
            </View>
            <Text style={[styles.headerTitle, { color: theme.headerText }]}>
              Admin Dashboard
            </Text>
          </View>

          <View style={styles.headerRight}>
            <ThemeToggle mode={mode} onToggle={onToggleTheme} />

            <TouchableOpacity
              style={[styles.menuBtn, { backgroundColor: theme.menuBg }]}
              onPress={onBack}
              activeOpacity={0.8}
            >
              <Menu size={18} color={theme.menuIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Dashboard Main Cards Scroll Container */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Card 1: Inventory */}
          <TouchableOpacity
            style={[
              styles.navCard,
              { backgroundColor: theme.heroBoxBg, borderColor: theme.heroBoxBorder },
            ]}
            onPress={() => handleAction('Inventory')}
            activeOpacity={0.85}
          >
            <View style={styles.cardTopRow}>
              <View style={[styles.cardIconBadge, { backgroundColor: isDark ? 'rgba(0,229,255,0.12)' : '#DBEAFE' }]}>
                <Package size={20} color={isDark ? '#00E5FF' : '#2563EB'} />
              </View>
              <ArrowUpRight size={20} color={theme.pillArrow} />
            </View>
            <Text style={[styles.cardTitle, { color: theme.heroTitle }]}>Inventory</Text>
          </TouchableOpacity>

          {/* Card 2: Godown */}
          <TouchableOpacity
            style={[
              styles.navCard,
              { backgroundColor: theme.heroBoxBg, borderColor: theme.heroBoxBorder },
            ]}
            onPress={() => handleAction('Godown Management')}
            activeOpacity={0.85}
          >
            <View style={styles.cardTopRow}>
              <View style={[styles.cardIconBadge, { backgroundColor: isDark ? 'rgba(163,230,53,0.15)' : '#FEF3C7' }]}>
                <Warehouse size={20} color={isDark ? '#A3E635' : '#D97706'} />
              </View>
              <ArrowUpRight size={20} color={theme.pillArrow} />
            </View>
            <Text style={[styles.cardTitle, { color: theme.heroTitle }]}>Godown</Text>
          </TouchableOpacity>

          {/* Card 3: Data Management */}
          <TouchableOpacity
            style={[
              styles.navCard,
              { backgroundColor: theme.heroBoxBg, borderColor: theme.heroBoxBorder },
            ]}
            onPress={() => handleAction('Data Management')}
            activeOpacity={0.85}
          >
            <View style={styles.cardTopRow}>
              <View style={[styles.cardIconBadge, { backgroundColor: isDark ? 'rgba(0,229,255,0.12)' : '#E0E7FF' }]}>
                <Database size={20} color={isDark ? '#00E5FF' : '#4F46E5'} />
              </View>
              <ArrowUpRight size={20} color={theme.pillArrow} />
            </View>
            <Text style={[styles.cardTitle, { color: theme.heroTitle }]}>Data Management</Text>
          </TouchableOpacity>

          {/* Card 4: File Actions Box Container */}
          <View
            style={[
              styles.fileActionsBox,
              { backgroundColor: theme.heroBoxBg, borderColor: theme.heroBoxBorder },
            ]}
          >
            <Text style={[styles.fileActionsTitle, { color: theme.heroTitle }]}>File Actions</Text>

            {/* Pill 1: Upload Excel */}
            <TouchableOpacity
              style={[
                styles.filePillBtn,
                {
                  backgroundColor: isDark ? '#142C34' : '#FFFFFF',
                  borderColor: isDark ? '#1C3E49' : '#CBD5E1',
                },
              ]}
              onPress={() => handleAction('Upload Excel')}
              activeOpacity={0.8}
            >
              <Text style={[styles.filePillText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                Upload Excel
              </Text>
            </TouchableOpacity>

            {/* Pill 2: View Uploaded Files */}
            <TouchableOpacity
              style={[
                styles.filePillBtn,
                {
                  backgroundColor: isDark ? '#142C34' : '#FFFFFF',
                  borderColor: isDark ? '#1C3E49' : '#CBD5E1',
                },
              ]}
              onPress={() => handleAction('View Uploaded Files')}
              activeOpacity={0.8}
            >
              <Text style={[styles.filePillText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                View Uploaded Files
              </Text>
            </TouchableOpacity>

            {/* Pill 3: Download Template (Bright Accent Fill) */}
            <TouchableOpacity
              style={[
                styles.filePillBtn,
                {
                  backgroundColor: isDark ? '#A3E635' : '#2563EB',
                  borderColor: isDark ? '#A3E635' : '#2563EB',
                },
              ]}
              onPress={() => handleAction('Download Template')}
              activeOpacity={0.8}
            >
              <Text style={[styles.filePillText, { color: isDark ? '#000000' : '#FFFFFF', fontWeight: '700' }]}>
                Download Template
              </Text>
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
    top: 100,
    left: '10%',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#00E5FF',
    opacity: 0.12,
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
    gap: 8,
  },
  backTouch: {
    padding: 2,
    marginRight: 2,
  },
  boBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
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
    fontSize: 16,
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 90,
    gap: 14,
  },
  navCard: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    justifyContent: 'space-between',
    minHeight: 100,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  fileActionsBox: {
    width: '100%',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    gap: 12,
    marginTop: 4,
  },
  fileActionsTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  filePillBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  filePillText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
});
