import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import {
  ChevronLeft,
  Menu,
  Plus,
  ChevronRight,
  Settings,
  CheckCircle2,
  PackageCheck,
  QrCode,
  Camera,
} from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import { PulseFAB } from '../components/PulseFAB';

interface PackagingStage1ViewProps {
  mode: ThemeMode;
  onToggleTheme: () => void;
  onBack: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type PackagingTab = 'PRINT_INNER_LABEL' | 'TRANSFER_INFO';

export const PackagingStage1View: React.FC<PackagingStage1ViewProps> = ({
  mode,
  onToggleTheme,
  onBack,
}) => {
  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  const [activeTab, setActiveTab] = useState<PackagingTab>('PRINT_INNER_LABEL');
  const [selectedBarcodeOption, setSelectedBarcodeOption] = useState<string>('50 Barcodes');
  const [batchCount, setBatchCount] = useState<number>(0);
  const [isGenerateBatchOpen, setIsGenerateBatchOpen] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  // Form Fields for "Generate New Batch"
  const [quantity, setQuantity] = useState<string>('50');
  const [qrFor, setQrFor] = useState<string>('Oxywrap');

  const handleOpenGenerateBatchForm = () => {
    setIsGenerateBatchOpen(true);
  };

  const handleCreateNewBatch = () => {
    const qtyNum = parseInt(quantity.trim(), 10) || 50;
    const purposeText = qrFor.trim() || 'Oxywrap';

    setBatchCount((prev) => prev + 1);

    Alert.alert(
      'Batch Created Successfully',
      `Generated ${qtyNum} Barcodes for "${purposeText}".\nBatch #${7200 + batchCount} is ready to view & print!`,
      [
        {
          text: 'OK',
          onPress: () => {
            setIsGenerateBatchOpen(false);
            setIsGenerated(true);
          },
        },
      ]
    );
  };

  const generateQrItems = () => {
    const count = 7;
    const purposeTag = qrFor.trim() || 'Oxywrap';
    const items = [];
    for (let i = 1; i <= count; i++) {
      items.push({
        id: `qr-${i}`,
        title: `QR Codes ${i}`,
        timestamp: '01/09/2026 . 01:10 PM',
        tag1: purposeTag,
        tag2: 'Printed',
      });
    }
    return items;
  };

  const handleSelectBarcodeOption = () => {
    Alert.alert(
      'Select Barcode Batch Quantity',
      'Choose quantity of inner carton barcodes to generate:',
      [
        { text: '25 Barcodes', onPress: () => setSelectedBarcodeOption('25 Barcodes') },
        { text: '50 Barcodes', onPress: () => setSelectedBarcodeOption('50 Barcodes') },
        { text: '100 Barcodes', onPress: () => setSelectedBarcodeOption('100 Barcodes') },
        { text: '200 Barcodes', onPress: () => setSelectedBarcodeOption('200 Barcodes') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handlePrint = () => {
    setIsGenerateBatchOpen(true);
  };

  const handleTransferInfo = () => {
    Alert.alert(
      'Transfer Info Scanner Active',
      'Scan Core QR code to transfer manufacturing specs & lot numbers to Inner Carton label.',
      [
        {
          text: 'Simulate Core Scan & Transfer',
          onPress: () => {
            Alert.alert(
              'Info Transferred Successfully!',
              'Source: Core #9914\nDestination: Inner Carton Box #IC-4482\nLot: L-88402 | Weight: 120.30 kg',
              [{ text: 'Print Transferred Label', onPress: handlePrint }]
            );
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleFabPress = () => {
    Alert.alert(
      'Packaging Stage 1 Assistant',
      'Choose an action for Packaging Stage 1:',
      [
        { text: 'Generate Barcode Batch', onPress: handleOpenGenerateBatchForm },
        { text: 'Transfer Info from Core', onPress: handleTransferInfo },
        { text: 'Print Inner Carton Labels', onPress: handlePrint },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={[styles.outerWrapper, { backgroundColor: isDark ? '#000000' : '#E2E8F0' }]}>
      {/* Mobile Container Frame (390 x 844 px) */}
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

        {/* Header Bar */}
        <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={[styles.backBtnCircle, { backgroundColor: theme.menuBg }]}
              onPress={onBack}
              activeOpacity={0.8}
            >
              <ChevronLeft size={20} color={theme.headerText} />
            </TouchableOpacity>

            <Text style={[styles.headerTitle, { color: theme.headerText }]}>
              Staff Dashboard
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

        {/* Main Content Area */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Subtitle Heading: Packaging Department Stage 1 */}
          <Text style={[styles.departmentLabelText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
            Packaging Department Stage 1
          </Text>

          {/* Segmented Stacked Pill Toggle Bar */}
          <View
            style={[
              styles.segmentedTabBar,
              {
                backgroundColor: isDark ? '#020C10' : '#F1F5F9',
                borderColor: isDark ? 'rgba(0, 229, 255, 0.35)' : '#CBD5E1',
              },
            ]}
          >
            {/* Top Tab: Print and Create Inner Carton Label */}
            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'PRINT_INNER_LABEL' && {
                  backgroundColor: isDark ? '#A3E635' : '#2563EB',
                },
              ]}
              onPress={() => setActiveTab('PRINT_INNER_LABEL')}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.segmentTabText,
                  {
                    color:
                      activeTab === 'PRINT_INNER_LABEL'
                        ? isDark
                          ? '#000000'
                          : '#FFFFFF'
                        : isDark
                        ? '#A3E635'
                        : '#2563EB',
                  },
                ]}
              >
                Print and Create Inner Carton Label
              </Text>
            </TouchableOpacity>

            {/* Bottom Tab: Transfer Info from Core to Inner Carton */}
            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'TRANSFER_INFO' && {
                  backgroundColor: isDark ? '#A3E635' : '#2563EB',
                },
              ]}
              onPress={() => setActiveTab('TRANSFER_INFO')}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.segmentTabText,
                  {
                    color:
                      activeTab === 'TRANSFER_INFO'
                        ? isDark
                          ? '#000000'
                          : '#FFFFFF'
                        : isDark
                        ? '#A3E635'
                        : '#2563EB',
                  },
                ]}
              >
                Transfer Info from Core to Inner Carton
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab 1 Body: Print and Create Inner Carton Label */}
          {activeTab === 'PRINT_INNER_LABEL' ? (
            isGenerated ? (
              /* ================= SECOND PAGE: GENERATED QR CODES VIEW ================= */
              <View
                style={[
                  styles.mainHeroCard,
                  {
                    backgroundColor: isDark
                      ? 'rgba(4, 21, 28, 0.95)'
                      : 'rgba(255, 255, 255, 0.9)',
                    borderColor: isDark ? 'rgba(0, 229, 255, 0.3)' : '#CBD5E1',
                    paddingVertical: 18,
                    paddingHorizontal: 16,
                    gap: 14,
                  },
                ]}
              >
                {/* Top Header Line inside Card: Back Arrow + Oxywrap Title + Qty Badge */}
                <View style={styles.generatedCardHeaderRow}>
                  <TouchableOpacity
                    style={styles.generatedBackGroup}
                    onPress={() => setIsGenerated(false)}
                    activeOpacity={0.7}
                  >
                    <ChevronLeft size={22} color={isDark ? '#FFFFFF' : '#0F172A'} />
                    <Text style={[styles.generatedTitleText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                      {qrFor.trim() || 'Oxywrap'}
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={[
                      styles.badgeCapsule,
                      {
                        backgroundColor: isDark ? 'rgba(0, 229, 255, 0.12)' : 'rgba(37, 99, 235, 0.1)',
                        borderColor: isDark ? 'rgba(0, 229, 255, 0.3)' : 'rgba(37, 99, 235, 0.3)',
                      },
                    ]}
                  >
                    <Text style={[styles.badgeCapsuleText, { color: isDark ? '#94A3B8' : '#475569' }]}>
                      {quantity.trim() ? `${quantity.trim()} Barcodes` : selectedBarcodeOption}
                    </Text>
                  </View>
                </View>

                {/* Scrollable Generated QR Code Items */}
                <View style={{ maxHeight: 380, width: '100%' }}>
                  <ScrollView
                    contentContainerStyle={styles.qrListScrollContent}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                  >
                    {generateQrItems().map((item) => (
                      <View
                        key={item.id}
                        style={[
                          styles.qrItemCard,
                          {
                            backgroundColor: isDark ? '#02141A' : '#F8FAFC',
                            borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#E2E8F0',
                          },
                        ]}
                      >
                        {/* Left QR Icon Square */}
                        <View style={styles.qrIconSquare}>
                          <QrCode size={20} color="#000000" strokeWidth={2.5} />
                        </View>

                        {/* Middle Details */}
                        <View style={styles.qrItemInfo}>
                          <Text
                            style={[styles.qrItemTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {item.title}
                          </Text>
                          <Text
                            style={[styles.qrItemTimestamp, { color: isDark ? '#64748B' : '#94A3B8' }]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {item.timestamp}
                          </Text>
                        </View>

                        {/* Right Tags */}
                        <View style={styles.qrItemTagsGroup}>
                          <View style={[styles.tagPill, { backgroundColor: isDark ? '#032D2B' : '#DCFCE7' }]}>
                            <Text
                              style={[styles.tagPillText, { color: isDark ? '#10B981' : '#166534' }]}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {item.tag1}
                            </Text>
                          </View>
                          <View style={[styles.tagPill, { backgroundColor: isDark ? '#032D2B' : '#DCFCE7' }]}>
                            <Text
                              style={[styles.tagPillText, { color: isDark ? '#10B981' : '#166534' }]}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {item.tag2}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>

                {/* Bottom Divider inside Card */}
                <View style={[styles.cardBottomDivider, { backgroundColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1' }]} />

                {/* Bottom Action Row inside Card: Small (+) Icon & Print Pill Button */}
                <View style={styles.generatedBottomActionBar}>
                  <TouchableOpacity
                    style={[styles.smallPlusBtnCircle, { backgroundColor: isDark ? '#A3E635' : '#2563EB' }]}
                    onPress={handleOpenGenerateBatchForm}
                    activeOpacity={0.8}
                  >
                    <Plus size={24} color={isDark ? '#000000' : '#FFFFFF'} strokeWidth={3} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.generatedPrintBtnPill, { backgroundColor: isDark ? '#A3E635' : '#2563EB' }]}
                    onPress={handlePrint}
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.generatedPrintBtnText, { color: isDark ? '#000000' : '#FFFFFF' }]}>
                      Print
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              /* Initial Ready to Generate Card View */
              <View
                style={[
                  styles.mainHeroCard,
                  {
                    backgroundColor: isDark
                      ? 'rgba(4, 21, 28, 0.95)'
                      : 'rgba(255, 255, 255, 0.9)',
                    borderColor: isDark ? 'rgba(0, 229, 255, 0.3)' : '#CBD5E1',
                  },
                ]}
              >
                {/* Card Heading & Subheading */}
                <View style={styles.cardHeaderGroup}>
                  <Text style={[styles.cardHeadingText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                    Ready to generate?
                  </Text>
                  <Text style={[styles.cardSubheadingText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                    Manage & Generate QR Codes
                  </Text>
                </View>

                {/* Inner Glowing Action Box */}
                <View
                  style={[
                    styles.innerActionBox,
                    {
                      backgroundColor: isDark ? '#020C10' : '#FFFFFF',
                      borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#E2E8F0',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.innerInstructionText,
                      { color: isDark ? '#8E9BAE' : '#64748B' },
                    ]}
                  >
                    Tap The + Button Below To{'\n'}Create Your First Batch Of Barcodes
                  </Text>

                  {/* Big Glowing Plus Button */}
                  <TouchableOpacity
                    style={[
                      styles.bigPlusCircleOuter,
                      {
                        backgroundColor: isDark
                          ? 'rgba(0, 229, 255, 0.08)'
                          : 'rgba(37, 99, 235, 0.08)',
                        borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : 'rgba(37, 99, 235, 0.25)',
                      },
                    ]}
                    onPress={handleOpenGenerateBatchForm}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.plusBtnCircleInner,
                        {
                          backgroundColor: isDark ? '#A3E635' : '#2563EB',
                        },
                      ]}
                    >
                      <Plus size={34} color={isDark ? '#000000' : '#FFFFFF'} strokeWidth={3.5} />
                    </View>
                  </TouchableOpacity>

                  {batchCount > 0 && (
                    <View style={styles.batchCountBadge}>
                      <CheckCircle2 size={15} color={isDark ? '#A3E635' : '#2563EB'} />
                      <Text
                        style={[
                          styles.batchCountText,
                          { color: isDark ? '#A3E635' : '#2563EB' },
                        ]}
                      >
                        {batchCount} Batches Created ({selectedBarcodeOption})
                      </Text>
                    </View>
                  )}
                </View>

                {/* Oxywrap Barcode Selector Box */}
                <View style={styles.oxywrapSectionWrapper}>
                  <Text style={[styles.oxywrapLabelText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                    Oxywrap
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.barcodeSelectorBox,
                      {
                        backgroundColor: isDark ? '#020C10' : '#FFFFFF',
                        borderColor: isDark ? 'rgba(0, 229, 255, 0.3)' : '#CBD5E1',
                      },
                    ]}
                    onPress={handleSelectBarcodeOption}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.barcodeOptionText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                      {selectedBarcodeOption}
                    </Text>
                    <ChevronRight size={18} color={isDark ? '#94A3B8' : '#64748B'} />
                  </TouchableOpacity>
                </View>

                {/* Bottom Print Pill Button */}
                <TouchableOpacity
                  style={[
                    styles.printButtonPill,
                    {
                      backgroundColor: isDark ? '#A3E635' : '#2563EB',
                    },
                  ]}
                  onPress={handlePrint}
                  activeOpacity={0.85}
                >
                  <Text
                    style={[
                      styles.printButtonText,
                      { color: isDark ? '#000000' : '#FFFFFF' },
                    ]}
                  >
                    Print
                  </Text>
                </TouchableOpacity>
              </View>
            )
          ) : (
            /* Tab 2 Body: Transfer Info from Core to Inner Carton */
            <View
              style={[
                styles.mainHeroCard,
                {
                  backgroundColor: isDark
                    ? 'rgba(4, 21, 28, 0.95)'
                    : 'rgba(255, 255, 255, 0.9)',
                  borderColor: isDark ? 'rgba(0, 229, 255, 0.3)' : '#CBD5E1',
                },
              ]}
            >
              <View style={styles.cardHeaderGroup}>
                <Text style={[styles.cardHeadingText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                  Link Carton?
                </Text>
                <Text style={[styles.cardSubheadingText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                  Core Information Pair To Inner Carton Boxes
                </Text>
              </View>

              <View
                style={[
                  styles.innerActionBox,
                  {
                    backgroundColor: isDark ? '#020C10' : '#FFFFFF',
                    borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#E2E8F0',
                  },
                ]}
              >
                <Text style={[styles.cardHeadingText, { fontSize: 18, color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                  Ready To Pair
                </Text>

                <Text
                  style={[
                    styles.innerInstructionText,
                    { color: isDark ? '#8E9BAE' : '#64748B' },
                  ]}
                >
                  Scan The Core Box First, Followed By{'\n'}The Inner Carton To Link Them
                </Text>

                <TouchableOpacity
                  style={[
                    styles.bigPlusCircleOuter,
                    {
                      backgroundColor: isDark
                        ? 'rgba(0, 229, 255, 0.08)'
                        : 'rgba(37, 99, 235, 0.08)',
                      borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : 'rgba(37, 99, 235, 0.25)',
                    },
                  ]}
                  onPress={handleTransferInfo}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.plusBtnCircleInner,
                      {
                        backgroundColor: isDark ? '#A3E635' : '#2563EB',
                      },
                    ]}
                  >
                    <Camera size={30} color={isDark ? '#000000' : '#FFFFFF'} strokeWidth={2.2} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Bottom Navigation & Controls Bar */}
        <View style={styles.bottomControlsBar}>
          <TouchableOpacity
            style={[
              styles.settingsBtnCircle,
              {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#CBD5E1',
              },
            ]}
            onPress={() => Alert.alert('Settings', 'Packaging Stage 1 Options')}
            activeOpacity={0.8}
          >
            <Settings size={20} color={isDark ? '#94A3B8' : '#64748B'} />
          </TouchableOpacity>

          <PulseFAB mode={mode} onPress={handleFabPress} />
        </View>

        {/* ================= BOTTOM SHEET OVERLAY MODAL (Image 1) ================= */}
        {isGenerateBatchOpen && (
          <View style={styles.modalBackdropOverlay}>
            <TouchableOpacity
              style={styles.modalBackdropTouchable}
              activeOpacity={1}
              onPress={() => setIsGenerateBatchOpen(false)}
            />

            <View
              style={[
                styles.bottomSheetCard,
                {
                  backgroundColor: isDark ? '#020C10' : '#FFFFFF',
                  borderColor: isDark ? 'rgba(0, 229, 255, 0.35)' : '#CBD5E1',
                },
              ]}
            >
              {/* Bottom Sheet Header */}
              <View style={styles.sheetHeaderGroup}>
                <Text style={[styles.sheetMainTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                  Generate New Parent QR
                </Text>
                <Text style={[styles.sheetSubTitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                  Create Multiple QR Codes Instantly
                </Text>
              </View>

              <View style={[styles.sheetDivider, { backgroundColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#E2E8F0' }]} />

              {/* Field 1: Quantity */}
              <View style={styles.batchFieldGroup}>
                <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                  Quantity
                </Text>
                <View
                  style={[
                    styles.batchInputWrapper,
                    {
                      backgroundColor: isDark ? '#01080B' : '#F8FAFC',
                      borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#CBD5E1',
                    },
                  ]}
                >
                  <TextInput
                    style={[styles.batchTextInput, { color: isDark ? '#FFFFFF' : '#0F172A' }]}
                    placeholder="eg. 50"
                    placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                    keyboardType="numeric"
                    value={quantity}
                    onChangeText={setQuantity}
                  />
                </View>
              </View>

              {/* Field 2: Identifier / Purpose (qrFor) */}
              <View style={styles.batchFieldGroup}>
                <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                  Identifier / Purpose (qrFor)
                </Text>
                <View
                  style={[
                    styles.batchInputWrapper,
                    {
                      backgroundColor: isDark ? '#01080B' : '#F8FAFC',
                      borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#CBD5E1',
                    },
                  ]}
                >
                  <TextInput
                    style={[styles.batchTextInput, { color: isDark ? '#FFFFFF' : '#0F172A' }]}
                    placeholder="eg. Test1. Gg..."
                    placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                    value={qrFor}
                    onChangeText={setQrFor}
                  />
                </View>
              </View>

              {/* Submit Button: Generate */}
              <TouchableOpacity
                style={[
                  styles.generateSubmitBtn,
                  {
                    backgroundColor: isDark ? '#A3E635' : '#2563EB',
                  },
                ]}
                onPress={handleCreateNewBatch}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.generateSubmitBtnText,
                    { color: isDark ? '#000000' : '#FFFFFF' },
                  ]}
                >
                  Generate
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    height: '100%',
    maxHeight: 844,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    position: 'relative',
  },
  darkCyanGlow: {
    position: 'absolute',
    top: 50,
    left: '5%',
    width: 320,
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
  backBtnCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 110,
    gap: 16,
  },

  /* Department Label Sub-header */
  departmentLabelText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
    marginTop: 2,
  },

  /* Segmented Stacked Tab Bar */
  segmentedTabBar: {
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    gap: 4,
  },
  segmentTab: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentTabText: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Inter',
    textAlign: 'center',
  },

  /* Main Hero Card Container */
  mainHeroCard: {
    borderRadius: 28,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    gap: 20,
    alignItems: 'center',
  },
  cardHeaderGroup: {
    alignItems: 'center',
    gap: 6,
  },
  cardHeadingText: {
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  cardSubheadingText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 19,
  },

  /* Inner Action Box */
  innerActionBox: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 28,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 22,
  },
  innerInstructionText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 20,
  },
  bigPlusCircleOuter: {
    width: 106,
    height: 106,
    borderRadius: 53,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusBtnCircleInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  batchCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  batchCountText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter',
  },

  /* Oxywrap Barcode Section */
  oxywrapSectionWrapper: {
    width: '100%',
    gap: 6,
  },
  oxywrapLabelText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  barcodeSelectorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  barcodeOptionText: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
  },

  /* Bottom Print Pill Button */
  printButtonPill: {
    width: '75%',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  printButtonText: {
    fontSize: 17,
    fontWeight: '800',
    fontFamily: 'Inter',
  },

  /* Bottom Controls Bar */
  bottomControlsBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    pointerEvents: 'box-none',
  },
  settingsBtnCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ================= GENERATE NEW BATCH STYLES ================= */
  batchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 14,
    gap: 12,
  },
  batchTitleGroup: {
    gap: 2,
  },
  batchMainTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  batchSubTitle: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  batchDivider: {
    height: 1,
    width: '100%',
  },
  batchFormScrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 14,
  },
  batchFieldGroup: {
    gap: 6,
  },
  batchFieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  batchInputWrapper: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  batchTextInput: {
    fontSize: 14,
    fontFamily: 'Inter',
    padding: 0,
  },
  generateSubmitBtn: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  generateSubmitBtnText: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Inter',
  },

  /* ================= GENERATED QR LIST STYLES ================= */
  generatedCardHeaderRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  generatedBackGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  generatedTitleText: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  badgeCapsule: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeCapsuleText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  qrListScrollContent: {
    gap: 10,
    paddingBottom: 6,
  },
  qrItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 56,
  },
  qrIconSquare: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#A3E635',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  qrItemInfo: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
    justifyContent: 'center',
    gap: 2,
  },
  qrItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  qrItemTimestamp: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  qrItemTagsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  tagPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    maxWidth: 95,
  },
  tagPillText: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  cardBottomDivider: {
    height: 1,
    width: '100%',
    marginTop: 4,
  },
  generatedBottomActionBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  smallPlusBtnCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  generatedPrintBtnPill: {
    flex: 1,
    height: 46,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  generatedPrintBtnText: {
    fontSize: 16.5,
    fontWeight: '800',
    fontFamily: 'Inter',
  },

  /* ================= BOTTOM SHEET OVERLAY STYLES ================= */
  modalBackdropOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    zIndex: 100,
    justifyContent: 'flex-end',
  },
  modalBackdropTouchable: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomSheetCard: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 32,
    gap: 16,
  },
  sheetHeaderGroup: {
    gap: 3,
  },
  sheetMainTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  sheetSubTitle: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  sheetDivider: {
    height: 1,
    width: '100%',
    marginVertical: 2,
  },
});
