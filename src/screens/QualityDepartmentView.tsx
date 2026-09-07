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
  Settings,
  CheckCircle2,
  Scale,
  Camera,
  QrCode,
} from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import { PulseFAB } from '../components/PulseFAB';

interface QualityDepartmentViewProps {
  mode: ThemeMode;
  onToggleTheme: () => void;
  onBack: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type QualityTab = 'PRINT_QR' | 'ADD_WEIGHT';

export const QualityDepartmentView: React.FC<QualityDepartmentViewProps> = ({
  mode,
  onToggleTheme,
  onBack,
}) => {
  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  const [activeTab, setActiveTab] = useState<QualityTab>('PRINT_QR');
  const [batchCount, setBatchCount] = useState<number>(0);
  const [isGenerateBatchOpen, setIsGenerateBatchOpen] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  // Form Fields for Quality Department Batch Generation
  const [quantity, setQuantity] = useState<string>('50');
  const [qrFor, setQrFor] = useState<string>('Oxywrap');
  const [coreWeight, setCoreWeight] = useState<string>('');
  const [rewinder, setRewinder] = useState<string>('');
  const [edge, setEdge] = useState<string>('');
  const [winder, setWinder] = useState<string>('');
  const [mixer, setMixer] = useState<string>('');

  const handleOpenGenerateBatchForm = () => {
    setIsGenerateBatchOpen(true);
  };

  const handleCreateNewBatch = () => {
    const qtyNum = parseInt(quantity.trim(), 10) || 50;
    const purposeText = qrFor.trim() || 'Oxywrap';

    setBatchCount((prev) => prev + 1);

    Alert.alert(
      'Batch Created Successfully',
      `Generated ${qtyNum} QR Code labels for "${purposeText}".\nBatch #${4820 + batchCount} is ready to view & print!`,
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

  const handlePrint = () => {
    if (batchCount === 0) {
      Alert.alert(
        'Generate Barcodes First',
        'Please tap the "+" button inside the card to create a batch before printing.',
        [
          { text: 'Generate Now', onPress: handleOpenGenerateBatchForm },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    } else {
      Alert.alert(
        'Printing Barcodes',
        `Sending Batch #${4819 + batchCount} (${batchCount * 50} QR labels) to thermal printer...`,
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  const handleScanCamera = () => {
    Alert.alert(
      'Camera & Hardware Scanner',
      'Pull the trigger on your hardware scanner OR point your camera at the QR code.',
      [
        {
          text: 'Simulate Scan',
          onPress: () => {
            Alert.alert(
              'QR Code Scanned Successfully!',
              'Scanned Item: Core Roll #9914\nGross Weight: 124.50 kg\nTare Weight: 4.20 kg\nNet Weight: 120.30 kg',
              [{ text: 'Save Weight Data', style: 'default' }]
            );
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleFabPress = () => {
    Alert.alert(
      'Quality Voice Assistant',
      'Choose an action for Quality Department:',
      [
        { text: 'Generate New Batch', onPress: handleOpenGenerateBatchForm },
        { text: 'Print Labels', onPress: handlePrint },
        { text: 'Scan QR Code', onPress: handleScanCamera },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  if (isGenerateBatchOpen) {
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
          {/* Header: Back Arrow + Title + Subtitle */}
          <View style={[styles.batchHeader, { backgroundColor: theme.headerBg }]}>
            <TouchableOpacity
              style={[styles.backBtnCircle, { backgroundColor: theme.menuBg }]}
              onPress={() => setIsGenerateBatchOpen(false)}
              activeOpacity={0.8}
            >
              <ChevronLeft size={20} color={theme.headerText} />
            </TouchableOpacity>

            <View style={styles.batchTitleGroup}>
              <Text style={[styles.batchMainTitle, { color: theme.headerText }]}>
                Generate New Batch
              </Text>
              <Text style={[styles.batchSubTitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                Create Multiple QR Codes Instantly
              </Text>
            </View>
          </View>

          <View style={[styles.batchDivider, { backgroundColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1' }]} />

          {/* Form Content */}
          <ScrollView
            contentContainerStyle={styles.batchFormScrollContent}
            showsVerticalScrollIndicator={false}
          >
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

            {/* Field 3: Core Weight */}
            <View style={styles.batchFieldGroup}>
              <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                Core Weight
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
                  placeholder="eg. 90"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  keyboardType="numeric"
                  value={coreWeight}
                  onChangeText={setCoreWeight}
                />
              </View>
            </View>

            {/* Field 4: Rewinder */}
            <View style={styles.batchFieldGroup}>
              <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                Rewinder
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
                  placeholder="Enter Rewinder"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  value={rewinder}
                  onChangeText={setRewinder}
                />
              </View>
            </View>

            {/* Field 5: Edge */}
            <View style={styles.batchFieldGroup}>
              <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                Edge
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
                  placeholder="Enter Edge"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  value={edge}
                  onChangeText={setEdge}
                />
              </View>
            </View>

            {/* Field 6: Winder */}
            <View style={styles.batchFieldGroup}>
              <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                Winder
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
                  placeholder="Enter winder"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  value={winder}
                  onChangeText={setWinder}
                />
              </View>
            </View>

            {/* Field 7: Mixer */}
            <View style={styles.batchFieldGroup}>
              <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                Mixer
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
                  placeholder="Enter Mixer"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  value={mixer}
                  onChangeText={setMixer}
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
          </ScrollView>
        </View>
      </View>
    );
  }

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

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={[styles.departmentLabelText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
            Quality Department
          </Text>

          <View
            style={[
              styles.segmentedTabBar,
              {
                backgroundColor: isDark ? '#020C10' : '#F1F5F9',
                borderColor: isDark ? 'rgba(0, 229, 255, 0.35)' : '#CBD5E1',
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'PRINT_QR' && {
                  backgroundColor: isDark ? '#A3E635' : '#2563EB',
                },
              ]}
              onPress={() => setActiveTab('PRINT_QR')}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.segmentTabText,
                  {
                    color:
                      activeTab === 'PRINT_QR'
                        ? isDark
                          ? '#000000'
                          : '#FFFFFF'
                        : isDark
                        ? '#A3E635'
                        : '#2563EB',
                  },
                ]}
              >
                Print Core Qr Label
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'ADD_WEIGHT' && {
                  backgroundColor: isDark ? '#A3E635' : '#2563EB',
                },
              ]}
              onPress={() => setActiveTab('ADD_WEIGHT')}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.segmentTabText,
                  {
                    color:
                      activeTab === 'ADD_WEIGHT'
                        ? isDark
                          ? '#000000'
                          : '#FFFFFF'
                        : isDark
                        ? '#A3E635'
                        : '#2563EB',
                  },
                ]}
              >
                Add Gross Weight
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'PRINT_QR' ? (
            isGenerated ? (
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
                      {quantity.trim() ? `${quantity.trim()} Barcodes` : '50 Barcodes'}
                    </Text>
                  </View>
                </View>

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
                        <View style={styles.qrIconSquare}>
                          <QrCode size={20} color="#000000" strokeWidth={2.5} />
                        </View>

                        <View style={styles.qrItemInfo}>
                          <Text style={[styles.qrItemTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                            {item.title}
                          </Text>
                          <Text style={[styles.qrItemTimestamp, { color: isDark ? '#64748B' : '#94A3B8' }]}>
                            {item.timestamp}
                          </Text>
                        </View>

                        <View style={styles.qrItemTagsGroup}>
                          <View style={[styles.tagPill, { backgroundColor: isDark ? '#032D2B' : '#DCFCE7' }]}>
                            <Text style={[styles.tagPillText, { color: isDark ? '#10B981' : '#166534' }]}>
                              {item.tag1}
                            </Text>
                          </View>
                          <View style={[styles.tagPill, { backgroundColor: isDark ? '#032D2B' : '#DCFCE7' }]}>
                            <Text style={[styles.tagPillText, { color: isDark ? '#10B981' : '#166534' }]}>
                              {item.tag2}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>

                <View style={[styles.cardBottomDivider, { backgroundColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1' }]} />

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
                    Ready to generate?
                  </Text>
                  <Text style={[styles.cardSubheadingText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                    Manage & Generate QR Codes
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
                  <Text
                    style={[
                      styles.innerInstructionText,
                      { color: isDark ? '#8E9BAE' : '#64748B' },
                    ]}
                  >
                    Tap The + Button Below To{'\n'}Create Your First Batch Of Barcodes
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
                        {batchCount} Batches Generated ({batchCount * 50} QR Labels)
                      </Text>
                    </View>
                  )}
                </View>

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
                  Ready to Scan?
                </Text>
                <Text style={[styles.cardSubheadingText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                  Scan & Fill Details - Manage Comprehensive Barcode Data
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
                <Text
                  style={[
                    styles.innerInstructionText,
                    { color: isDark ? '#8E9BAE' : '#64748B' },
                  ]}
                >
                  Pull The Trigger On Your Hardware{'\n'}Scanner OR Tap The Camera Icon{'\n'}Below To Scan A QR Code
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
                  onPress={handleScanCamera}
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

        <View style={styles.bottomControlsBar}>
          <TouchableOpacity
            style={[
              styles.settingsBtnCircle,
              {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#CBD5E1',
              },
            ]}
            onPress={() => Alert.alert('Settings', 'Quality Department Configuration Options')}
            activeOpacity={0.8}
          >
            <Settings size={20} color={isDark ? '#94A3B8' : '#64748B'} />
          </TouchableOpacity>

        </View>
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

  /* Segmented Pill Tab Bar */
  segmentedTabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    padding: 3,
    borderWidth: 1,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentTabText: {
    fontSize: 13.5,
    fontWeight: '700',
    fontFamily: 'Inter',
  },

  /* Main Hero Card Container */
  mainHeroCard: {
    borderRadius: 28,
    paddingVertical: 26,
    paddingHorizontal: 22,
    borderWidth: 1.5,
    gap: 24,
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
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  innerInstructionText: {
    fontSize: 14.5,
    fontWeight: '600',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 22,
  },
  bigPlusCircleOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusBtnCircleInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
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

  /* Bottom Print Pill Button */
  printButtonPill: {
    width: '75%',
    paddingVertical: 15,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  printButtonText: {
    fontSize: 17.5,
    fontWeight: '800',
    fontFamily: 'Inter',
  },

  /* Form Fields Group */
  formFieldsGroup: {
    width: '100%',
    gap: 14,
  },
  fieldWrapper: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter',
    padding: 0,
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
  },
  qrIconSquare: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#A3E635',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrItemInfo: {
    flex: 1,
    marginLeft: 12,
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
  },
  tagPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
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
