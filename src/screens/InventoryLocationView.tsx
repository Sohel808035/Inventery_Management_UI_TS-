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
  Camera,
  CheckCircle2,
  QrCode,
  X,
  ChevronRight,
  ChevronDown,
  Building2,
} from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import { PulseFAB } from '../components/PulseFAB';

interface InventoryLocationViewProps {
  mode: ThemeMode;
  onToggleTheme: () => void;
  onBack: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type InventoryTab = 'ADD_FACTORY' | 'TRANSPORT' | 'DELIVERY_GODOWN';

interface WarehouseLocation {
  id: string;
  name: string;
  address: string;
}

const WAREHOUSE_LIST: WarehouseLocation[] = [
  {
    id: 'wh-1',
    name: 'Centra Warehouse Mumbai',
    address: 'Plot No. 123m MIDC Area, Andheri East, Mumbai, Maharashtra',
  },
  {
    id: 'wh-2',
    name: 'Centra Warehouse Mumbai',
    address: 'Plot No. 123m MIDC Area, Andheri East, Mumbai, Maharashtra',
  },
  {
    id: 'wh-3',
    name: 'Centra Warehouse Mumbai',
    address: 'Plot No. 123m MIDC Area, Andheri East, Mumbai, Maharashtra',
  },
  {
    id: 'wh-4',
    name: 'Centra Warehouse Mumbai',
    address: 'Plot No. 123m MIDC Area, Andheri East, Mumbai, Maharashtra',
  },
];

export const InventoryLocationView: React.FC<InventoryLocationViewProps> = ({
  mode,
  onToggleTheme,
  onBack,
}) => {
  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  const [activeTab, setActiveTab] = useState<InventoryTab>('ADD_FACTORY');
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isDetailsFormOpen, setIsDetailsFormOpen] = useState<boolean>(false);
  const [isWarehouseModalOpen, setIsWarehouseModalOpen] = useState<boolean>(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseLocation>(WAREHOUSE_LIST[0]);

  // Form Fields for Transport / Details
  const [selectedProduct, setSelectedProduct] = useState<string>('Tap to select a product');
  const [selectedMarket, setSelectedMarket] = useState<string>('Tap to select a market Name');
  const [vehicleNo, setVehicleNo] = useState<string>('');
  const [driverName, setDriverName] = useState<string>('');

  const handleSimulateScan = () => {
    setIsScannerOpen(false);

    Alert.alert(
      'Barcode Scanned',
      `Master Carton #MC-TRANS-2026-${Math.floor(1000 + Math.random() * 9000)} scanned successfully. Ready for batch dispatch to ${selectedWarehouse.name}.`,
      [{ text: 'OK' }]
    );
  };

  const handleConfirmMovement = () => {
    setIsSuccessModalOpen(true);
  };

  const handleFinishMovement = () => {
    setIsSuccessModalOpen(false);
    Alert.alert(
      'Batch Operation Completed',
      `Successfully processed ${
        activeTab === 'ADD_FACTORY'
          ? 'Factory Inward'
          : activeTab === 'TRANSPORT'
          ? `Transit Movement (${selectedWarehouse.name})`
          : `Godown Dispatch (${selectedWarehouse.name})`
      }!`,
      [{ text: 'Done', onPress: onBack }]
    );
  };

  const handleSelectProduct = () => {
    Alert.alert('Select Product', 'Choose product for this batch:', [
      { text: 'Oxywrap Premium Stretch Film', onPress: () => setSelectedProduct('Oxywrap Premium Stretch Film') },
      { text: 'Cling Wrap Heavy Duty', onPress: () => setSelectedProduct('Cling Wrap Heavy Duty') },
      { text: 'Stretch Roll 500mm', onPress: () => setSelectedProduct('Stretch Roll 500mm') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSelectMarket = () => {
    Alert.alert('Select Market', 'Choose destination market:', [
      { text: 'North Zone Depot', onPress: () => setSelectedMarket('North Zone Depot') },
      { text: 'South Distribution Hub', onPress: () => setSelectedMarket('South Distribution Hub') },
      { text: 'Export Logistics Bay', onPress: () => setSelectedMarket('Export Logistics Bay') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSaveDetailsForm = () => {
    setIsDetailsFormOpen(false);
    Alert.alert('Carton Details Saved', 'Product, Market & Transit Info linked successfully.');
  };

  const handleFabPress = () => {
    Alert.alert(
      'Inventory Voice & Scan Assistant',
      'Choose an operation:',
      [
        { text: 'Scan Barcode', onPress: () => setIsScannerOpen(true) },
        { text: 'Select Warehouse Location', onPress: () => setIsWarehouseModalOpen(true) },
        { text: 'Add Factory Tab', onPress: () => setActiveTab('ADD_FACTORY') },
        { text: 'Transport Tab', onPress: () => setActiveTab('TRANSPORT') },
        { text: 'Delivery to Godown Tab', onPress: () => setActiveTab('DELIVERY_GODOWN') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleMenuPress = () => {
    Alert.alert(
      'System Options',
      'Inventory Location v2.5\n• Mode: Lineage Batch Sync\n• System Status: Connected',
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
        {/* Soft Background Radial Glow */}
        {isDark ? (
          <View style={styles.softCyanRadialGlow} />
        ) : (
          <>
            <View style={styles.lightAmberGlow} />
            <View style={styles.lightSageGlow} />
          </>
        )}

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
              onPress={handleMenuPress}
              activeOpacity={0.8}
            >
              <Menu size={18} color={theme.menuIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content Scroll View */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Subheader: Inventory Location */}
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
            Inventory Location
          </Text>

          {/* Segmented Pill Tabs Bar */}
          <View
            style={[
              styles.segmentedTabContainer,
              {
                borderColor: isDark ? '#A3E635' : '#2563EB',
                backgroundColor: isDark ? '#050B0E' : '#F1F5F9',
              },
            ]}
          >
            {/* Tab 1: Add Factory */}
            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'ADD_FACTORY' && {
                  backgroundColor: isDark ? '#A3E635' : '#2563EB',
                },
              ]}
              onPress={() => setActiveTab('ADD_FACTORY')}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.segmentTabText,
                  {
                    color:
                      activeTab === 'ADD_FACTORY'
                        ? isDark
                          ? '#000000'
                          : '#FFFFFF'
                        : isDark
                        ? '#FFFFFF'
                        : '#475569',
                  },
                ]}
              >
                Add Factory
              </Text>
            </TouchableOpacity>

            {/* Vertical Divider */}
            <View style={[styles.tabDivider, { backgroundColor: isDark ? '#A3E635' : '#CBD5E1' }]} />

            {/* Tab 2: Transport */}
            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'TRANSPORT' && {
                  backgroundColor: isDark ? '#A3E635' : '#2563EB',
                },
              ]}
              onPress={() => setActiveTab('TRANSPORT')}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.segmentTabText,
                  {
                    color:
                      activeTab === 'TRANSPORT'
                        ? isDark
                          ? '#000000'
                          : '#FFFFFF'
                        : isDark
                        ? '#FFFFFF'
                        : '#475569',
                  },
                ]}
              >
                Transport
              </Text>
            </TouchableOpacity>

            {/* Vertical Divider */}
            <View style={[styles.tabDivider, { backgroundColor: isDark ? '#A3E635' : '#CBD5E1' }]} />

            {/* Tab 3: Delivery to godown */}
            <TouchableOpacity
              style={[
                styles.segmentTab,
                { flex: 1.3 },
                activeTab === 'DELIVERY_GODOWN' && {
                  backgroundColor: isDark ? '#A3E635' : '#2563EB',
                },
              ]}
              onPress={() => setActiveTab('DELIVERY_GODOWN')}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.segmentTabText,
                  {
                    color:
                      activeTab === 'DELIVERY_GODOWN'
                        ? isDark
                          ? '#000000'
                          : '#FFFFFF'
                        : isDark
                        ? '#FFFFFF'
                        : '#475569',
                  },
                ]}
              >
                Delivery to godown
              </Text>
            </TouchableOpacity>
          </View>

          {/* Dynamic Main Hero Card Content Based on Active Tab */}
          {activeTab === 'ADD_FACTORY' ? (
            /* TAB 1: ADD FACTORY HERO CARD */
            <View
              style={[
                styles.heroCard,
                {
                  backgroundColor: isDark ? '#071A21' : '#FFFFFF',
                  borderColor: isDark ? 'rgba(0, 229, 255, 0.35)' : '#CBD5E1',
                },
              ]}
            >
              <View style={styles.cardHeaderGroup}>
                <Text style={[styles.cardTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                  Inward to Factory
                </Text>
                <Text style={[styles.cardSubtitle, { color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B' }]}>
                  Scan Master Cartons To Log Them Into Factory Inventory, Inner Children Will Update Automatically
                </Text>
              </View>

              <View
                style={[
                  styles.innerScanCard,
                  {
                    backgroundColor: isDark ? '#030E13' : '#F8FAFC',
                    borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#CBD5E1',
                  },
                ]}
              >
                <Text style={[styles.innerTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                  Ready To Receive
                </Text>
                <Text style={[styles.innerSubtitle, { color: isDark ? 'rgba(255, 255, 255, 0.45)' : '#94A3B8' }]}>
                  Scan Parent Barcodes To Begin Batch
                </Text>

                <TouchableOpacity
                  style={styles.cameraOuterGlowCircle}
                  onPress={() => setIsScannerOpen(true)}
                  activeOpacity={0.85}
                >
                  <View
                    style={[
                      styles.cameraRingBackground,
                      {
                        backgroundColor: isDark
                          ? 'rgba(0, 229, 255, 0.05)'
                          : 'rgba(37, 99, 235, 0.05)',
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.cameraInnerButton,
                        { backgroundColor: isDark ? '#A3E635' : '#2563EB' },
                      ]}
                    >
                      <Camera size={26} color={isDark ? '#000000' : '#FFFFFF'} strokeWidth={2.2} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.confirmBatchBtn,
                  { backgroundColor: isDark ? '#84CC16' : '#2563EB' },
                ]}
                onPress={handleConfirmMovement}
                activeOpacity={0.85}
              >
                <Text style={[styles.confirmBatchBtnText, { color: isDark ? '#000000' : '#FFFFFF' }]}>
                  Confirm Batch Movement
                </Text>
              </TouchableOpacity>
            </View>
          ) : activeTab === 'TRANSPORT' ? (
            /* TAB 2: TRANSPORT HERO CARD (Exact matching latest screenshot!) */
            <View
              style={[
                styles.heroCard,
                {
                  backgroundColor: isDark ? '#071A21' : '#FFFFFF',
                  borderColor: isDark ? 'rgba(0, 229, 255, 0.35)' : '#CBD5E1',
                },
              ]}
            >
              {/* Top Row: Step 1 Title & Fill Info Pill Button */}
              <View style={styles.transportHeaderRow}>
                <Text style={[styles.stepTitleText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                  Step 1: Set Carton Details
                </Text>

                <TouchableOpacity
                  style={[
                    styles.fillInfoPillBtn,
                    {
                      backgroundColor: isDark ? '#02141A' : '#F1F5F9',
                      borderColor: isDark ? 'rgba(0, 229, 255, 0.35)' : '#CBD5E1',
                    },
                  ]}
                  onPress={() => setIsWarehouseModalOpen(true)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.fillInfoPillText, { color: isDark ? '#E2E8F0' : '#334155' }]}>
                    Tap To Fill Product And Market Info
                  </Text>
                  <ChevronRight size={15} color={isDark ? '#A3E635' : '#2563EB'} />
                </TouchableOpacity>
              </View>

              <View style={[styles.cardDivider, { backgroundColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1' }]} />

              {/* Inner Scan Card: Ready To Loading */}
              <View
                style={[
                  styles.innerScanCard,
                  {
                    backgroundColor: isDark ? '#030E13' : '#F8FAFC',
                    borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#CBD5E1',
                  },
                ]}
              >
                <Text style={[styles.innerTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                  Ready To Loading
                </Text>
                <Text style={[styles.innerSubtitle, { color: isDark ? 'rgba(255, 255, 255, 0.45)' : '#94A3B8' }]}>
                  Select A Destination And Start Scanning
                </Text>

                <TouchableOpacity
                  style={styles.cameraOuterGlowCircle}
                  onPress={() => setIsScannerOpen(true)}
                  activeOpacity={0.85}
                >
                  <View
                    style={[
                      styles.cameraRingBackground,
                      {
                        backgroundColor: isDark
                          ? 'rgba(0, 229, 255, 0.05)'
                          : 'rgba(37, 99, 235, 0.05)',
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.cameraInnerButton,
                        { backgroundColor: isDark ? '#A3E635' : '#2563EB' },
                      ]}
                    >
                      <Camera size={26} color={isDark ? '#000000' : '#FFFFFF'} strokeWidth={2.2} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Bottom Pill Button: Dispatch to Transit */}
              <TouchableOpacity
                style={[
                  styles.confirmBatchBtn,
                  { backgroundColor: isDark ? '#84CC16' : '#2563EB' },
                ]}
                onPress={handleConfirmMovement}
                activeOpacity={0.85}
              >
                <Text style={[styles.confirmBatchBtnText, { color: isDark ? '#000000' : '#FFFFFF' }]}>
                  Dispatch to Transit
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* TAB 3: DELIVERY TO GODOWN HERO CARD (Exact matching screenshot!) */
            <View
              style={[
                styles.heroCard,
                {
                  backgroundColor: isDark ? '#071A21' : '#FFFFFF',
                  borderColor: isDark ? 'rgba(0, 229, 255, 0.35)' : '#CBD5E1',
                },
              ]}
            >
              <View style={styles.transportHeaderRow}>
                <Text style={[styles.stepTitleText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                  Step 1: Set Carton Details
                </Text>

                <TouchableOpacity
                  style={[
                    styles.fillInfoPillBtn,
                    {
                      backgroundColor: isDark ? '#02141A' : '#F1F5F9',
                      borderColor: isDark ? 'rgba(0, 229, 255, 0.35)' : '#CBD5E1',
                    },
                  ]}
                  onPress={() => setIsWarehouseModalOpen(true)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.fillInfoPillText, { color: isDark ? '#E2E8F0' : '#334155' }]}>
                    Where Are You Receiving These Godown
                  </Text>
                  <ChevronRight size={15} color={isDark ? '#A3E635' : '#2563EB'} />
                </TouchableOpacity>
              </View>

              <View style={[styles.cardDivider, { backgroundColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1' }]} />

              <View
                style={[
                  styles.innerScanCard,
                  {
                    backgroundColor: isDark ? '#030E13' : '#F8FAFC',
                    borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#CBD5E1',
                  },
                ]}
              >
                <Text style={[styles.innerTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                  Awaiting Delivery
                </Text>
                <Text style={[styles.innerSubtitle, { color: isDark ? 'rgba(255, 255, 255, 0.45)' : '#94A3B8' }]}>
                  Set Your Location And Start Scanning Arriving Cartons
                </Text>

                <TouchableOpacity
                  style={styles.cameraOuterGlowCircle}
                  onPress={() => setIsScannerOpen(true)}
                  activeOpacity={0.85}
                >
                  <View
                    style={[
                      styles.cameraRingBackground,
                      {
                        backgroundColor: isDark
                          ? 'rgba(0, 229, 255, 0.05)'
                          : 'rgba(37, 99, 235, 0.05)',
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.cameraInnerButton,
                        { backgroundColor: isDark ? '#A3E635' : '#2563EB' },
                      ]}
                    >
                      <Camera size={26} color={isDark ? '#000000' : '#FFFFFF'} strokeWidth={2.2} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.confirmBatchBtn,
                  { backgroundColor: isDark ? '#84CC16' : '#2563EB' },
                ]}
                onPress={handleConfirmMovement}
                activeOpacity={0.85}
              >
                <Text style={[styles.confirmBatchBtnText, { color: isDark ? '#000000' : '#FFFFFF' }]}>
                  Confirm Receipt
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {/* Pulse FAB Assistant */}
        <PulseFAB mode={mode} onPress={handleFabPress} />

        {/* Warehouse Selection Bottom Sheet Overlay Modal (Exact Figma Reference!) */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isWarehouseModalOpen}
          onRequestClose={() => setIsWarehouseModalOpen(false)}
        >
          <TouchableOpacity
            style={styles.bottomSheetOverlay}
            activeOpacity={1}
            onPress={() => setIsWarehouseModalOpen(false)}
          >
            <View
              style={[
                styles.warehouseBottomSheet,
                {
                  backgroundColor: isDark ? '#04151C' : '#FFFFFF',
                  borderColor: isDark ? 'rgba(0, 229, 255, 0.35)' : '#CBD5E1',
                },
              ]}
              onStartShouldSetResponder={() => true}
            >
              {/* Header inside Bottom Sheet */}
              <View style={styles.sheetHeaderGroup}>
                <Text style={[styles.sheetStepTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                  Step 1: Set Carton Details
                </Text>

                <TouchableOpacity
                  style={[
                    styles.sheetPillBtn,
                    {
                      backgroundColor: isDark ? '#02141A' : '#F1F5F9',
                      borderColor: isDark ? 'rgba(0, 229, 255, 0.35)' : '#CBD5E1',
                    },
                  ]}
                  onPress={() => setIsWarehouseModalOpen(false)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.sheetPillBtnText, { color: isDark ? '#E2E8F0' : '#334155' }]}>
                    Tap To Fill Product And Market Info
                  </Text>
                  <ChevronRight size={15} color={isDark ? '#A3E635' : '#2563EB'} />
                </TouchableOpacity>
              </View>

              <View style={[styles.sheetDivider, { backgroundColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1' }]} />

              {/* Scrollable List of Warehouse Cards */}
              <ScrollView contentContainerStyle={styles.warehouseListScroll} showsVerticalScrollIndicator={false}>
                {WAREHOUSE_LIST.map((item, index) => (
                  <TouchableOpacity
                    key={`${item.id}-${index}`}
                    style={[
                      styles.warehouseCard,
                      {
                        backgroundColor: isDark ? '#071A21' : '#F8FAFC',
                        borderColor:
                          selectedWarehouse.id === item.id && isWarehouseModalOpen
                            ? isDark
                              ? '#A3E635'
                              : '#2563EB'
                            : isDark
                            ? 'rgba(0, 229, 255, 0.25)'
                            : '#CBD5E1',
                      },
                    ]}
                    onPress={() => {
                      setSelectedWarehouse(item);
                      setIsWarehouseModalOpen(false);
                      setIsDetailsFormOpen(true);
                    }}
                    activeOpacity={0.85}
                  >
                    {/* Left Neon Green Icon Square */}
                    <View
                      style={[
                        styles.warehouseIconSquare,
                        { backgroundColor: isDark ? '#A3E635' : '#2563EB' },
                      ]}
                    >
                      <Building2 size={22} color={isDark ? '#000000' : '#FFFFFF'} />
                    </View>

                    {/* Right Text Column */}
                    <View style={styles.warehouseTextCol}>
                      <Text style={[styles.warehouseNameText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                        {item.name}
                      </Text>
                      <Text style={[styles.warehouseAddressText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                        {item.address}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Fill Info & Product Details Modal Form */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isDetailsFormOpen}
          onRequestClose={() => setIsDetailsFormOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.detailsModalContent,
                {
                  backgroundColor: isDark ? '#04151C' : '#FFFFFF',
                  borderColor: isDark ? 'rgba(0, 229, 255, 0.35)' : '#CBD5E1',
                },
              ]}
            >
              <View style={styles.scannerModalHeader}>
                <Text style={[styles.scannerModalTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                  Carton & Transit Details
                </Text>

                <TouchableOpacity
                  style={[
                    styles.closeModalCircle,
                    { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9' },
                  ]}
                  onPress={() => setIsDetailsFormOpen(false)}
                  activeOpacity={0.8}
                >
                  <X size={16} color={isDark ? '#94A3B8' : '#64748B'} />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
                {/* Selected Warehouse Display */}
                <View style={styles.formGroup}>
                  <Text style={[styles.formLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                    Selected Warehouse
                  </Text>
                  <View
                    style={[
                      styles.formDropdown,
                      { backgroundColor: isDark ? '#01080B' : '#F8FAFC', borderColor: isDark ? '#A3E635' : '#CBD5E1' },
                    ]}
                  >
                    <Text style={{ color: isDark ? '#A3E635' : '#2563EB', fontSize: 13, fontWeight: '700' }}>
                      {selectedWarehouse.name}
                    </Text>
                  </View>
                </View>

                {/* 1. Product Selection */}
                <View style={styles.formGroup}>
                  <Text style={[styles.formLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                    Select Product
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.formDropdown,
                      { backgroundColor: isDark ? '#01080B' : '#F8FAFC', borderColor: isDark ? 'rgba(0,229,255,0.25)' : '#CBD5E1' },
                    ]}
                    onPress={handleSelectProduct}
                  >
                    <Text style={{ color: isDark ? '#FFFFFF' : '#0F172A', fontSize: 13 }}>{selectedProduct}</Text>
                    <ChevronDown size={16} color={isDark ? '#64748B' : '#94A3B8'} />
                  </TouchableOpacity>
                </View>

                {/* 2. Market Name */}
                <View style={styles.formGroup}>
                  <Text style={[styles.formLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                    Market Name
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.formDropdown,
                      { backgroundColor: isDark ? '#01080B' : '#F8FAFC', borderColor: isDark ? 'rgba(0,229,255,0.25)' : '#CBD5E1' },
                    ]}
                    onPress={handleSelectMarket}
                  >
                    <Text style={{ color: isDark ? '#FFFFFF' : '#0F172A', fontSize: 13 }}>{selectedMarket}</Text>
                    <ChevronDown size={16} color={isDark ? '#64748B' : '#94A3B8'} />
                  </TouchableOpacity>
                </View>

                {/* 3. Vehicle No */}
                <View style={styles.formGroup}>
                  <Text style={[styles.formLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                    Vehicle Number
                  </Text>
                  <View
                    style={[
                      styles.formInputBox,
                      { backgroundColor: isDark ? '#01080B' : '#F8FAFC', borderColor: isDark ? 'rgba(0,229,255,0.25)' : '#CBD5E1' },
                    ]}
                  >
                    <TextInput
                      style={{ color: isDark ? '#FFFFFF' : '#0F172A', fontSize: 13 }}
                      placeholder="e.g. MH-12-AB-9812"
                      placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                      value={vehicleNo}
                      onChangeText={setVehicleNo}
                    />
                  </View>
                </View>

                {/* 4. Driver Name */}
                <View style={styles.formGroup}>
                  <Text style={[styles.formLabel, { color: isDark ? '#CBD5E1' : '#475569' }]}>
                    Driver Name
                  </Text>
                  <View
                    style={[
                      styles.formInputBox,
                      { backgroundColor: isDark ? '#01080B' : '#F8FAFC', borderColor: isDark ? 'rgba(0,229,255,0.25)' : '#CBD5E1' },
                    ]}
                  >
                    <TextInput
                      style={{ color: isDark ? '#FFFFFF' : '#0F172A', fontSize: 13 }}
                      placeholder="e.g. Ramesh Kumar"
                      placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                      value={driverName}
                      onChangeText={setDriverName}
                    />
                  </View>
                </View>
              </ScrollView>

              <TouchableOpacity
                style={[
                  styles.saveFormBtn,
                  { backgroundColor: isDark ? '#A3E635' : '#2563EB' },
                ]}
                onPress={handleSaveDetailsForm}
                activeOpacity={0.85}
              >
                <Text style={[styles.saveFormBtnText, { color: isDark ? '#000000' : '#FFFFFF' }]}>
                  Save & Link Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Barcode Scanner Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isScannerOpen}
          onRequestClose={() => setIsScannerOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.scannerModalContent,
                {
                  backgroundColor: isDark ? '#04151C' : '#FFFFFF',
                  borderColor: isDark ? 'rgba(0, 229, 255, 0.35)' : '#CBD5E1',
                },
              ]}
            >
              <View style={styles.scannerModalHeader}>
                <View style={styles.scannerTitleGroup}>
                  <QrCode size={20} color={isDark ? '#A3E635' : '#2563EB'} />
                  <Text style={[styles.scannerModalTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                    Barcode Scanner
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.closeModalCircle,
                    { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9' },
                  ]}
                  onPress={() => setIsScannerOpen(false)}
                  activeOpacity={0.8}
                >
                  <X size={16} color={isDark ? '#94A3B8' : '#64748B'} />
                </TouchableOpacity>
              </View>

              {/* Viewfinder */}
              <View style={[styles.viewfinderFrame, { borderColor: isDark ? '#00E5FF' : '#2563EB' }]}>
                <View style={styles.viewfinderTargetCornerTopLeft} />
                <View style={styles.viewfinderTargetCornerTopRight} />
                <View style={styles.viewfinderTargetCornerBottomLeft} />
                <View style={styles.viewfinderTargetCornerBottomRight} />

                <Text style={styles.viewfinderHintText}>
                  Align Master Carton Barcode within Frame
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.triggerScanBtn,
                  { backgroundColor: isDark ? '#A3E635' : '#2563EB' },
                ]}
                onPress={handleSimulateScan}
                activeOpacity={0.85}
              >
                <Text style={[styles.triggerScanBtnText, { color: isDark ? '#000000' : '#FFFFFF' }]}>
                  Simulate Barcode Scan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Confirmation Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isSuccessModalOpen}
          onRequestClose={() => setIsSuccessModalOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.confirmModalContent,
                {
                  backgroundColor: isDark ? '#04151C' : '#FFFFFF',
                  borderColor: isDark ? 'rgba(0, 229, 255, 0.35)' : '#CBD5E1',
                },
              ]}
            >
              <View style={styles.confirmIconBox}>
                <CheckCircle2 size={42} color={isDark ? '#A3E635' : '#2563EB'} />
              </View>

              <Text style={[styles.confirmTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                Confirm Batch Transfer?
              </Text>

              <Text style={[styles.confirmSubtitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                Ready to confirm batch movement for{' '}
                {activeTab === 'ADD_FACTORY'
                  ? 'Factory Inward'
                  : activeTab === 'TRANSPORT'
                  ? `Transit to ${selectedWarehouse.name}`
                  : `Godown Delivery (${selectedWarehouse.name})`}
                .
              </Text>

              <View style={styles.confirmActionRow}>
                <TouchableOpacity
                  style={[
                    styles.cancelBtnPill,
                    { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9' },
                  ]}
                  onPress={() => setIsSuccessModalOpen(false)}
                >
                  <Text style={[styles.cancelBtnText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.commitBtnPill,
                    { backgroundColor: isDark ? '#A3E635' : '#2563EB' },
                  ]}
                  onPress={handleFinishMovement}
                >
                  <Text style={[styles.commitBtnText, { color: isDark ? '#000000' : '#FFFFFF' }]}>
                    Confirm & Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  softCyanRadialGlow: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    width: 320,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#00E5FF',
    opacity: 0.08,
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
    paddingBottom: 14,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backBtnCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingTop: 12,
    paddingBottom: 90,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    marginBottom: 14,
  },
  segmentedTabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    overflow: 'hidden',
    marginBottom: 16,
  },
  segmentTab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  segmentTabText: {
    fontSize: 12.5,
    fontWeight: '700',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  tabDivider: {
    width: 1.5,
    height: '100%',
  },
  heroCard: {
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    gap: 14,
  },
  cardHeaderGroup: {
    alignItems: 'center',
    gap: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
    fontFamily: 'Inter',
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  transportHeaderRow: {
    gap: 12,
  },
  stepTitleText: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  fillInfoPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  fillInfoPillText: {
    fontSize: 12.5,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  cardDivider: {
    height: 1,
    width: '100%',
  },
  innerScanCard: {
    borderRadius: 20,
    paddingVertical: 26,
    paddingHorizontal: 16,
    borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  innerTitle: {
    fontSize: 16.5,
    fontWeight: '800',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  innerSubtitle: {
    fontSize: 11.5,
    fontWeight: '500',
    fontFamily: 'Inter',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  cameraOuterGlowCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraRingBackground: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 229, 255, 0.25)',
  },
  cameraInnerButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#A3E635',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  confirmBatchBtn: {
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  confirmBatchBtnText: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: 'Inter',
  },

  /* Bottom Sheet Overlay Modal Styles */
  bottomSheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  warehouseBottomSheet: {
    width: '100%',
    maxWidth: 390,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1.5,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    maxHeight: 520,
    gap: 14,
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  sheetHeaderGroup: {
    gap: 10,
  },
  sheetStepTitle: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  sheetPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  sheetPillBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  sheetDivider: {
    height: 1,
    width: '100%',
  },
  warehouseListScroll: {
    gap: 10,
    paddingBottom: 10,
  },
  warehouseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 14,
  },
  warehouseIconSquare: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warehouseTextCol: {
    flex: 1,
    gap: 4,
  },
  warehouseNameText: {
    fontSize: 14.5,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  warehouseAddressText: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'Inter',
    lineHeight: 15,
  },

  /* Modals */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  detailsModalContent: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    gap: 14,
  },
  formGroup: {
    marginBottom: 12,
    gap: 6,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  formDropdown: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formInputBox: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  saveFormBtn: {
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveFormBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  scannerModalContent: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    gap: 16,
  },
  scannerModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scannerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scannerModalTitle: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  closeModalCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewfinderFrame: {
    height: 180,
    width: '100%',
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 16,
  },
  viewfinderTargetCornerTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#A3E635',
  },
  viewfinderTargetCornerTopRight: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#A3E635',
  },
  viewfinderTargetCornerBottomLeft: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#A3E635',
  },
  viewfinderTargetCornerBottomRight: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#A3E635',
  },
  viewfinderHintText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  triggerScanBtn: {
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  triggerScanBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    fontFamily: 'Inter',
  },

  /* Confirm Modal */
  confirmModalContent: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1.5,
    alignItems: 'center',
    gap: 12,
  },
  confirmIconBox: {
    marginBottom: 4,
  },
  confirmTitle: {
    fontSize: 17,
    fontWeight: '800',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  confirmSubtitle: {
    fontSize: 12.5,
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 18,
  },
  confirmActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
    width: '100%',
  },
  cancelBtnPill: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  commitBtnPill: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commitBtnText: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
});
