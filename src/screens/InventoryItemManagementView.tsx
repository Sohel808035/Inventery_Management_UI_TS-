import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  TextInput,
} from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import {
  ChevronLeft,
  Menu,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  Play,
  Database,
  Factory,
  Warehouse,
  Truck,
  Search,
  CircleOff,
  Package,
  Calendar,
  Tag,
  MapPin,
  Mail,
  Lock,
  Pencil,
  Trash2,
  Navigation,
  Phone,
} from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import { PulseFAB } from '../components/PulseFAB';

interface InventoryItemManagementViewProps {
  mode: ThemeMode;
  onToggleTheme: () => void;
  onBack: () => void;
  initialTab?: InventoryTab;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type InventoryTab = 'ALL' | 'FACTORY' | 'GODOWN' | 'TRANSIT';

const QRCodeGraphic: React.FC<{ size?: number; color?: string }> = ({
  size = 36,
  color = '#000000',
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    {/* Outer Finder Box 1 */}
    <Rect x="2" y="2" width="7" height="7" rx="1.5" fill={color} />
    <Rect x="3.5" y="3.5" width="4" height="4" rx="0.5" fill="#B8FF2C" />
    <Rect x="4.5" y="4.5" width="2" height="2" fill={color} />

    {/* Outer Finder Box 2 */}
    <Rect x="15" y="2" width="7" height="7" rx="1.5" fill={color} />
    <Rect x="16.5" y="3.5" width="4" height="4" rx="0.5" fill="#B8FF2C" />
    <Rect x="17.5" y="4.5" width="2" height="2" fill={color} />

    {/* Outer Finder Box 3 */}
    <Rect x="2" y="15" width="7" height="7" rx="1.5" fill={color} />
    <Rect x="3.5" y="16.5" width="4" height="4" rx="0.5" fill="#B8FF2C" />
    <Rect x="4.5" y="17.5" width="2" height="2" fill={color} />

    {/* Data Modules */}
    <Rect x="10" y="2" width="2" height="2" fill={color} />
    <Rect x="10" y="5" width="2" height="4" fill={color} />
    <Rect x="13" y="3" width="1" height="3" fill={color} />
    <Rect x="2" y="10" width="4" height="2" fill={color} />
    <Rect x="7" y="10" width="3" height="2" fill={color} />
    <Rect x="11" y="10" width="3" height="3" fill={color} />
    <Rect x="15" y="10" width="2" height="2" fill={color} />
    <Rect x="18" y="10" width="4" height="2" fill={color} />
    <Rect x="10" y="15" width="2" height="3" fill={color} />
    <Rect x="13" y="14" width="3" height="2" fill={color} />
    <Rect x="17" y="15" width="2" height="4" fill={color} />
    <Rect x="20" y="14" width="2" height="2" fill={color} />
    <Rect x="10" y="19" width="4" height="3" fill={color} />
    <Rect x="15" y="20" width="4" height="2" fill={color} />
  </Svg>
);

export const InventoryItemManagementView: React.FC<InventoryItemManagementViewProps> = ({
  mode,
  onToggleTheme,
  onBack,
  initialTab = 'ALL',
}) => {
  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  // Navigation and Filter States
  const [activeFilterChip, setActiveFilterChip] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [homeExpandedIndex, setHomeExpandedIndex] = useState<number | null>(0);
  const [factoryHomeExpandedIndex, setFactoryHomeExpandedIndex] = useState<number | null>(0);
  const [godownHomeExpandedIndex, setGodownHomeExpandedIndex] = useState<number | null>(0);
  const [transitHomeExpandedIndex, setTransitHomeExpandedIndex] = useState<number | null>(0);
  const [barcodeExpandedIndex, setBarcodeExpandedIndex] = useState<number | null>(0);
  const [allProductsExpandedIndex, setAllProductsExpandedIndex] = useState<number | null>(0);
  const [activeBottomTab, setActiveBottomTab] = useState<InventoryTab>(initialTab);

  // Godown Form & Data States
  const [godownName, setGodownName] = useState('');
  const [godownEmail, setGodownEmail] = useState('');
  const [godownStateVal, setGodownStateVal] = useState('');
  const [godownCityVal, setGodownCityVal] = useState('');
  const [godownAddress, setGodownAddress] = useState('');
  const [godownPassword, setGodownPassword] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const [godownsList, setGodownsList] = useState([
    {
      id: 1,
      title: 'North Zone Storage Pune',
      address: 'Survey No. 123, MIDC Area, Andheri East, Mumbai, Maharashtra',
      email: 'central.mumbai@warehouse.com',
      password: '••••••••',
    },
    {
      id: 2,
      title: 'North Zone Storage Pune',
      address: 'Survey No. 123, MIDC Area, Andheri East, Mumbai, Maharashtra',
      email: 'central.mumbai@warehouse.com',
      password: '••••••••',
    },
  ]);

  // Transit Form & Data States
  const [transitVehicleNo, setTransitVehicleNo] = useState('');
  const [transitDriverContact, setTransitDriverContact] = useState('');
  const [transitOrigin, setTransitOrigin] = useState('');
  const [transitDestination, setTransitDestination] = useState('');
  const [transitShipmentsList, setTransitShipmentsList] = useState([
    {
      id: 1,
      title: 'Shipment #TR-9042',
      vehicleNo: 'MH-12-AB-3456 (Container Truck)',
      route: 'Factory Line A ➔ Godown 3, Pune',
      driverContact: '+91 98765 43210',
      status: 'In Transit',
    },
    {
      id: 2,
      title: 'Shipment #TR-8812',
      vehicleNo: 'MH-14-CD-7890 (Heavy Hauler)',
      route: 'Central Mill ➔ Transit Hub B, Mumbai',
      driverContact: '+91 91234 56789',
      status: 'Dispatched',
    },
  ]);

  const filterChips = ['Barcode History', 'All Products', 'Show All'];

  // All Inventory Metrics
  const monitorMetrics = [
    { label: 'Total Inventory', value: '48%', width: '94%', color: isDark ? '#A3E635' : '#10B981' },
    { label: 'Total Quantity', value: '20%', width: '78%', color: '#38BDF8' },
    { label: 'Total Set/Box', value: '22%', width: '84%', color: '#C084FC' },
    { label: 'Factory INV', value: '09%', width: '60%', color: '#F472B6' },
    { label: 'In Transit', value: '02%', width: '54%', color: '#818CF8' },
  ];

  // Factory Inventory Metrics
  const factoryMetrics = [
    { label: 'Factory Inventory', value: '62%', width: '92%', color: isDark ? '#A3E635' : '#10B981' },
    { label: 'Production Quantity', value: '35%', width: '80%', color: '#38BDF8' },
    { label: 'Factory Set/Box', value: '28%', width: '86%', color: '#C084FC' },
    { label: 'Active Lines', value: '14%', width: '68%', color: '#F472B6' },
    { label: 'In Queue', value: '05%', width: '48%', color: '#818CF8' },
  ];

  // Godown Inventory Metrics
  const godownMetrics = [
    { label: 'Godown Capacity', value: '74%', width: '95%', color: isDark ? '#A3E635' : '#10B981' },
    { label: 'Storage Quantity', value: '45%', width: '82%', color: '#38BDF8' },
    { label: 'Godown Set/Box', value: '38%', width: '88%', color: '#C084FC' },
    { label: 'Active Racks', value: '82%', width: '72%', color: '#F472B6' },
    { label: 'Space Available', value: '26%', width: '52%', color: '#818CF8' },
  ];

  // Transit Inventory Metrics
  const transitMetrics = [
    { label: 'In Transit Inventory', value: '38%', width: '90%', color: isDark ? '#A3E635' : '#10B981' },
    { label: 'Dispatched Quantity', value: '25%', width: '76%', color: '#38BDF8' },
    { label: 'Transit Set/Box', value: '18%', width: '82%', color: '#C084FC' },
    { label: 'Vehicles En Route', value: '12%', width: '64%', color: '#F472B6' },
    { label: 'Est. Delivery', value: '85%', width: '56%', color: '#818CF8' },
  ];

  const inventoryHomeItems = [
    {
      id: 1,
      name: 'BAM 1122',
      marketName: 'BAM1122',
      totalQty: '1',
      setsBoxes: '1',
      factory: '1',
      transit: '1',
      coreWeight: 'N/A',
      grossWeight: 'N/A',
      netWeight: 'N/A',
    },
    {
      id: 2,
      name: 'BAM 1122',
      marketName: 'BAM1122',
      totalQty: '2',
      setsBoxes: '2',
      factory: '1',
      transit: '1',
      coreWeight: '12.5 kg',
      grossWeight: '14.0 kg',
      netWeight: '13.2 kg',
    },
    {
      id: 3,
      name: 'BAM 1122',
      marketName: 'BAM1122',
      totalQty: '5',
      setsBoxes: '4',
      factory: '3',
      transit: '2',
      coreWeight: '25.0 kg',
      grossWeight: '28.0 kg',
      netWeight: '26.5 kg',
    },
  ];

  const factoryHomeItems = [
    {
      id: 1,
      name: 'BAM 1122 (Factory Line 1)',
      marketName: 'BAM1122-F1',
      totalQty: '4',
      setsBoxes: '3',
      factory: '3',
      transit: '1',
      coreWeight: '18.0 kg',
      grossWeight: '20.5 kg',
      netWeight: '19.0 kg',
    },
    {
      id: 2,
      name: 'BAM 2020 (Factory Line 2)',
      marketName: 'BAM2020-F2',
      totalQty: '8',
      setsBoxes: '6',
      factory: '6',
      transit: '2',
      coreWeight: '32.0 kg',
      grossWeight: '35.0 kg',
      netWeight: '33.5 kg',
    },
  ];

  const godownHomeItems = [
    {
      id: 1,
      name: 'BAM 1122 (Godown Storage)',
      marketName: 'BAM1122-G1',
      totalQty: '6',
      setsBoxes: '5',
      factory: '2',
      transit: '1',
      coreWeight: '24.0 kg',
      grossWeight: '27.0 kg',
      netWeight: '25.5 kg',
    },
    {
      id: 2,
      name: 'BAM 4040 (Warehouse West)',
      marketName: 'BAM4040-G2',
      totalQty: '10',
      setsBoxes: '8',
      factory: '4',
      transit: '2',
      coreWeight: '40.0 kg',
      grossWeight: '44.0 kg',
      netWeight: '42.0 kg',
    },
  ];

  const transitHomeItems = [
    {
      id: 1,
      name: 'BAM 1122 (Transit Batch #1)',
      marketName: 'BAM1122-T1',
      totalQty: '3',
      setsBoxes: '2',
      factory: '1',
      transit: '2',
      coreWeight: '14.0 kg',
      grossWeight: '16.0 kg',
      netWeight: '15.0 kg',
    },
    {
      id: 2,
      name: 'BAM 5050 (Heavy Shipment)',
      marketName: 'BAM5050-T2',
      totalQty: '7',
      setsBoxes: '6',
      factory: '2',
      transit: '5',
      coreWeight: '28.0 kg',
      grossWeight: '31.0 kg',
      netWeight: '29.5 kg',
    },
  ];

  const [allProductsItems, setAllProductsItems] = useState([
    {
      id: 1,
      title: 'Laptop',
      tag1: 'N/A',
      date: '26/3/2026',
      productName: 'Laptop',
      skuCode: 'N/A',
    },
    {
      id: 2,
      title: 'Mobile',
      tag1: 'N/A',
      date: '26/11/2026',
      productName: 'Mobile',
      skuCode: 'N/A',
    },
    {
      id: 3,
      title: 'Tab',
      tag1: 'N/A',
      date: '26/11/2026',
      productName: 'Tab',
      skuCode: 'N/A',
    },
    {
      id: 4,
      title: 'Laptop',
      tag1: 'N/A',
      date: '26/3/2026',
      productName: 'Laptop',
      skuCode: 'N/A',
    },
    {
      id: 5,
      title: 'Tab',
      tag1: 'N/A',
      date: '26/3/2026',
      productName: 'Tab',
      skuCode: 'N/A',
    },
  ]);

  const barcodeRecords = [
    {
      id: 1,
      title: 'Laptop',
      packed: '_',
      batch: '_',
      shift: '_',
      noOfBarcodes: '1',
      location: '_',
      currentTime: '_',
      rewinder: 'N/A',
      edge: 'N/A',
      winder: 'N/A',
      mixer: '0',
      skuc: '0',
      skun: '0',
      coreWt: '90',
      grossWt: '150',
      netWt: '60',
      batchList: '_',
    },
    {
      id: 2,
      title: 'Laptop',
      packed: '_',
      batch: '_',
      shift: '_',
      noOfBarcodes: '1',
      location: '_',
      currentTime: '_',
      rewinder: 'N/A',
      edge: 'N/A',
      winder: 'N/A',
      mixer: '0',
      skuc: '0',
      skun: '0',
      coreWt: '90',
      grossWt: '150',
      netWt: '60',
      batchList: '_',
    },
    {
      id: 3,
      title: 'Mobile',
      packed: '_',
      batch: '_',
      shift: '_',
      noOfBarcodes: '2',
      location: 'Rack A',
      currentTime: '_',
      rewinder: 'N/A',
      edge: 'N/A',
      winder: 'N/A',
      mixer: '0',
      skuc: '0',
      skun: '0',
      coreWt: '45',
      grossWt: '80',
      netWt: '35',
      batchList: '_',
    },
    {
      id: 4,
      title: 'Tab',
      packed: '_',
      batch: '_',
      shift: '_',
      noOfBarcodes: '1',
      location: 'Rack B',
      currentTime: '_',
      rewinder: 'N/A',
      edge: 'N/A',
      winder: 'N/A',
      mixer: '0',
      skuc: '0',
      skun: '0',
      coreWt: '60',
      grossWt: '110',
      netWt: '50',
      batchList: '_',
    },
    {
      id: 5,
      title: 'Mobile',
      packed: '_',
      batch: '_',
      shift: '_',
      noOfBarcodes: '3',
      location: 'Rack C',
      currentTime: '_',
      rewinder: 'N/A',
      edge: 'N/A',
      winder: 'N/A',
      mixer: '0',
      skuc: '0',
      skun: '0',
      coreWt: '45',
      grossWt: '80',
      netWt: '35',
      batchList: '_',
    },
    {
      id: 6,
      title: 'Tab',
      packed: '_',
      batch: '_',
      shift: '_',
      noOfBarcodes: '1',
      location: 'Rack D',
      currentTime: '_',
      rewinder: 'N/A',
      edge: 'N/A',
      winder: 'N/A',
      mixer: '0',
      skuc: '0',
      skun: '0',
      coreWt: '60',
      grossWt: '110',
      netWt: '50',
      batchList: '_',
    },
  ];

  const filteredAllProducts = allProductsItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBarcodeRecords = barcodeRecords.filter((rec) =>
    rec.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChipPress = (chipName: string) => {
    setActiveFilterChip((prev) => (prev === chipName ? null : chipName));
  };

  const handleRefresh = () => {
    setActiveFilterChip(null);
    setSearchQuery('');
    Alert.alert('Refreshed', 'Inventory data synchronized successfully.');
  };

  const handleAddGodown = () => {
    if (!godownName.trim()) {
      Alert.alert('Required Field', 'Please enter a name for the Godown.');
      return;
    }
    const newGodown = {
      id: Date.now(),
      title: godownName,
      address: godownAddress || 'Survey No. 123, MIDC Area, Andheri East, Mumbai, Maharashtra',
      email: godownEmail || 'central.mumbai@warehouse.com',
      password: godownPassword ? '••••••••' : '••••••••',
    };
    setGodownsList((prev) => [newGodown, ...prev]);
    setGodownName('');
    setGodownEmail('');
    setGodownStateVal('');
    setGodownCityVal('');
    setGodownAddress('');
    setGodownPassword('');
    Alert.alert('Success', 'New Godown added successfully!');
  };

  const handleDeleteGodown = (id: number, title: string) => {
    Alert.alert('Delete Godown', `Are you sure you want to remove ${title}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setGodownsList((prev) => prev.filter((g) => g.id !== id));
          Alert.alert('Deleted', `${title} removed successfully.`);
        },
      },
    ]);
  };

  const handleEditGodown = (title: string) => {
    Alert.alert('Edit Godown', `Editing details for ${title}...`);
  };

  const handleAddTransit = () => {
    if (!transitVehicleNo.trim()) {
      Alert.alert('Required Field', 'Please enter a Vehicle Number.');
      return;
    }
    const newTransit = {
      id: Date.now(),
      title: `Shipment #TR-${Math.floor(1000 + Math.random() * 9000)}`,
      vehicleNo: transitVehicleNo,
      route: `${transitOrigin || 'Factory Line'} ➔ ${transitDestination || 'Godown Hub'}`,
      driverContact: transitDriverContact || '+91 98765 00000',
      status: 'In Transit',
    };
    setTransitShipmentsList((prev) => [newTransit, ...prev]);
    setTransitVehicleNo('');
    setTransitDriverContact('');
    setTransitOrigin('');
    setTransitDestination('');
    Alert.alert('Success', 'New Transit Shipment record added successfully!');
  };

  const handleDeleteTransit = (id: number, title: string) => {
    Alert.alert('Delete Shipment', `Remove record for ${title}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setTransitShipmentsList((prev) => prev.filter((t) => t.id !== id));
          Alert.alert('Deleted', `${title} removed.`);
        },
      },
    ]);
  };

  const handleDeleteRecord = (id: number, title: string) => {
    Alert.alert('Delete Record', `Are you sure you want to delete the record for ${title}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setAllProductsItems((prev) => prev.filter((item) => item.id !== id));
          Alert.alert('Deleted', `${title} record removed.`);
        },
      },
    ]);
  };

