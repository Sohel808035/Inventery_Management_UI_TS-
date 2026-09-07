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
  Modal,
} from 'react-native';
import {
  ChevronLeft,
  Menu,
  Plus,
  ChevronRight,
  ChevronDown,
  Settings,
  CheckCircle2,
  PackageCheck,
  QrCode,
  Camera,
  Link,
  Info,
  X,
} from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import { PulseFAB } from '../components/PulseFAB';

interface PackagingStage2ViewProps {
  mode: ThemeMode;
  onToggleTheme: () => void;
  onBack: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Stage2Tab = 'CREATE_OUTER_CARTON' | 'BOX_LINK';

export const PackagingStage2View: React.FC<PackagingStage2ViewProps> = ({
  mode,
  onToggleTheme,
  onBack,
}) => {
  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  const [activeTab, setActiveTab] = useState<Stage2Tab>('CREATE_OUTER_CARTON');
  const [batchCount, setBatchCount] = useState<number>(0);
  const [isGenerateBatchOpen, setIsGenerateBatchOpen] = useState<boolean>(false);
  const [isCartonDetailsOpen, setIsCartonDetailsOpen] = useState<boolean>(false);

  // Form Fields
  const [quantity, setQuantity] = useState<string>('50');
  const [selectedProduct, setSelectedProduct] = useState<string>('Tap to select a product');
  const [selectedMarket, setSelectedMarket] = useState<string>('Tap to select a market Name');
  const [identifierPurpose, setIdentifierPurpose] = useState<string>('eg. Pallet, Outer Carton');
  const [barcodeNumber, setBarcodeNumber] = useState<string>('');
  const [skuCode, setSkuCode] = useState<string>('');
  const [skuName, setSkuName] = useState<string>('');
  const [batchNumber, setBatchNumber] = useState<string>('');
  const [shift, setShift] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [packedBy, setPackedBy] = useState<string>('');

  const handleOpenGenerateBatchForm = () => {
    setIsGenerateBatchOpen(true);
  };

  const handleCreateNewBatch = () => {
    setIsGenerateBatchOpen(false);
    setIsCartonDetailsOpen(true);
  };

  const handleSelectProduct = () => {
    Alert.alert(
      'Select Product',
      'Choose a product for this outer carton batch:',
      [
        { text: 'Oxywrap Premium Stretch Film', onPress: () => setSelectedProduct('Oxywrap Premium Stretch Film') },
        { text: 'Cling Wrap Heavy Duty', onPress: () => setSelectedProduct('Cling Wrap Heavy Duty') },
        { text: 'Stretch Roll 500mm', onPress: () => setSelectedProduct('Stretch Roll 500mm') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleSelectMarket = () => {
    Alert.alert(
      'Select Market Name',
      'Choose target market destination:',
      [
        { text: 'Domestic Market - North', onPress: () => setSelectedMarket('Domestic Market - North') },
        { text: 'Export Market - Batch A', onPress: () => setSelectedMarket('Export Market - Batch A') },
        { text: 'Institutional Supply', onPress: () => setSelectedMarket('Institutional Supply') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleGenerateCartonDetails = () => {
    setBatchCount((prev) => prev + 1);

    Alert.alert(
      'Carton Details & Barcodes Generated',
      `Product: ${selectedProduct === 'Tap to select a product' ? 'Oxywrap' : selectedProduct}\nMarket: ${selectedMarket === 'Tap to select a market Name' ? 'Default' : selectedMarket}\nBatch #${9100 + batchCount} created successfully!`,
      [
        {
          text: 'OK',
          onPress: () => {
            setIsCartonDetailsOpen(false);
          },
        },
      ]
    );
  };

  const generateQrItems = () => {
    const count = 7;
    const purposeTag =
      identifierPurpose.trim() && identifierPurpose !== 'eg. Pallet, Outer Carton'
        ? identifierPurpose.trim()
        : 'Oxywrap';
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
    setIsGenerateBatchOpen(true);
  };

  const handleBoxLinkScan = () => {
    Alert.alert(
      'Box Link Scanner Active',
      'Scan Parent Outer Carton barcode first, followed by Child Inner Cartons to bind lot lineage.',
      [
        {
          text: 'Simulate Linking Outer & Inner',
          onPress: () => {
            Alert.alert(
              'Box Linking Successful!',
              'Parent Box: #OUTER-8840\nChild Boxes Linked: 5/5 Inner Cartons\nLot Lineage: Verified & Saved to Master DB',
              [{ text: 'OK', style: 'default' }]
            );
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleFabPress = () => {
    Alert.alert(
      'Packaging Stage 2 Assistant',
      'Choose an action for Packaging Stage 2:',
      [
        { text: 'Set Carton Details', onPress: () => setIsCartonDetailsOpen(true) },
        { text: 'Generate Parent QR Batch', onPress: handleOpenGenerateBatchForm },
        { text: 'Link Boxes (Parent-Child)', onPress: handleBoxLinkScan },
        { text: 'Print Outer Carton Labels', onPress: handlePrint },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  if (isCartonDetailsOpen) {
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
          {/* Header Bar: Back Arrow + Title */}
          <View style={[styles.batchHeader, { backgroundColor: theme.headerBg }]}>
            <TouchableOpacity
              style={[styles.backBtnCircle, { backgroundColor: theme.menuBg }]}
              onPress={() => setIsCartonDetailsOpen(false)}
              activeOpacity={0.8}
            >
              <ChevronLeft size={20} color={theme.headerText} />
            </TouchableOpacity>

            <Text style={[styles.batchMainTitle, { color: theme.headerText }]}>
              Carton Details
            </Text>
          </View>

          <View style={[styles.batchDivider, { backgroundColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1' }]} />

          {/* Scrollable Form Content */}
          <ScrollView
            contentContainerStyle={styles.batchFormScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Section 1: Product Information */}
            <Text style={[styles.sectionHeadingText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
              Product Information
            </Text>

            {/* 1. Select Product */}
            <View style={styles.batchFieldGroup}>
              <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                Select Product
              </Text>
              <TouchableOpacity
                style={[
                  styles.selectDropdownWrapper,
                  {
                    backgroundColor: isDark ? '#01080B' : '#F8FAFC',
                    borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#CBD5E1',
                  },
                ]}
                onPress={handleSelectProduct}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.selectDropdownText,
                    {
                      color:
                        selectedProduct === 'Tap to select a product'
                          ? isDark
                            ? '#64748B'
                            : '#94A3B8'
                          : isDark
                          ? '#FFFFFF'
                          : '#0F172A',
                    },
                  ]}
                >
                  {selectedProduct}
                </Text>
                <ChevronDown size={18} color={isDark ? '#64748B' : '#94A3B8'} />
              </TouchableOpacity>
            </View>

            {/* 2. Select Market Name */}
            <View style={styles.batchFieldGroup}>
              <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                Select Market Name
              </Text>
              <TouchableOpacity
                style={[
                  styles.selectDropdownWrapper,
                  {
                    backgroundColor: isDark ? '#01080B' : '#F8FAFC',
                    borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#CBD5E1',
                  },
                ]}
                onPress={handleSelectMarket}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.selectDropdownText,
                    {
                      color:
                        selectedMarket === 'Tap to select a market Name'
                          ? isDark
                            ? '#64748B'
                            : '#94A3B8'
                          : isDark
                          ? '#FFFFFF'
                          : '#0F172A',
                    },
                  ]}
                >
                  {selectedMarket}
                </Text>
                <ChevronDown size={18} color={isDark ? '#64748B' : '#94A3B8'} />
              </TouchableOpacity>
            </View>

            {/* 3. Identifier / Purpose(qrFor)* Required */}
            <View style={styles.batchFieldGroup}>
              <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                Identifier / Purpose(qrFor)* Required
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
                  placeholder="eg. Pallet, Outer Carton"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  value={identifierPurpose}
                  onChangeText={setIdentifierPurpose}
                />
              </View>
            </View>

            {/* 4. Barcode Number */}
            <View style={styles.batchFieldGroup}>
              <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                Barcode Number
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
                  placeholder="Enter Barcode Number"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  value={barcodeNumber}
                  onChangeText={setBarcodeNumber}
                />
              </View>
            </View>

            {/* 5. SKU Code */}
            <View style={styles.batchFieldGroup}>
              <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                SKU Code
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
                  placeholder="Enter SKU Code"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  value={skuCode}
                  onChangeText={setSkuCode}
                />
              </View>
            </View>

            {/* 6. SKU Name */}
            <View style={styles.batchFieldGroup}>
              <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                SKU Name
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
                  placeholder="Enter SKU Name"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  value={skuName}
                  onChangeText={setSkuName}
                />
              </View>
            </View>

            {/* Section 2: Manufacturing & batch */}
            <Text style={[styles.sectionHeadingText, { color: isDark ? '#FFFFFF' : '#0F172A', marginTop: 10 }]}>
              Manufacturing & batch
            </Text>

            {/* 7. Batch Number */}
            <View style={styles.batchFieldGroup}>
              <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                Batch Number
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
                  placeholder="Enter Batch Number"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  value={batchNumber}
                  onChangeText={setBatchNumber}
                />
              </View>
            </View>

            {/* 8. Shift */}
            <View style={styles.batchFieldGroup}>
              <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                Shift
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
                  placeholder="Enter Shift"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  value={shift}
                  onChangeText={setShift}
                />
              </View>
            </View>

            {/* 9. Location */}
            <View style={styles.batchFieldGroup}>
              <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                Location
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
                  placeholder="Enter enter location"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
            </View>

            {/* 10. Packed By */}
            <View style={styles.batchFieldGroup}>
              <Text style={[styles.batchFieldLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                Packed By
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
                  placeholder="Enter Packed By"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  value={packedBy}
                  onChangeText={setPackedBy}
                />
              </View>
            </View>

            {/* Generate Button */}
            <TouchableOpacity
              style={[
                styles.generateSubmitBtn,
                {
                  backgroundColor: isDark ? '#A3E635' : '#2563EB',
                },
              ]}
              onPress={handleGenerateCartonDetails}
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
          {/* Subtitle Heading: Packaging Department Stage 2 */}
          <Text style={[styles.departmentLabelText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
            Packaging Department Stage 2
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
            {/* Top Tab: Create Outer Carton (Parent) */}
            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'CREATE_OUTER_CARTON' && {
                  backgroundColor: isDark ? '#A3E635' : '#2563EB',
                },
              ]}
              onPress={() => setActiveTab('CREATE_OUTER_CARTON')}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.segmentTabText,
                  {
                    color:
                      activeTab === 'CREATE_OUTER_CARTON'
                        ? isDark
                          ? '#000000'
                          : '#FFFFFF'
                        : isDark
                        ? '#A3E635'
                        : '#2563EB',
                  },
                ]}
              >
                Create Outer Carton (Parent)
              </Text>
            </TouchableOpacity>

            {/* Bottom Tab: Box link (linking the boxes together) */}
            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'BOX_LINK' && {
                  backgroundColor: isDark ? '#A3E635' : '#2563EB',
                },
              ]}
              onPress={() => setActiveTab('BOX_LINK')}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.segmentTabText,
                  {
                    color:
                      activeTab === 'BOX_LINK'
                        ? isDark
                          ? '#000000'
                          : '#FFFFFF'
                        : isDark
                        ? '#A3E635'
                        : '#2563EB',
                  },
                ]}
              >
                Box link (linking the boxes together)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab 1 Body: Create Outer Carton (Parent) */}
          {activeTab === 'CREATE_OUTER_CARTON' ? (
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
              {/* Header Row inside card: Step 1 Title + Fill Info Action Button */}
              <View style={styles.cardHeaderActionRow}>
                <Text style={[styles.stepTitleText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                  Step 1: Set Carton Details
                </Text>

                <TouchableOpacity
                  style={[
                    styles.fillInfoBtnPill,
                    {
                      backgroundColor: isDark ? '#02141A' : '#F1F5F9',
                      borderColor: isDark ? 'rgba(0, 229, 255, 0.35)' : '#CBD5E1',
                    },
                  ]}
                  onPress={() => setIsCartonDetailsOpen(true)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.fillInfoBtnText, { color: isDark ? '#E2E8F0' : '#334155' }]}>
                    Tap To Fill Product And Market Info
                  </Text>
                  <ChevronRight size={14} color={isDark ? '#A3E635' : '#2563EB'} />
                </TouchableOpacity>
              </View>

              <View style={[styles.cardDivider, { backgroundColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1' }]} />

              {/* Scrollable Generated QR Code List */}
              <View style={{ maxHeight: 420, width: '100%' }}>
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
                      {/* Left Neon Green Icon Square */}
                      <View style={styles.qrIconSquare}>
                        <QrCode size={20} color="#000000" strokeWidth={2.5} />
                      </View>

                      {/* Middle Title & Timestamp */}
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

                      {/* Right Tag Pills */}
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

              <View style={[styles.cardDivider, { backgroundColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1' }]} />

              {/* Bottom Action Row inside Card: (+) Circle & Print Pill Button */}
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
            /* Tab 2 Body: Box link (linking the boxes together) */
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
                  Pack & Attach
                </Text>
                <Text style={[styles.cardSubheadingText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                  Scan Child Items, Them Scan The Parent Carton{'\n'}To Attach Them
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
                  Empty Carton
                </Text>

                <Text
                  style={[
                    styles.innerInstructionText,
                    { fontSize: 12, color: isDark ? '#8E9BAE' : '#64748B', marginTop: -4 },
                  ]}
                >
                  Scan Child Items To Begin
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
                  onPress={handleBoxLinkScan}
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
                    <Camera size={26} color={isDark ? '#000000' : '#FFFFFF'} strokeWidth={2.2} />
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.attachParentBtnPill,
                  { backgroundColor: isDark ? '#A3E635' : '#2563EB' },
                ]}
                onPress={handleBoxLinkScan}
                activeOpacity={0.85}
              >
                <Text style={[styles.attachParentBtnText, { color: isDark ? '#000000' : '#FFFFFF' }]}>
                  Attach to Parent Carton
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {/* Bottom Controls Bar */}
        <View style={styles.bottomControlsBar}>
          <TouchableOpacity
            style={[
              styles.settingsBtnCircle,
              {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#CBD5E1',
              },
            ]}
            onPress={() => Alert.alert('Settings', 'Packaging Stage 2 Configuration Options')}
            activeOpacity={0.8}
          >
            <Settings size={20} color={isDark ? '#94A3B8' : '#64748B'} />
          </TouchableOpacity>

          <PulseFAB mode={mode} onPress={handleFabPress} />
        </View>

        {/* ================= BOTTOM SHEET POPUP MODAL (Generate New Parent QR) ================= */}
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
              {/* Header */}
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

              {/* Generate Button */}
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
    fontSize: 13.5,
    fontWeight: '700',
    fontFamily: 'Inter',
    textAlign: 'center',
  },

  /* Main Hero Card Container */
  mainHeroCard: {
    borderRadius: 28,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    gap: 14,
    alignItems: 'center',
  },
  cardHeaderGroup: {
    alignItems: 'center',
    gap: 6,
  },
  cardHeadingText: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  cardSubheadingText: {
    fontSize: 13.5,
    fontWeight: '500',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 18,
  },

  /* Card Header Action Row (Step 1 Title + Button) */
  cardHeaderActionRow: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
  },
  stepTitleText: {
    fontSize: 17,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  fillInfoBtnPill: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  fillInfoBtnText: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Inter',
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
    gap: 18,
  },
  innerInstructionText: {
    fontSize: 13.5,
    fontWeight: '600',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 19,
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
  attachParentBtnPill: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  attachParentBtnText: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Inter',
  },

  /* QR List Styles */
  cardDivider: {
    height: 1,
    width: '100%',
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

  /* Bottom Card Action Bar */
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

  /* Bottom Sheet Overlay Styles */
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

  /* Batch Header & Form View Styles */
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
  selectDropdownWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  selectDropdownText: {
    fontSize: 14,
    fontFamily: 'Inter',
  },
  sectionHeadingText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
    marginVertical: 4,
  },
});
