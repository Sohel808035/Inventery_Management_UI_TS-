import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import {
  Home,
  ArrowUpRight,
  Menu,
  ChevronLeft,
  X,
  CheckCircle2,
  Package,
} from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import { PulseFAB } from '../components/PulseFAB';
import { QualityDepartmentView } from './QualityDepartmentView';
import { PackagingStage1View } from './PackagingStage1View';
import { PackagingStage2View } from './PackagingStage2View';
import { InventoryLocationView } from './InventoryLocationView';

interface StaffDashboardViewProps {
  mode: ThemeMode;
  onToggleTheme: () => void;
  onBack?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface DepartmentStage {
  id: string;
  title: string;
  subtitle?: string;
  alignment: 'left' | 'right';
  activeItemsCount: number;
  status: 'Operational' | 'In Progress' | 'Inspection Required';
}

type StaffSubScreen = 'DASHBOARD' | 'QUALITY' | 'PKG_STAGE_1' | 'PKG_STAGE_2' | 'INV_LOCATION';

export const StaffDashboardView: React.FC<StaffDashboardViewProps> = ({
  mode,
  onToggleTheme,
  onBack,
}) => {
  const [subScreen, setSubScreen] = useState<StaffSubScreen>('DASHBOARD');
  const [selectedDept, setSelectedDept] = useState<DepartmentStage | null>(null);

  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  const departments: DepartmentStage[] = [
    {
      id: 'quality',
      title: 'Quality Department',
      alignment: 'left',
      activeItemsCount: 42,
      status: 'Operational',
    },
    {
      id: 'pkg_stage_1',
      title: 'Packaging Department',
      subtitle: 'Stage 1',
      alignment: 'right',
      activeItemsCount: 18,
      status: 'In Progress',
    },
    {
      id: 'pkg_stage_2',
      title: 'Packaging Department',
      subtitle: 'Stage 2',
      alignment: 'left',
      activeItemsCount: 29,
      status: 'Operational',
    },
    {
      id: 'inv_location',
      title: 'Inventory location',
      alignment: 'right',
      activeItemsCount: 156,
      status: 'Operational',
    },
  ];

  if (subScreen === 'QUALITY') {
    return (
      <QualityDepartmentView
        mode={mode}
        onToggleTheme={onToggleTheme}
        onBack={() => setSubScreen('DASHBOARD')}
      />
    );
  }

  if (subScreen === 'PKG_STAGE_1') {
    return (
      <PackagingStage1View
        mode={mode}
        onToggleTheme={onToggleTheme}
        onBack={() => setSubScreen('DASHBOARD')}
      />
    );
  }

  if (subScreen === 'PKG_STAGE_2') {
    return (
      <PackagingStage2View
        mode={mode}
        onToggleTheme={onToggleTheme}
        onBack={() => setSubScreen('DASHBOARD')}
      />
    );
  }

  if (subScreen === 'INV_LOCATION') {
    return (
      <InventoryLocationView
        mode={mode}
        onToggleTheme={onToggleTheme}
        onBack={() => setSubScreen('DASHBOARD')}
      />
    );
  }

  const handleCardPress = (dept: DepartmentStage) => {
    if (dept.id === 'quality') {
      setSubScreen('QUALITY');
    } else if (dept.id === 'pkg_stage_1') {
      setSubScreen('PKG_STAGE_1');
    } else if (dept.id === 'pkg_stage_2') {
      setSubScreen('PKG_STAGE_2');
    } else if (dept.id === 'inv_location') {
      setSubScreen('INV_LOCATION');
    } else {
      setSelectedDept(dept);
    }
  };

  const handleFabPress = () => {
    Alert.alert(
      'Staff Voice Assistant',
      'Trigger voice command or barcode audit for Staff Dashboard:',
      [
        {
          text: 'Inspect Quality Dept',
          onPress: () => setSubScreen('QUALITY'),
        },
        {
          text: 'Packaging Stage 1',
          onPress: () => setSubScreen('PKG_STAGE_1'),
        },
        {
          text: 'Inventory Location',
          onPress: () => setSubScreen('INV_LOCATION'),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleMenuPress = () => {
    Alert.alert(
      'Staff System Options',
      'Staff Dashboard v2.5\n\n• Quality Audit\n• Packaging Pipeline\n• Inventory Bin Locations',
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
        {/* Background Atmosphere Glow Shapes */}
        {!isDark && (
          <>
            <View style={styles.lightAmberGlow} />
            <View style={styles.lightSageGlow} />
          </>
        )}
        {isDark && <View style={styles.darkCyanGlow} />}

        {/* Header Bar */}
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
              Staff Dashboard
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

        {/* Main Content Area with Dotted Connection Timeline */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.timelineContainer}>
            {/* Card 1: Quality Department (Left Aligned) */}
            <View style={styles.leftCardWrapper}>
              <TouchableOpacity
                style={[
                  styles.deptCard,
                  {
                    backgroundColor: isDark ? 'rgba(4, 21, 28, 0.95)' : 'rgba(255, 255, 255, 0.88)',
                    borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#CBD5E1',
                  },
                ]}
                onPress={() => handleCardPress(departments[0])}
                activeOpacity={0.85}
              >
                <View
                  style={[
                    styles.deptIconBadge,
                    {
                      backgroundColor: isDark ? 'rgba(163, 230, 53, 0.15)' : '#DBEAFE',
                      borderColor: isDark ? '#A3E635' : '#2563EB',
                    },
                  ]}
                >
                  <Home size={18} color={isDark ? '#A3E635' : '#2563EB'} />
                </View>

                <View style={styles.cardTextContent}>
                  <Text style={[styles.deptTitleText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                    Quality Department
                  </Text>
                </View>

                <View
                  style={[
                    styles.cardArrowCircle,
                    {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9',
                    },
                  ]}
                >
                  <ArrowUpRight size={16} color={isDark ? '#A3E635' : '#2563EB'} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Dotted Line Connector 1 (Left to Right) */}
            <View style={styles.connectorContainer}>
              <Svg height="32" width="100%" viewBox="0 0 350 32">
                <Path
                  d="M 150 0 L 150 16 L 240 16 L 240 32"
                  fill="none"
                  stroke={isDark ? '#A3E635' : '#3B82F6'}
                  strokeWidth="2.2"
                  strokeDasharray="5 5"
                />
              </Svg>
            </View>

            {/* Card 2: Packaging Department Stage 1 (Right Aligned) */}
            <View style={styles.rightCardWrapper}>
              <TouchableOpacity
                style={[
                  styles.deptCard,
                  {
                    backgroundColor: isDark ? 'rgba(4, 21, 28, 0.95)' : 'rgba(255, 255, 255, 0.88)',
                    borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#CBD5E1',
                  },
                ]}
                onPress={() => handleCardPress(departments[1])}
                activeOpacity={0.85}
              >
                <View
                  style={[
                    styles.deptIconBadge,
                    {
                      backgroundColor: isDark ? 'rgba(163, 230, 53, 0.15)' : '#DBEAFE',
                      borderColor: isDark ? '#A3E635' : '#2563EB',
                    },
                  ]}
                >
                  <Home size={18} color={isDark ? '#A3E635' : '#2563EB'} />
                </View>

                <View style={styles.cardTextContent}>
                  <Text style={[styles.deptTitleText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                    Packaging Department
                  </Text>
                  <Text style={[styles.deptSubtitleText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                    Stage 1
                  </Text>
                </View>

                <View
                  style={[
                    styles.cardArrowCircle,
                    {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9',
                    },
                  ]}
                >
                  <ArrowUpRight size={16} color={isDark ? '#A3E635' : '#2563EB'} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Dotted Line Connector 2 (Right to Left) */}
            <View style={styles.connectorContainer}>
              <Svg height="32" width="100%" viewBox="0 0 350 32">
                <Path
                  d="M 240 0 L 240 16 L 150 16 L 150 32"
                  fill="none"
                  stroke={isDark ? '#A3E635' : '#3B82F6'}
                  strokeWidth="2.2"
                  strokeDasharray="5 5"
                />
              </Svg>
            </View>

            {/* Card 3: Packaging Department Stage 2 (Left Aligned) */}
            <View style={styles.leftCardWrapper}>
              <TouchableOpacity
                style={[
                  styles.deptCard,
                  {
                    backgroundColor: isDark ? 'rgba(4, 21, 28, 0.95)' : 'rgba(255, 255, 255, 0.88)',
                    borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#CBD5E1',
                  },
                ]}
                onPress={() => handleCardPress(departments[2])}
                activeOpacity={0.85}
              >
                <View
                  style={[
                    styles.deptIconBadge,
                    {
                      backgroundColor: isDark ? 'rgba(163, 230, 53, 0.15)' : '#DBEAFE',
                      borderColor: isDark ? '#A3E635' : '#2563EB',
                    },
                  ]}
                >
                  <Home size={18} color={isDark ? '#A3E635' : '#2563EB'} />
                </View>

                <View style={styles.cardTextContent}>
                  <Text style={[styles.deptTitleText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                    Packaging Department
                  </Text>
                  <Text style={[styles.deptSubtitleText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                    Stage 2
                  </Text>
                </View>

                <View
                  style={[
                    styles.cardArrowCircle,
                    {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9',
                    },
                  ]}
                >
                  <ArrowUpRight size={16} color={isDark ? '#A3E635' : '#2563EB'} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Dotted Line Connector 3 (Left to Right) */}
            <View style={styles.connectorContainer}>
              <Svg height="32" width="100%" viewBox="0 0 350 32">
                <Path
                  d="M 150 0 L 150 16 L 240 16 L 240 32"
                  fill="none"
                  stroke={isDark ? '#A3E635' : '#3B82F6'}
                  strokeWidth="2.2"
                  strokeDasharray="5 5"
                />
              </Svg>
            </View>

            {/* Card 4: Inventory Location (Right Aligned) */}
            <View style={styles.rightCardWrapper}>
              <TouchableOpacity
                style={[
                  styles.deptCard,
                  {
                    backgroundColor: isDark ? 'rgba(4, 21, 28, 0.95)' : 'rgba(255, 255, 255, 0.88)',
                    borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#CBD5E1',
                  },
                ]}
                onPress={() => handleCardPress(departments[3])}
                activeOpacity={0.85}
              >
                <View
                  style={[
                    styles.deptIconBadge,
                    {
                      backgroundColor: isDark ? 'rgba(163, 230, 53, 0.15)' : '#DBEAFE',
                      borderColor: isDark ? '#A3E635' : '#2563EB',
                    },
                  ]}
                >
                  <Home size={18} color={isDark ? '#A3E635' : '#2563EB'} />
                </View>

                <View style={styles.cardTextContent}>
                  <Text style={[styles.deptTitleText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                    Inventory location
                  </Text>
                </View>

                <View
                  style={[
                    styles.cardArrowCircle,
                    {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9',
                    },
                  ]}
                >
                  <ArrowUpRight size={16} color={isDark ? '#A3E635' : '#2563EB'} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Right Glowing Microphone FAB */}
        <PulseFAB mode={mode} onPress={handleFabPress} />

        {/* Department Detail Modal Popup */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={selectedDept !== null}
          onRequestClose={() => setSelectedDept(null)}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setSelectedDept(null)}
          >
            <View
              style={[
                styles.modalContent,
                {
                  backgroundColor: isDark ? '#051319' : '#FFFFFF',
                  borderColor: isDark ? 'rgba(0, 229, 255, 0.3)' : '#CBD5E1',
                },
              ]}
              onStartShouldSetResponder={() => true}
            >
              <View style={styles.modalHeaderRow}>
                <View style={styles.modalTitleGroup}>
                  <View
                    style={[
                      styles.modalIconBox,
                      {
                        backgroundColor: isDark ? 'rgba(163, 230, 53, 0.15)' : '#DBEAFE',
                        borderColor: isDark ? '#A3E635' : '#2563EB',
                      },
                    ]}
                  >
                    <Package size={18} color={isDark ? '#A3E635' : '#2563EB'} />
                  </View>
                  <View>
                    <Text style={[styles.modalTitleText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                      {selectedDept?.title}
                    </Text>
                    {selectedDept?.subtitle && (
                      <Text style={[styles.modalSubtitleText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                        {selectedDept.subtitle}
                      </Text>
                    )}
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.closeModalBtn,
                    { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9' },
                  ]}
                  onPress={() => setSelectedDept(null)}
                  activeOpacity={0.8}
                >
                  <X size={15} color={isDark ? '#94A3B8' : '#64748B'} />
                </TouchableOpacity>
              </View>

              <View style={[styles.modalDivider, { backgroundColor: isDark ? '#1C3E49' : '#E2E8F0' }]} />

              {/* Status Badge & Active Items Count */}
              <View style={styles.statusRow}>
                <View style={styles.statusPillGroup}>
                  <CheckCircle2 size={14} color={isDark ? '#A3E635' : '#2563EB'} />
                  <Text style={[styles.statusPillText, { color: isDark ? '#A3E635' : '#2563EB' }]}>
                    Status: {selectedDept?.status}
                  </Text>
                </View>

                <Text style={[styles.activeItemsText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                  {selectedDept?.activeItemsCount} items processing
                </Text>
              </View>

              {/* Action Buttons */}
              <TouchableOpacity
                style={[
                  styles.modalActionBtn,
                  { backgroundColor: isDark ? '#A3E635' : '#2563EB' },
                ]}
                onPress={() => {
                  Alert.alert(
                    selectedDept?.title || 'Department Action',
                    `Auditing live inventory batch for ${selectedDept?.title}...`
                  );
                  setSelectedDept(null);
                }}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.modalActionBtnText,
                    { color: isDark ? '#000000' : '#FFFFFF' },
                  ]}
                >
                  Inspect Active Batch
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
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
    fontSize: 18.5,
    fontWeight: '800',
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
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 90,
  },
  timelineContainer: {
    gap: 0,
  },
  leftCardWrapper: {
    alignSelf: 'flex-start',
    width: '84%',
  },
  rightCardWrapper: {
    alignSelf: 'flex-end',
    width: '84%',
  },
  deptCard: {
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
    gap: 12,
    minHeight: 112,
    justifyContent: 'center',
    position: 'relative',
  },
  deptIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTextContent: {
    gap: 3,
  },
  deptTitleText: {
    fontSize: 17.5,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  deptSubtitleText: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Inter',
    marginTop: 2,
  },
  cardArrowCircle: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectorContainer: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 0,
  },

  /* Modal Popup Styles */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    gap: 14,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitleText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  modalSubtitleText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  closeModalBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDivider: {
    height: 1,
    width: '100%',
  },
  statusRow: {
    gap: 8,
  },
  statusPillGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusPillText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  activeItemsText: {
    fontSize: 12,
    fontFamily: 'Inter',
  },
  modalActionBtn: {
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  modalActionBtnText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
});