  const handleFabPress = () => {
    Alert.alert(
      'Voice Assistant & Scanner',
      'Select action for Item Management:',
      [
        { text: 'Scan Barcode', onPress: () => Alert.alert('Scan', 'Opening Barcode Scanner...') },
        { text: 'Voice Audit', onPress: () => Alert.alert('Voice', 'Listening for voice command...') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const getHeaderTitle = () => {
    switch (activeBottomTab) {
      case 'FACTORY':
        return 'Factory Management';
      case 'GODOWN':
        return 'Godown Management';
      case 'TRANSIT':
        return 'Transit Management';
      case 'ALL':
      default:
        return 'Item Management';
    }
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
            <TouchableOpacity
              style={[styles.backBtnCircle, { backgroundColor: theme.menuBg }]}
              onPress={onBack}
              activeOpacity={0.8}
            >
              <ChevronLeft size={20} color={theme.headerText} />
            </TouchableOpacity>

            <Text style={[styles.headerTitle, { color: theme.headerText }]}>
              {getHeaderTitle()}
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

        {/* Scrollable Main Content */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Filter Chips Row (Shown for ALL inventory tab) */}
          {activeBottomTab === 'ALL' && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
            >
              {filterChips.map((chip) => {
                const isSelected = activeFilterChip === chip;
                return (
                  <TouchableOpacity
                    key={chip}
                    style={[
                      styles.chipBtn,
                      {
                        backgroundColor: isSelected
                          ? isDark
                            ? '#B8FF2C'
                            : '#2563EB'
                          : isDark
                          ? 'rgba(255,255,255,0.04)'
                          : '#FFFFFF',
                        borderColor: isSelected
                          ? isDark
                            ? '#B8FF2C'
                            : '#2563EB'
                          : isDark
                          ? '#1C3E49'
                          : '#CBD5E1',
                      },
                    ]}
                    onPress={() => handleChipPress(chip)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        {
                          color: isSelected
                            ? isDark
                              ? '#000000'
                              : '#FFFFFF'
                            : isDark
                            ? '#94A3B8'
                            : '#64748B',
                          fontWeight: isSelected ? '700' : '500',
                        },
                      ]}
                    >
                      {chip}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              <TouchableOpacity
                style={[
                  styles.refreshBtnCircle,
                  {
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFFFFF',
                    borderColor: isDark ? '#1C3E49' : '#CBD5E1',
                  },
                ]}
                onPress={handleRefresh}
                activeOpacity={0.7}
              >
                <RefreshCw size={14} color={isDark ? '#94A3B8' : '#64748B'} />
              </TouchableOpacity>
            </ScrollView>
          )}

          {/* Search Bar Input (Shown when a sub-page filter chip is active) */}
          {activeFilterChip !== null && (
            <View
              style={[
                styles.searchBoxContainer,
                {
                  backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#FFFFFF',
                  borderColor: isDark ? '#1C3E49' : '#CBD5E1',
                },
              ]}
            >
              <TextInput
                style={[styles.searchInput, { color: theme.headerText }]}
                placeholder="Search"
                placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Search size={18} color={isDark ? '#94A3B8' : '#64748B'} />
            </View>
          )}

          {/* TAB 1: ALL INVENTORY TAB CONTENT */}
          {activeBottomTab === 'ALL' && (
            <>
              {/* VIEW 0: HOME SCREEN */}
              {activeFilterChip === null && (
                <>
                  <Text style={[styles.sectionTitle, { color: theme.heroTitle }]}>
                    Inventory Monitor
                  </Text>

                  <View
                    style={[
                      styles.monitorBox,
                      { backgroundColor: theme.heroBoxBg, borderColor: theme.heroBoxBorder },
                    ]}
                  >
                    <Text style={[styles.monitorTitle, { color: theme.heroTitle }]}>
                      All inventory
                    </Text>

                    {monitorMetrics.map((m) => (
                      <View
                        key={m.label}
                        style={[
                          styles.staggeredBar,
                          {
                            width: m.width as any,
                            backgroundColor: isDark ? '#06171E' : '#F1F5F9',
                            borderColor: m.color,
                          },
                        ]}
                      >
                        <Text style={[styles.metricLabel, { color: theme.heroTitle }]}>
                          {m.label}
                        </Text>

                        <View style={styles.badgeRightGroup}>
                          <Text style={[styles.dotDot, { color: isDark ? '#64748B' : '#94A3B8' }]}>•</Text>
                          <View style={[styles.ovalBadge, { backgroundColor: m.color }]}>
                            <Text style={styles.ovalBadgeText}>{m.value}</Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>

                  <Text style={[styles.sectionTitle, { color: theme.heroTitle }]}>
                    All Inventory
                  </Text>

                  {inventoryHomeItems.map((item, idx) => {
                    const isExpanded = homeExpandedIndex === idx;

                    return (
                      <View
                        key={item.id}
                        style={[
                          styles.accordionCard,
                          { backgroundColor: theme.heroBoxBg, borderColor: theme.heroBoxBorder },
                        ]}
                      >
                        <TouchableOpacity
                          style={styles.accordionHeader}
                          onPress={() => setHomeExpandedIndex(isExpanded ? null : idx)}
                          activeOpacity={0.8}
                        >
                          <Text style={[styles.accordionTitle, { color: theme.heroTitle }]}>
                            • {item.name}
                          </Text>
                          {isExpanded ? (
                            <ChevronUp size={18} color={theme.pillArrow} />
                          ) : (
                            <ChevronDown size={18} color={theme.pillArrow} />
                          )}
                        </TouchableOpacity>

                        {isExpanded && (
                          <View
                            style={[
                              styles.accordionBody,
                              {
                                backgroundColor: isDark ? '#06171E' : '#F8FAFC',
                                borderColor: isDark ? '#0E2833' : '#E2E8F0',
                              },
                            ]}
                          >
                            <View style={styles.gridRow}>
                              <View style={styles.gridCol}>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Market Name: {item.marketName}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Total Qty (pieces): {item.totalQty}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Sets/boxes: {item.setsBoxes}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Factory: {item.factory}
                                  </Text>
                                </View>
                              </View>

                              <View style={styles.gridCol}>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Transit: {item.transit}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Core Weight: {item.coreWeight}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Gross Weight: {item.grossWeight}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Net Weight: {item.netWeight}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </>
              )}
            </>
          )}

          {/* TAB 2: FACTORY TAB CONTENT */}
          {activeBottomTab === 'FACTORY' && (
            <>
              {/* VIEW 0: FACTORY HOME VIEW */}
              {activeFilterChip === null && (
                <>
                  <Text style={[styles.sectionTitle, { color: theme.heroTitle }]}>
                    Factory Inventory Monitor
                  </Text>

                  <View
                    style={[
                      styles.monitorBox,
                      { backgroundColor: theme.heroBoxBg, borderColor: theme.heroBoxBorder },
                    ]}
                  >
                    <Text style={[styles.monitorTitle, { color: theme.heroTitle }]}>
                      Factory Production Lines
                    </Text>

                    {factoryMetrics.map((m) => (
                      <View
                        key={m.label}
                        style={[
                          styles.staggeredBar,
                          {
                            width: m.width as any,
                            backgroundColor: isDark ? '#06171E' : '#F1F5F9',
                            borderColor: m.color,
                          },
                        ]}
                      >
                        <Text style={[styles.metricLabel, { color: theme.heroTitle }]}>
                          {m.label}
                        </Text>

                        <View style={styles.badgeRightGroup}>
                          <Text style={[styles.dotDot, { color: isDark ? '#64748B' : '#94A3B8' }]}>•</Text>
                          <View style={[styles.ovalBadge, { backgroundColor: m.color }]}>
                            <Text style={styles.ovalBadgeText}>{m.value}</Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>

                  <Text style={[styles.sectionTitle, { color: theme.heroTitle }]}>
                    Factory Inventory
                  </Text>

                  {factoryHomeItems.map((item, idx) => {
                    const isExpanded = factoryHomeExpandedIndex === idx;

                    return (
                      <View
                        key={item.id}
                        style={[
                          styles.accordionCard,
                          { backgroundColor: theme.heroBoxBg, borderColor: theme.heroBoxBorder },
                        ]}
                      >
                        <TouchableOpacity
                          style={styles.accordionHeader}
                          onPress={() => setFactoryHomeExpandedIndex(isExpanded ? null : idx)}
                          activeOpacity={0.8}
                        >
                          <Text style={[styles.accordionTitle, { color: theme.heroTitle }]}>
                            • {item.name}
                          </Text>
                          {isExpanded ? (
                            <ChevronUp size={18} color={theme.pillArrow} />
                          ) : (
                            <ChevronDown size={18} color={theme.pillArrow} />
                          )}
                        </TouchableOpacity>

                        {isExpanded && (
                          <View
                            style={[
                              styles.accordionBody,
                              {
                                backgroundColor: isDark ? '#06171E' : '#F8FAFC',
                                borderColor: isDark ? '#0E2833' : '#E2E8F0',
                              },
                            ]}
                          >
                            <View style={styles.gridRow}>
                              <View style={styles.gridCol}>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Market Name: {item.marketName}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Total Qty (pieces): {item.totalQty}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Sets/boxes: {item.setsBoxes}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Factory Line: {item.factory}
                                  </Text>
                                </View>
                              </View>

                              <View style={styles.gridCol}>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Transit: {item.transit}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Core Weight: {item.coreWeight}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Gross Weight: {item.grossWeight}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Net Weight: {item.netWeight}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </>
              )}
            </>
          )}

          {/* TAB 3: GODOWN TAB CONTENT */}
          {activeBottomTab === 'GODOWN' && (
            <>
              {/* VIEW 0: GODOWN HOME VIEW */}
              {activeFilterChip === null && (
                <>
                  <View style={styles.subPageHeader}>
                    <Text style={[styles.subPageTitle, { color: theme.heroTitle }]}>Godown</Text>
                    <Text style={[styles.subPageSubtitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                      Manage Storage Facilities and Goals
                    </Text>
                  </View>

                  {/* Add New Godown Form Box */}
                  <View
                    style={[
                      styles.godownFormCard,
                      {
                        backgroundColor: isDark ? '#04151C' : '#FFFFFF',
                        borderColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1',
                      },
                    ]}
                  >
                    <Text style={[styles.formTitle, { color: theme.heroTitle }]}>Add New Godown</Text>
                    <View style={[styles.dividerLine, { backgroundColor: isDark ? '#0E2833' : '#E2E8F0' }]} />

                    <View
                      style={[
                        styles.godownInputWrapper,
                        {
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC',
                          borderColor: isDark ? '#0E2833' : '#CBD5E1',
                        },
                      ]}
                    >
                      <TextInput
                        style={[styles.godownInput, { color: theme.headerText }]}
                        placeholder="Name"
                        placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                        value={godownName}
                        onChangeText={setGodownName}
                      />
                    </View>

                    <View
                      style={[
                        styles.godownInputWrapper,
                        {
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC',
                          borderColor: isDark ? '#0E2833' : '#CBD5E1',
                        },
                      ]}
                    >
                      <TextInput
                        style={[styles.godownInput, { color: theme.headerText }]}
                        placeholder="Email"
                        placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                        keyboardType="email-address"
                        value={godownEmail}
                        onChangeText={setGodownEmail}
                      />
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.godownInputWrapper,
                        styles.dropdownInputWrapper,
                        {
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC',
                          borderColor: isDark ? '#0E2833' : '#CBD5E1',
                        },
                      ]}
                      onPress={() => setShowStateDropdown((prev) => !prev)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.godownInputText,
                          { color: godownStateVal ? theme.headerText : isDark ? '#64748B' : '#94A3B8' },
                        ]}
                      >
                        {godownStateVal || 'State'}
                      </Text>
                      <ChevronDown size={18} color={isDark ? '#64748B' : '#94A3B8'} />
                    </TouchableOpacity>
                    {showStateDropdown && (
                      <View style={[styles.dropdownOptionsBox, { backgroundColor: isDark ? '#082129' : '#FFFFFF' }]}>
                        {['Maharashtra', 'Gujarat', 'Karnataka', 'Delhi', 'Tamil Nadu'].map((st) => (
                          <TouchableOpacity
                            key={st}
                            style={styles.dropdownOptionRow}
                            onPress={() => {
                              setGodownStateVal(st);
                              setShowStateDropdown(false);
                            }}
                          >
                            <Text style={{ color: theme.headerText, fontSize: 13 }}>{st}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}

                    <TouchableOpacity
                      style={[
                        styles.godownInputWrapper,
                        styles.dropdownInputWrapper,
                        {
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC',
                          borderColor: isDark ? '#0E2833' : '#CBD5E1',
                        },
                      ]}
                      onPress={() => setShowCityDropdown((prev) => !prev)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.godownInputText,
                          { color: godownCityVal ? theme.headerText : isDark ? '#64748B' : '#94A3B8' },
                        ]}
                      >
                        {godownCityVal || 'City'}
                      </Text>
                      <ChevronDown size={18} color={isDark ? '#64748B' : '#94A3B8'} />
                    </TouchableOpacity>
                    {showCityDropdown && (
                      <View style={[styles.dropdownOptionsBox, { backgroundColor: isDark ? '#082129' : '#FFFFFF' }]}>
                        {['Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Thane'].map((ct) => (
                          <TouchableOpacity
                            key={ct}
                            style={styles.dropdownOptionRow}
                            onPress={() => {
                              setGodownCityVal(ct);
                              setShowCityDropdown(false);
                            }}
                          >
                            <Text style={{ color: theme.headerText, fontSize: 13 }}>{ct}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}

                    <View
                      style={[
                        styles.godownInputWrapper,
                        {
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC',
                          borderColor: isDark ? '#0E2833' : '#CBD5E1',
                        },
                      ]}
                    >
                      <TextInput
                        style={[styles.godownInput, { color: theme.headerText }]}
                        placeholder="Address"
                        placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                        value={godownAddress}
                        onChangeText={setGodownAddress}
                      />
                    </View>

                    <View
                      style={[
                        styles.godownInputWrapper,
                        {
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC',
                          borderColor: isDark ? '#0E2833' : '#CBD5E1',
                        },
                      ]}
                    >
                      <TextInput
                        style={[styles.godownInput, { color: theme.headerText }]}
                        placeholder="Password"
                        placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                        secureTextEntry
                        value={godownPassword}
                        onChangeText={setGodownPassword}
                      />
                    </View>

                    <TouchableOpacity style={styles.addGodownBtn} onPress={handleAddGodown} activeOpacity={0.85}>
                      <Text style={styles.addGodownBtnText}>Add Godown</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={[styles.sectionTitle, { color: theme.heroTitle }]}>Existing Godowns</Text>

                  {godownsList.map((g) => (
                    <View
                      key={g.id}
                      style={[
                        styles.godownCard,
                        {
                          backgroundColor: isDark ? '#04151C' : '#FFFFFF',
                          borderColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1',
                        },
                      ]}
                    >
                      <View style={styles.godownCardHeader}>
                        <Warehouse size={16} color="#A3E635" />
                        <Text style={[styles.godownCardTitle, { color: theme.heroTitle }]}>{g.title}</Text>
                      </View>

                      <View style={styles.godownCardDetails}>
                        <View style={styles.godownDetailRow}>
                          <MapPin size={13} color={isDark ? '#94A3B8' : '#64748B'} />
                          <Text style={[styles.godownDetailText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                            {g.address}
                          </Text>
                        </View>

                        <View style={styles.godownDetailRow}>
                          <Mail size={13} color={isDark ? '#94A3B8' : '#64748B'} />
                          <Text style={[styles.godownDetailText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                            {g.email}
                          </Text>
                        </View>

                        <View style={styles.godownDetailRow}>
                          <Lock size={13} color={isDark ? '#94A3B8' : '#64748B'} />
                          <Text style={[styles.godownDetailText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                            {g.password}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.godownCardFooter}>
                        <TouchableOpacity
                          style={[styles.actionCircleBtn, { backgroundColor: '#2563EB' }]}
                          onPress={() => handleEditGodown(g.title)}
                          activeOpacity={0.8}
                        >
                          <Pencil size={14} color="#FFFFFF" />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.actionCircleBtn, { backgroundColor: '#EF4444' }]}
                          onPress={() => handleDeleteGodown(g.id, g.title)}
                          activeOpacity={0.8}
                        >
                          <Trash2 size={14} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </>
              )}
            </>
          )}

          {/* TAB 4: TRANSIT TAB CONTENT */}
          {activeBottomTab === 'TRANSIT' && (
            <>
              {/* VIEW 0: TRANSIT HOME VIEW */}
              {activeFilterChip === null && (
                <>
                  <Text style={[styles.sectionTitle, { color: theme.heroTitle }]}>
                    Transit Inventory Monitor
                  </Text>

                  <View
                    style={[
                      styles.monitorBox,
                      { backgroundColor: theme.heroBoxBg, borderColor: theme.heroBoxBorder },
                    ]}
                  >
                    <Text style={[styles.monitorTitle, { color: theme.heroTitle }]}>
                      Logistics & Shipment Progress
                    </Text>

                    {transitMetrics.map((m) => (
                      <View
                        key={m.label}
                        style={[
                          styles.staggeredBar,
                          {
                            width: m.width as any,
                            backgroundColor: isDark ? '#06171E' : '#F1F5F9',
                            borderColor: m.color,
                          },
                        ]}
                      >
                        <Text style={[styles.metricLabel, { color: theme.heroTitle }]}>
                          {m.label}
                        </Text>

                        <View style={styles.badgeRightGroup}>
                          <Text style={[styles.dotDot, { color: isDark ? '#64748B' : '#94A3B8' }]}>•</Text>
                          <View style={[styles.ovalBadge, { backgroundColor: m.color }]}>
                            <Text style={styles.ovalBadgeText}>{m.value}</Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>

                  <Text style={[styles.sectionTitle, { color: theme.heroTitle }]}>
                    Transit Inventory
                  </Text>

                  {transitHomeItems.map((item, idx) => {
                    const isExpanded = transitHomeExpandedIndex === idx;

                    return (
                      <View
                        key={item.id}
                        style={[
                          styles.accordionCard,
                          { backgroundColor: theme.heroBoxBg, borderColor: theme.heroBoxBorder },
                        ]}
                      >
                        <TouchableOpacity
                          style={styles.accordionHeader}
                          onPress={() => setTransitHomeExpandedIndex(isExpanded ? null : idx)}
                          activeOpacity={0.8}
                        >
                          <Text style={[styles.accordionTitle, { color: theme.heroTitle }]}>
                            • {item.name}
                          </Text>
                          {isExpanded ? (
                            <ChevronUp size={18} color={theme.pillArrow} />
                          ) : (
                            <ChevronDown size={18} color={theme.pillArrow} />
                          )}
                        </TouchableOpacity>

                        {isExpanded && (
                          <View
                            style={[
                              styles.accordionBody,
                              {
                                backgroundColor: isDark ? '#06171E' : '#F8FAFC',
                                borderColor: isDark ? '#0E2833' : '#E2E8F0',
                              },
                            ]}
                          >
                            <View style={styles.gridRow}>
                              <View style={styles.gridCol}>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Market Name: {item.marketName}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Total Qty (pieces): {item.totalQty}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Sets/boxes: {item.setsBoxes}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Factory: {item.factory}
                                  </Text>
                                </View>
                              </View>

                              <View style={styles.gridCol}>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Transit: {item.transit}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Core Weight: {item.coreWeight}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Gross Weight: {item.grossWeight}
                                  </Text>
                                </View>
                                <View style={styles.gridItem}>
                                  <Play size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                                  <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                    Net Weight: {item.netWeight}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  })}

                  {/* Add New Transit Form */}
                  <View
                    style={[
                      styles.godownFormCard,
                      {
                        backgroundColor: isDark ? '#04151C' : '#FFFFFF',
                        borderColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1',
                      },
                    ]}
                  >
                    <Text style={[styles.formTitle, { color: theme.heroTitle }]}>Add New Transit Shipment</Text>
                    <View style={[styles.dividerLine, { backgroundColor: isDark ? '#0E2833' : '#E2E8F0' }]} />

                    <View
                      style={[
                        styles.godownInputWrapper,
                        {
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC',
                          borderColor: isDark ? '#0E2833' : '#CBD5E1',
                        },
                      ]}
                    >
                      <TextInput
                        style={[styles.godownInput, { color: theme.headerText }]}
                        placeholder="Vehicle Number (e.g. MH-12-AB-3456)"
                        placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                        value={transitVehicleNo}
                        onChangeText={setTransitVehicleNo}
                      />
                    </View>

                    <View
                      style={[
                        styles.godownInputWrapper,
                        {
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC',
                          borderColor: isDark ? '#0E2833' : '#CBD5E1',
                        },
                      ]}
                    >
                      <TextInput
                        style={[styles.godownInput, { color: theme.headerText }]}
                        placeholder="Driver Contact Number"
                        placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                        keyboardType="phone-pad"
                        value={transitDriverContact}
                        onChangeText={setTransitDriverContact}
                      />
                    </View>

                    <View
                      style={[
                        styles.godownInputWrapper,
                        {
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC',
                          borderColor: isDark ? '#0E2833' : '#CBD5E1',
                        },
                      ]}
                    >
                      <TextInput
                        style={[styles.godownInput, { color: theme.headerText }]}
                        placeholder="Origin Location"
                        placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                        value={transitOrigin}
                        onChangeText={setTransitOrigin}
                      />
                    </View>

                    <View
                      style={[
                        styles.godownInputWrapper,
                        {
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC',
                          borderColor: isDark ? '#0E2833' : '#CBD5E1',
                        },
                      ]}
                    >
                      <TextInput
                        style={[styles.godownInput, { color: theme.headerText }]}
                        placeholder="Destination Godown"
                        placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                        value={transitDestination}
                        onChangeText={setTransitDestination}
                      />
                    </View>

                    <TouchableOpacity style={styles.addGodownBtn} onPress={handleAddTransit} activeOpacity={0.85}>
                      <Text style={styles.addGodownBtnText}>Add Transit Shipment</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Active Shipments List */}
                  <Text style={[styles.sectionTitle, { color: theme.heroTitle }]}>Active Shipments in Transit</Text>

                  {transitShipmentsList.map((t) => (
                    <View
                      key={t.id}
                      style={[
                        styles.godownCard,
                        {
                          backgroundColor: isDark ? '#04151C' : '#FFFFFF',
                          borderColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1',
                        },
                      ]}
                    >
                      <View style={styles.godownCardHeader}>
                        <Truck size={16} color="#38BDF8" />
                        <Text style={[styles.godownCardTitle, { color: theme.heroTitle }]}>{t.title}</Text>

                        <View
                          style={[
                            styles.miniBadge,
                            {
                              backgroundColor: isDark ? '#082129' : '#E2E8F0',
                              marginLeft: 'auto',
                            },
                          ]}
                        >
                          <Text style={{ color: '#38BDF8', fontSize: 10, fontWeight: '700' }}>{t.status}</Text>
                        </View>
                      </View>

                      <View style={styles.godownCardDetails}>
                        <View style={styles.godownDetailRow}>
                          <Truck size={13} color={isDark ? '#94A3B8' : '#64748B'} />
                          <Text style={[styles.godownDetailText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                            {t.vehicleNo}
                          </Text>
                        </View>

                        <View style={styles.godownDetailRow}>
                          <Navigation size={13} color={isDark ? '#94A3B8' : '#64748B'} />
                          <Text style={[styles.godownDetailText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                            {t.route}
                          </Text>
                        </View>

                        <View style={styles.godownDetailRow}>
                          <Phone size={13} color={isDark ? '#94A3B8' : '#64748B'} />
                          <Text style={[styles.godownDetailText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                            {t.driverContact}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.godownCardFooter}>
                        <TouchableOpacity
                          style={[styles.actionCircleBtn, { backgroundColor: '#EF4444' }]}
                          onPress={() => handleDeleteTransit(t.id, t.title)}
                          activeOpacity={0.8}
                        >
                          <Trash2 size={14} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </>
              )}
            </>
          )}

          {/* COMMON SUB-PAGES: SEE ALL PRODUCTS & BARCODE HISTORY (Rendered for ANY tab when chip is active!) */}
          {(activeFilterChip === 'All Products' || activeFilterChip === 'Show All') && (
            <>
              <Text style={[styles.sectionTitle, { color: theme.heroTitle }]}>
                See All Products ({activeBottomTab})
              </Text>

              {filteredAllProducts.map((item, idx) => {
                const isExpanded = allProductsExpandedIndex === idx;

                return (
                  <View
                    key={item.id}
                    style={[
                      styles.accordionCard,
                      {
                        backgroundColor: theme.heroBoxBg,
                        borderColor: isDark ? 'rgba(0, 229, 255, 0.18)' : theme.heroBoxBorder,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      style={styles.productHeader}
                      onPress={() => setAllProductsExpandedIndex(isExpanded ? null : idx)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.productTitle, { color: theme.heroTitle }]}>
                        • {item.title} ({activeBottomTab})
                      </Text>

                      <View style={styles.headerBadgesGroup}>
                        <View style={[styles.miniBadge, { backgroundColor: isDark ? '#082129' : '#E2E8F0' }]}>
                          <Package size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                          <Text style={[styles.miniBadgeText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                            {item.tag1}
                          </Text>
                        </View>

                        <View style={[styles.miniBadge, { backgroundColor: isDark ? '#082129' : '#E2E8F0' }]}>
                          <Calendar size={10} color={isDark ? '#94A3B8' : '#64748B'} />
                          <Text style={[styles.miniBadgeText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                            {item.date}
                          </Text>
                        </View>
                      </View>

                      {isExpanded ? (
                        <ChevronUp size={18} color={theme.pillArrow} />
                      ) : (
                        <ChevronDown size={18} color={theme.pillArrow} />
                      )}
                    </TouchableOpacity>

                    {isExpanded && (
                      <View
                        style={[
                          styles.accordionBody,
                          {
                            backgroundColor: isDark ? '#04151C' : '#F8FAFC',
                            borderColor: isDark ? '#0E2833' : '#E2E8F0',
                          },
                        ]}
                      >
                        <Text style={[styles.projectDetailsTitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                          Project Details ({activeBottomTab})
                        </Text>

                        <View style={[styles.dividerLine, { backgroundColor: isDark ? '#0E2833' : '#E2E8F0' }]} />

                        <View style={styles.actionCardsRow}>
                          <View style={styles.masterSkuCard}>
                            <Text style={styles.masterSkuText}>Master SKU:</Text>
                            <View style={styles.qrCodeWrapper}>
                              <QRCodeGraphic size={36} color="#000000" />
                            </View>
                          </View>

                          <TouchableOpacity
                            style={styles.deleteRecordsBtn}
                            onPress={() => handleDeleteRecord(item.id, item.title)}
                            activeOpacity={0.85}
                          >
                            <Text style={styles.deleteBtnText}>Delete Records</Text>
                          </TouchableOpacity>
                        </View>

                        <View style={styles.productInfoRow}>
                          <View
                            style={[
                              styles.infoBadgeCard,
                              {
                                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#FFFFFF',
                                borderColor: isDark ? '#0E2833' : '#CBD5E1',
                              },
                            ]}
                          >
                            <Package size={12} color={isDark ? '#94A3B8' : '#64748B'} />
                            <Text style={[styles.infoBadgeText, { color: theme.heroTitle }]}>
                              Product Name: {item.productName}
                            </Text>
                          </View>

                          <View
                            style={[
                              styles.infoBadgeCard,
                              {
                                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#FFFFFF',
                                borderColor: isDark ? '#0E2833' : '#CBD5E1',
                              },
                            ]}
                          >
                            <Tag size={12} color={isDark ? '#94A3B8' : '#64748B'} />
                            <Text style={[styles.infoBadgeText, { color: theme.heroTitle }]}>
                              SKU Code: {item.skuCode}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
            </>
          )}

          {(activeFilterChip === 'Barcode History' || activeFilterChip === 'Show All') && (
            <>
              <Text style={[styles.sectionTitle, { color: theme.heroTitle }]}>
                Barcode Data Records ({activeBottomTab})
              </Text>

              {filteredBarcodeRecords.map((item, idx) => {
                const isExpanded = barcodeExpandedIndex === idx;

                return (
                  <View
                    key={item.id}
                    style={[
                      styles.accordionCard,
                      {
                        backgroundColor: theme.heroBoxBg,
                        borderColor: isDark ? 'rgba(0, 229, 255, 0.18)' : theme.heroBoxBorder,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      style={styles.accordionHeader}
                      onPress={() => setBarcodeExpandedIndex(isExpanded ? null : idx)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.accordionTitle, { color: theme.heroTitle }]}>
                        • {item.title}
                      </Text>
                      {isExpanded ? (
                        <ChevronUp size={18} color={theme.pillArrow} />
                      ) : (
                        <ChevronDown size={18} color={theme.pillArrow} />
                      )}
                    </TouchableOpacity>

                    {isExpanded && (
                      <View
                        style={[
                          styles.accordionBody,
                          {
                            backgroundColor: isDark ? '#04151C' : '#F8FAFC',
                            borderColor: isDark ? '#0E2833' : '#E2E8F0',
                          },
                        ]}
                      >
                        <View style={styles.gridRow}>
                          <View style={styles.gridCol}>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                Packed: {item.packed}
                              </Text>
                            </View>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                Batch: {item.batch}
                              </Text>
                            </View>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                Shift: {item.shift}
                              </Text>
                            </View>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                No of Barcodes: {item.noOfBarcodes}
                              </Text>
                            </View>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                Location: {activeBottomTab} Location 1
                              </Text>
                            </View>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                Current Time: {item.currentTime}
                              </Text>
                            </View>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                Rewinder: {item.rewinder}
                              </Text>
                            </View>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                Edge: {item.edge}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.gridCol}>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                Winder: {item.winder}
                              </Text>
                            </View>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                Mixer: {item.mixer}
                              </Text>
                            </View>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                SKUC: {item.skuc}
                              </Text>
                            </View>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                SKUN: {item.skun}
                              </Text>
                            </View>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                Core Wt: {item.coreWt}
                              </Text>
                            </View>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                Gross Wt: {item.grossWt}
                              </Text>
                            </View>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                Net Wt: {item.netWt}
                              </Text>
                            </View>
                            <View style={styles.gridItem}>
                              <CircleOff size={12} color={isDark ? '#64748B' : '#94A3B8'} />
                              <Text style={[styles.gridText, { color: theme.heroTitle }]}>
                                Batch list: {item.batchList}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
            </>
          )}
        </ScrollView>

        {/* Glass Bottom Navigation Capsule */}
        <View style={styles.bottomBarContainer}>
          <View
            style={[
              styles.bottomNavBar,
              {
                backgroundColor: isDark ? 'rgba(10, 24, 31, 0.92)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: isDark ? 'rgba(0, 229, 255, 0.18)' : '#E2E8F0',
              },
            ]}
          >
            {/* Tab 1: All inventory */}
            <TouchableOpacity
              style={[
                styles.navTabBtn,
                activeBottomTab === 'ALL' && [
                  styles.activeGlowTab,
                  {
                    backgroundColor: isDark ? '#B8FF2C' : '#2563EB',
                  },
                ],
              ]}
              onPress={() => {
                setActiveBottomTab('ALL');
                setActiveFilterChip(null);
              }}
              activeOpacity={0.8}
            >
              <Database
                size={18}
                color={
                  activeBottomTab === 'ALL'
                    ? isDark
                      ? '#000000'
                      : '#FFFFFF'
                    : isDark
                    ? '#94A3B8'
                    : '#64748B'
                }
              />
              <Text
                style={[
                  styles.navTabText,
                  {
                    color:
                      activeBottomTab === 'ALL'
                        ? isDark
                          ? '#000000'
                          : '#FFFFFF'
                        : isDark
                        ? '#94A3B8'
                        : '#64748B',
                    fontWeight: activeBottomTab === 'ALL' ? '700' : '500',
                  },
                ]}
              >
                All inventory
              </Text>
            </TouchableOpacity>

            {/* Tab 2: Factory */}
            <TouchableOpacity
              style={[
                styles.navTabBtn,
                activeBottomTab === 'FACTORY' && [
                  styles.activeGlowTab,
                  {
                    backgroundColor: isDark ? '#B8FF2C' : '#2563EB',
                  },
                ],
              ]}
              onPress={() => {
                setActiveBottomTab('FACTORY');
                setActiveFilterChip(null);
              }}
              activeOpacity={0.8}
            >
              <Factory
                size={18}
                color={
                  activeBottomTab === 'FACTORY'
                    ? isDark
                      ? '#000000'
                      : '#FFFFFF'
                    : isDark
                    ? '#94A3B8'
                    : '#64748B'
                }
              />
              <Text
                style={[
                  styles.navTabText,
                  {
                    color:
                      activeBottomTab === 'FACTORY'
                        ? isDark
                          ? '#000000'
                          : '#FFFFFF'
                        : isDark
                        ? '#94A3B8'
                        : '#64748B',
                    fontWeight: activeBottomTab === 'FACTORY' ? '700' : '500',
                  },
                ]}
              >
                Factory
              </Text>
            </TouchableOpacity>

            {/* Tab 3: Godown */}
            <TouchableOpacity
              style={[
                styles.navTabBtn,
                activeBottomTab === 'GODOWN' && [
                  styles.activeGlowTab,
                  {
                    backgroundColor: isDark ? '#B8FF2C' : '#2563EB',
                  },
                ],
              ]}
              onPress={() => {
                setActiveBottomTab('GODOWN');
                setActiveFilterChip(null);
              }}
              activeOpacity={0.8}
            >
              <Warehouse
                size={18}
                color={
                  activeBottomTab === 'GODOWN'
                    ? isDark
                      ? '#000000'
                      : '#FFFFFF'
                    : isDark
                    ? '#94A3B8'
                    : '#64748B'
                }
              />
              <Text
                style={[
                  styles.navTabText,
                  {
                    color:
                      activeBottomTab === 'GODOWN'
                        ? isDark
                          ? '#000000'
                          : '#FFFFFF'
                        : isDark
                        ? '#94A3B8'
                        : '#64748B',
                    fontWeight: activeBottomTab === 'GODOWN' ? '700' : '500',
                  },
                ]}
              >
                Godown
              </Text>
            </TouchableOpacity>

            {/* Tab 4: Transit */}
            <TouchableOpacity
              style={[
                styles.navTabBtn,
                activeBottomTab === 'TRANSIT' && [
                  styles.activeGlowTab,
                  {
                    backgroundColor: isDark ? '#B8FF2C' : '#2563EB',
                  },
                ],
              ]}
              onPress={() => {
                setActiveBottomTab('TRANSIT');
                setActiveFilterChip(null);
              }}
              activeOpacity={0.8}
            >
              <Truck
                size={18}
                color={
                  activeBottomTab === 'TRANSIT'
                    ? isDark
                      ? '#000000'
                      : '#FFFFFF'
                    : isDark
                    ? '#94A3B8'
                    : '#64748B'
                }
              />
              <Text
                style={[
                  styles.navTabText,
                  {
                    color:
                      activeBottomTab === 'TRANSIT'
                        ? isDark
                          ? '#000000'
                          : '#FFFFFF'
                        : isDark
                        ? '#94A3B8'
                        : '#64748B',
                    fontWeight: activeBottomTab === 'TRANSIT' ? '700' : '500',
                  },
                ]}
              >
                Transit
              </Text>
            </TouchableOpacity>
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
    paddingBottom: 12,
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 110,
    gap: 14,
  },
  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  chipBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
    fontFamily: 'Inter',
  },
  refreshBtnCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  searchBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    marginVertical: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Inter',
    paddingVertical: 0,
  },
  subPageHeader: {
    marginTop: 4,
    marginBottom: 4,
    gap: 2,
  },
  subPageTitle: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  subPageSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  godownFormCard: {
    width: '100%',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    gap: 10,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  godownInputWrapper: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  dropdownInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  godownInput: {
    fontSize: 13,
    fontFamily: 'Inter',
    flex: 1,
  },
  godownInputText: {
    fontSize: 13,
    fontFamily: 'Inter',
  },
  dropdownOptionsBox: {
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1C3E49',
    gap: 8,
  },
  dropdownOptionRow: {
    paddingVertical: 6,
  },
  addGodownBtn: {
    backgroundColor: '#B8FF2C',
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  addGodownBtnText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  godownCard: {
    width: '100%',
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  godownCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  godownCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  godownCardDetails: {
    gap: 8,
  },
  godownDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  godownDetailText: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'Inter',
    flex: 1,
  },
  godownCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 4,
  },
  actionCircleBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
    marginTop: 4,
  },
  monitorBox: {
    width: '100%',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    gap: 10,
  },
  monitorTitle: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  staggeredBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  badgeRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dotDot: {
    fontSize: 12,
    fontWeight: '700',
  },
  ovalBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  ovalBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000000',
    fontFamily: 'Inter',
  },
  accordionCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  headerBadgesGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 'auto',
    marginRight: 6,
  },
  miniBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  miniBadgeText: {
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  accordionTitle: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  accordionBody: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    gap: 12,
  },
  projectDetailsTitle: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  dividerLine: {
    height: 1,
    width: '100%',
  },
  actionCardsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  masterSkuCard: {
    flex: 1,
    backgroundColor: '#B8FF2C',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  masterSkuText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000000',
    fontFamily: 'Inter',
  },
  qrCodeWrapper: {
    padding: 2,
    backgroundColor: '#B8FF2C',
    borderRadius: 6,
  },
  deleteRecordsBtn: {
    backgroundColor: '#DC2626',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  productInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoBadgeCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  infoBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  gridCol: {
    flex: 1,
    gap: 8,
  },
  gridItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  gridText: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  bottomNavBar: {
    height: 58,
    borderRadius: 29,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderWidth: 1,
  },
  navTabBtn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    height: 48,
    borderRadius: 24,
  },
  activeGlowTab: {
    borderRadius: 24,
    shadowColor: '#B8FF2C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  navTabText: {
    fontSize: 9,
    fontFamily: 'Inter',
  },
});
