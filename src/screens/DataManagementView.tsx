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
import {
  ChevronLeft,
  Menu,
  RotateCcw,
  QrCode,
  Package,
  Truck,
  CheckCircle2,
  Navigation,
  BarChart3,
  ChevronRight,
  Search,
  Trash2,
  Box,
} from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import { PulseFAB } from '../components/PulseFAB';

interface DataManagementViewProps {
  mode: ThemeMode;
  onToggleTheme: () => void;
  onBack: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  badgeColor: string;
  icon: React.ElementType;
}

interface DetailRecord {
  id: number;
  name: string;
  batch: string;
  weight: string;
}

export const DataManagementView: React.FC<DataManagementViewProps> = ({
  mode,
  onToggleTheme,
  onBack,
}) => {
  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  // Active sub-screen: null = Main Data Collections list, string = collection id
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [detailSearchQuery, setDetailSearchQuery] = useState('');

  const [collections, setCollections] = useState<CollectionItem[]>([
    {
      id: 'barcodes',
      title: 'Barcodes',
      subtitle: 'All Generated Barcodes',
      count: 10,
      badgeColor: '#A3E635',
      icon: QrCode,
    },
    {
      id: 'despatch',
      title: 'Despatch',
      subtitle: 'Items In Godown Storage',
      count: 10,
      badgeColor: '#00E5FF',
      icon: Package,
    },
    {
      id: 'delivery',
      title: 'Delivery',
      subtitle: 'Items Ready For Delivery',
      count: 10,
      badgeColor: '#C084FC',
      icon: Truck,
    },
    {
      id: 'select',
      title: 'Select',
      subtitle: 'Selected Items',
      count: 10,
      badgeColor: '#F472B6',
      icon: CheckCircle2,
    },
    {
      id: 'transit',
      title: 'Transit',
      subtitle: 'Items In Transit',
      count: 10,
      badgeColor: '#60A5FA',
      icon: Navigation,
    },
    {
      id: 'sales',
      title: 'Sales',
      subtitle: 'Sales Records',
      count: 10,
      badgeColor: '#EC4899',
      icon: BarChart3,
    },
  ]);

  // Detail records for each collection
  const [recordsMap, setRecordsMap] = useState<Record<string, DetailRecord[]>>({
    barcodes: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: 'Unknown',
      batch: 'Batch:_',
      weight: '159kg',
    })),
    despatch: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: 'Despatch Item',
      batch: 'Batch:_',
      weight: '159kg',
    })),
    delivery: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: 'Delivery Item',
      batch: 'Batch:_',
      weight: '159kg',
    })),
    select: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: 'Selected Item',
      batch: 'Batch:_',
      weight: '159kg',
    })),
    transit: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: 'Transit Item',
      batch: 'Batch:_',
      weight: '159kg',
    })),
    sales: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: 'Sales Record',
      batch: 'Batch:_',
      weight: '159kg',
    })),
  });

  const activeCollection = collections.find((c) => c.id === selectedCollectionId);

  const handleOpenCollectionDetail = (item: CollectionItem) => {
    setSelectedCollectionId(item.id);
    setDetailSearchQuery('');
  };

  const handleDeleteDetailRecord = (recordId: number) => {
    if (!selectedCollectionId) return;

    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item from the collection?',
      [
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setRecordsMap((prev) => {
              const updatedList = (prev[selectedCollectionId] || []).filter((r) => r.id !== recordId);
              const newMap = { ...prev, [selectedCollectionId]: updatedList };

              // Update main collection count
              setCollections((prevCols) =>
                prevCols.map((c) => (c.id === selectedCollectionId ? { ...c, count: updatedList.length } : c))
              );

              return newMap;
            });
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleClearFactory = () => {
    Alert.alert(
      'Clear Factory Items',
      'Are you sure you want to clear 10 Factory items?',
      [
        {
          text: 'Clear (10)',
          style: 'destructive',
          onPress: () => Alert.alert('Cleared', '10 Factory items cleared successfully.'),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleClearInTransit = () => {
    Alert.alert(
      'Clear In-Transit Items',
      'Are you sure you want to clear 03 In-Transit items?',
      [
        {
          text: 'Clear (03)',
          style: 'destructive',
          onPress: () => Alert.alert('Cleared', '03 In-Transit items cleared successfully.'),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleClearAllCollections = () => {
    Alert.alert(
      'Clear All Collections',
      'WARNING: Are you sure you want to clear ALL inventory collections? This action cannot be undone.',
      [
        {
          text: 'Clear All Collections',
          style: 'destructive',
          onPress: () => {
            setCollections((prev) => prev.map((c) => ({ ...c, count: 0 })));
            setRecordsMap({
              barcodes: [],
              despatch: [],
              delivery: [],
              select: [],
              transit: [],
              sales: [],
            });
            Alert.alert('Reset Complete', 'All data collections have been reset to 0.');
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleFabPress = () => {
    const contextName = activeCollection ? activeCollection.title : 'Data Management';
    Alert.alert(
      `${contextName} Voice Assistant`,
      `Trigger voice command or audit scan for ${contextName}:`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  // Filter detail records based on search query
  const currentRecords = selectedCollectionId ? recordsMap[selectedCollectionId] || [] : [];
  const filteredRecords = currentRecords.filter(
    (r) =>
      r.name.toLowerCase().includes(detailSearchQuery.toLowerCase()) ||
      r.batch.toLowerCase().includes(detailSearchQuery.toLowerCase()) ||
      r.weight.toLowerCase().includes(detailSearchQuery.toLowerCase())
  );

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
        {/* Background Atmosphere */}
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
            <TouchableOpacity
              style={[styles.backBtnCircle, { backgroundColor: theme.menuBg }]}
              onPress={selectedCollectionId ? () => setSelectedCollectionId(null) : onBack}
              activeOpacity={0.8}
            >
              <ChevronLeft size={20} color={theme.headerText} />
            </TouchableOpacity>

            <Text style={[styles.headerTitle, { color: theme.headerText }]}>
              Item Management
            </Text>
          </View>

          <View style={styles.headerRight}>
            <ThemeToggle mode={mode} onToggle={onToggleTheme} />

            <TouchableOpacity
              style={[styles.menuBtn, { backgroundColor: theme.menuBg }]}
              onPress={selectedCollectionId ? () => setSelectedCollectionId(null) : onBack}
              activeOpacity={0.8}
            >
              <Menu size={18} color={theme.menuIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        {selectedCollectionId === null ? (
          /* ================= SCREEN 1: MAIN DATA COLLECTIONS LIST ================= */
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Sub-Header Title & Subtitle */}
            <View style={styles.subPageHeader}>
              <Text style={[styles.subPageTitle, { color: theme.heroTitle }]}>Data Management</Text>
              <Text style={[styles.subPageSubtitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                View and manage your inventory data
              </Text>
            </View>

            {/* Help Tip Banner Card */}
            <View
              style={[
                styles.tipCard,
                {
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC',
                  borderColor: isDark ? '#0E2833' : '#E2E8F0',
                },
              ]}
            >
              <RotateCcw size={18} color={isDark ? '#94A3B8' : '#64748B'} style={styles.tipIcon} />
              <View style={styles.tipTextContainer}>
                <Text style={styles.tipTitle}>How To Delete Items</Text>
                <Text style={[styles.tipSubtitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                  Tap View & Delete On A Collection To Manage Individual Items Safely
                </Text>
              </View>
            </View>

            {/* Section: Data Collections */}
            <Text style={[styles.sectionTitle, { color: theme.heroTitle }]}>Data Collections</Text>

            {collections.map((item) => {
              const IconComp = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.collectionCard,
                    {
                      backgroundColor: theme.heroBoxBg,
                      borderColor: theme.heroBoxBorder,
                    },
                  ]}
                  onPress={() => handleOpenCollectionDetail(item)}
                  activeOpacity={0.85}
                >
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.cardHeaderLeft}>
                      <View style={[styles.iconBadge, { backgroundColor: item.badgeColor }]}>
                        <IconComp size={16} color="#000000" />
                      </View>

                      <View>
                        <Text style={[styles.cardTitle, { color: theme.heroTitle }]}>
                          {item.title}
                        </Text>
                        <Text style={[styles.cardSubtitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                          {item.subtitle}
                        </Text>
                      </View>
                    </View>

                    <Text style={[styles.countBadgeText, { color: item.badgeColor }]}>
                      {item.count}
                    </Text>
                  </View>

                  {/* Card Action Footer Button */}
                  <View style={styles.cardFooter}>
                    <TouchableOpacity
                      style={[
                        styles.viewDeletePill,
                        {
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#F1F5F9',
                          borderColor: isDark ? '#1C3E49' : '#CBD5E1',
                        },
                      ]}
                      onPress={() => handleOpenCollectionDetail(item)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.viewDeleteText, { color: isDark ? '#E2E8F0' : '#334155' }]}>
                        View Delete
                      </Text>
                      <ChevronRight size={13} color={isDark ? '#E2E8F0' : '#334155'} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}

            {/* Section: Danger Zone Box Container */}
            <View
              style={[
                styles.dangerContainerCard,
                {
                  backgroundColor: theme.heroBoxBg,
                  borderColor: theme.heroBoxBorder,
                },
              ]}
            >
              <Text style={[styles.dangerTitle, { color: theme.heroTitle }]}>Danger Zone</Text>

              {/* Pill 1: Clear Factory (10) */}
              <TouchableOpacity
                style={[
                  styles.dangerPillBtn,
                  {
                    backgroundColor: isDark ? '#06171E' : '#F8FAFC',
                    borderColor: isDark ? '#1C3E49' : '#CBD5E1',
                  },
                ]}
                onPress={handleClearFactory}
                activeOpacity={0.8}
              >
                <Text style={[styles.dangerPillText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                  Clear Factory (10)
                </Text>
              </TouchableOpacity>

              {/* Pill 2: Clear In-Transit (03) */}
              <TouchableOpacity
                style={[
                  styles.dangerPillBtn,
                  {
                    backgroundColor: isDark ? '#06171E' : '#F8FAFC',
                    borderColor: isDark ? '#1C3E49' : '#CBD5E1',
                  },
                ]}
                onPress={handleClearInTransit}
                activeOpacity={0.8}
              >
                <Text style={[styles.dangerPillText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                  Clear In-Transit (03)
                </Text>
              </TouchableOpacity>

              {/* Pill 3: Clear All Collections (Bright Red Accent) */}
              <TouchableOpacity
                style={styles.clearAllBtn}
                onPress={handleClearAllCollections}
                activeOpacity={0.85}
              >
                <Text style={styles.clearAllBtnText}>Clear All Collections</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          /* ================= SCREEN 2: COLLECTION DETAIL VIEW (MATCHES FIGMA SCREEN) ================= */
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Sub-Header Title & Subtitle */}
            <View style={styles.subPageHeader}>
              <Text style={[styles.subPageTitle, { color: theme.heroTitle }]}>
                {activeCollection ? `${activeCollection.title} Management` : 'Collection Management'}
              </Text>
              <Text style={[styles.subPageSubtitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                View and manage your inventory data
              </Text>
            </View>

            {/* Search Input Bar */}
            <View
              style={[
                styles.searchBarWrapper,
                {
                  backgroundColor: isDark ? '#121C22' : '#FFFFFF',
                  borderColor: isDark ? '#1C3E49' : '#CBD5E1',
                },
              ]}
            >
              <TextInput
                style={[styles.searchInput, { color: theme.headerText }]}
                placeholder="Search"
                placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                value={detailSearchQuery}
                onChangeText={setDetailSearchQuery}
              />
              <Search size={16} color={isDark ? '#64748B' : '#94A3B8'} />
            </View>

            {/* Metrics Card Box Container (Total & Filtered counts) */}
            <View
              style={[
                styles.metricsBoxCard,
                {
                  backgroundColor: theme.heroBoxBg,
                  borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#CBD5E1',
                },
              ]}
            >
              <View
                style={[
                  styles.metricRowPill,
                  {
                    backgroundColor: isDark ? '#06171E' : '#F1F5F9',
                    borderColor: isDark ? '#0E2833' : '#CBD5E1',
                  },
                ]}
              >
                <Text style={[styles.metricLabelText, { color: theme.heroTitle }]}>Total</Text>
                <Text style={styles.metricValueText}>{currentRecords.length}</Text>
              </View>

              <View
                style={[
                  styles.metricRowPill,
                  {
                    backgroundColor: isDark ? '#06171E' : '#F1F5F9',
                    borderColor: isDark ? '#0E2833' : '#CBD5E1',
                  },
                ]}
              >
                <Text style={[styles.metricLabelText, { color: theme.heroTitle }]}>Filtered</Text>
                <Text style={styles.metricValueText}>{filteredRecords.length}</Text>
              </View>
            </View>

            {/* List of Collection Row Items */}
            {filteredRecords.length === 0 ? (
              <View style={styles.emptyStateContainer}>
                <Text style={[styles.emptyStateText, { color: isDark ? '#64748B' : '#94A3B8' }]}>
                  No items match your search.
                </Text>
              </View>
            ) : (
              filteredRecords.map((record) => (
                <View
                  key={record.id}
                  style={[
                    styles.detailRowCard,
                    {
                      backgroundColor: isDark ? '#04141A' : '#FFFFFF',
                      borderColor: isDark ? 'rgba(0, 229, 255, 0.15)' : '#E2E8F0',
                    },
                  ]}
                >
                  <View style={styles.recordMainInfo}>
                    <Text style={[styles.bulletDotText, { color: theme.heroTitle }]}>
                      • {record.name}
                    </Text>

                    <Text style={[styles.dividerPipeText, { color: isDark ? '#1C3E49' : '#CBD5E1' }]}>
                      |
                    </Text>

                    <View style={styles.subInfoBadge}>
                      <Package size={11} color={isDark ? '#94A3B8' : '#64748B'} />
                      <Text style={[styles.subInfoText, { color: theme.heroTitle }]}>
                        {record.batch}
                      </Text>
                    </View>

                    <View style={styles.subInfoBadge}>
                      <Box size={11} color={isDark ? '#94A3B8' : '#64748B'} />
                      <Text style={[styles.subInfoText, { color: theme.heroTitle }]}>
                        {record.weight}
                      </Text>
                    </View>
                  </View>

                  {/* Red Circle Trash Delete Button */}
                  <TouchableOpacity
                    style={styles.redTrashBtnCircle}
                    onPress={() => handleDeleteDetailRecord(record.id)}
                    activeOpacity={0.8}
                  >
                    <Trash2 size={13} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>
        )}

        {/* Bottom Right Microphone FAB */}
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
    top: 60,
    left: '5%',
    width: 300,
    height: 300,
    borderRadius: 150,
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
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 90,
    gap: 14,
  },
  subPageHeader: {
    marginBottom: 2,
  },
  subPageTitle: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'Inter',
    letterSpacing: -0.3,
  },
  subPageSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter',
    marginTop: 2,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
  },
  tipIcon: {
    marginTop: 2,
  },
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: {
    color: '#A3E635',
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'Inter',
    marginBottom: 2,
  },
  tipSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'Inter',
    lineHeight: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
    marginTop: 4,
    marginBottom: 2,
  },
  collectionCard: {
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    gap: 10,
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
    flex: 1,
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  cardSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'Inter',
    marginTop: 1,
  },
  countBadgeText: {
    fontSize: 17,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  cardFooter: {
    alignItems: 'flex-end',
    marginTop: 2,
  },
  viewDeletePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    gap: 4,
  },
  viewDeleteText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  dangerContainerCard: {
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    gap: 12,
    marginTop: 6,
  },
  dangerTitle: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  dangerPillBtn: {
    width: '100%',
    paddingVertical: 13,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  dangerPillText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  clearAllBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearAllBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
  },

  /* ================= DETAIL VIEW STYLES ================= */
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    marginTop: 4,
    marginBottom: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter',
    padding: 0,
  },
  metricsBoxCard: {
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    gap: 10,
  },
  metricRowPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  metricLabelText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  metricValueText: {
    color: '#A3E635',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  detailRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  recordMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
  bulletDotText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  dividerPipeText: {
    fontSize: 12,
    fontWeight: '300',
  },
  subInfoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subInfoText: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  redTrashBtnCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  emptyStateContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
});
