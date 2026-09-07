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
  Search,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileCheck,
} from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import { PulseFAB } from '../components/PulseFAB';

interface GsnGrinFormsViewProps {
  mode: ThemeMode;
  onToggleTheme: () => void;
  onBack: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface GsnGrinFormItem {
  id: string;
  companyName: string;
  status: string;
  gsnNo: string;
  grinNo: string;
  date: string;
}

export const GsnGrinFormsView: React.FC<GsnGrinFormsViewProps> = ({
  mode,
  onToggleTheme,
  onBack,
}) => {
  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('1'); // First item expanded by default as in design

  const [formsList, setFormsList] = useState<GsnGrinFormItem[]>([
    {
      id: '1',
      companyName: 'Khandesh Bearing',
      status: 'Pending Approval',
      gsnNo: '1379',
      grinNo: '1379',
      date: 'Aug 9, 2026',
    },
    {
      id: '2',
      companyName: 'Grasim Industries Limited',
      status: 'Pending Approval',
      gsnNo: '1380',
      grinNo: '1380',
      date: 'Aug 10, 2026',
    },
    {
      id: '3',
      companyName: 'Mahalaxmi pipes pvt ltd',
      status: 'Pending Approval',
      gsnNo: '1381',
      grinNo: '1381',
      date: 'Aug 11, 2026',
    },
    {
      id: '4',
      companyName: 'Paper King',
      status: 'Pending Approval',
      gsnNo: '1382',
      grinNo: '1382',
      date: 'Aug 12, 2026',
    },
    {
      id: '5',
      companyName: 'Grasim Industries Limited',
      status: 'Pending Approval',
      gsnNo: '1383',
      grinNo: '1383',
      date: 'Aug 13, 2026',
    },
    {
      id: '6',
      companyName: 'Mahalaxmi Pipes Pvt Ltd',
      status: 'Pending Approval',
      gsnNo: '1384',
      grinNo: '1384',
      date: 'Aug 14, 2026',
    },
  ]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleDeleteItem = (item: GsnGrinFormItem) => {
    Alert.alert(
      'Delete Form Entry',
      `Are you sure you want to delete form entry for "${item.companyName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setFormsList((prev) => prev.filter((f) => f.id !== item.id));
          },
        },
      ]
    );
  };

  const handleEditItem = (item: GsnGrinFormItem) => {
    Alert.alert(
      'Edit GSN/GRIN Form',
      `Editing entry for "${item.companyName}" (GSN: ${item.gsnNo}, GRIN: ${item.grinNo})...`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleFabPress = () => {
    Alert.alert(
      'GSN/GRIN Forms Voice Assistant',
      'Choose an action for GSN/GRIN Form entries:',
      [
        {
          text: 'Add New Form Entry',
          onPress: () => {
            const newItem: GsnGrinFormItem = {
              id: Date.now().toString(),
              companyName: 'New Vendor Logistics',
              status: 'Pending Approval',
              gsnNo: (1385 + formsList.length).toString(),
              grinNo: (1385 + formsList.length).toString(),
              date: 'Aug 15, 2026',
            };
            setFormsList((prev) => [newItem, ...prev]);
            setExpandedId(newItem.id);
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const filteredForms = formsList.filter(
    (item) =>
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.gsnNo.includes(searchQuery) ||
      item.grinNo.includes(searchQuery)
  );

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
              GSN / GRIN Forms
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
          {/* Search Bar Input */}
          <View
            style={[
              styles.searchBarWrapper,
              {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.75)',
                borderColor: isDark ? 'rgba(0, 229, 255, 0.15)' : '#CBD5E1',
              },
            ]}
          >
            <TextInput
              style={[styles.searchInput, { color: isDark ? '#FFFFFF' : '#0F172A' }]}
              placeholder="Search"
              placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Search size={16} color={isDark ? '#94A3B8' : '#64748B'} />
          </View>

          {/* Form Item Accordion List */}
          {filteredForms.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                No form entries found.
              </Text>
            </View>
          ) : (
            filteredForms.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <View
                  key={item.id}
                  style={[
                    styles.formCardContainer,
                    {
                      backgroundColor: isDark
                        ? 'rgba(4, 21, 28, 0.95)'
                        : 'rgba(255, 255, 255, 0.85)',
                      borderColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1',
                    },
                  ]}
                >
                  {/* Form Card Header Row */}
                  <TouchableOpacity
                    style={styles.cardHeaderPressable}
                    onPress={() => toggleExpand(item.id)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.cardTitleSection}>
                      <Text style={[styles.bulletPoint, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                        •
                      </Text>
                      <View style={styles.companyInfoGroup}>
                        <Text
                          style={[styles.companyNameText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}
                          numberOfLines={1}
                        >
                          {item.companyName}
                        </Text>

                        {/* Status Badge Pill */}
                        <View
                          style={[
                            styles.statusBadgePill,
                            {
                              backgroundColor: isDark ? 'rgba(0, 229, 255, 0.08)' : '#F1F5F9',
                              borderColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#E2E8F0',
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.statusText,
                              { color: isDark ? '#94A3B8' : '#64748B' },
                            ]}
                          >
                            {item.status}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Action Icon Group (Pencil, Red Trash Circle, Chevron) */}
                    <View style={styles.cardActionsGroup}>
                      {/* Pencil Edit Icon */}
                      <TouchableOpacity
                        style={[
                          styles.actionIconCircle,
                          {
                            backgroundColor: isDark
                              ? 'rgba(0, 229, 255, 0.15)'
                              : '#3B82F6',
                          },
                        ]}
                        onPress={() => handleEditItem(item)}
                        activeOpacity={0.8}
                      >
                        <Pencil size={13} color={isDark ? '#00E5FF' : '#FFFFFF'} />
                      </TouchableOpacity>

                      {/* Red Trash Delete Button */}
                      <TouchableOpacity
                        style={styles.deleteCircleBtn}
                        onPress={() => handleDeleteItem(item)}
                        activeOpacity={0.8}
                      >
                        <Trash2 size={13} color="#FFFFFF" />
                      </TouchableOpacity>

                      {/* Expand / Collapse Chevron Icon */}
                      <TouchableOpacity
                        style={styles.chevronToggleBtn}
                        onPress={() => toggleExpand(item.id)}
                        activeOpacity={0.8}
                      >
                        {isExpanded ? (
                          <ChevronUp size={16} color={isDark ? '#94A3B8' : '#64748B'} />
                        ) : (
                          <ChevronDown size={16} color={isDark ? '#94A3B8' : '#64748B'} />
                        )}
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>

                  {/* Expanded Accordion Body Box */}
                  {isExpanded && (
                    <View
                      style={[
                        styles.expandedBodyBox,
                        {
                          backgroundColor: isDark ? '#04171E' : '#FFFFFF',
                          borderColor: isDark ? 'rgba(0, 229, 255, 0.15)' : '#E2E8F0',
                        },
                      ]}
                    >
                      {/* GSN & GRIN Number Row */}
                      <View style={styles.detailsRow}>
                        <Text style={[styles.detailLabelValue, { color: isDark ? '#CBD5E1' : '#334155' }]}>
                          <Text style={styles.bulletDotInline}>• </Text>GSN: {item.gsnNo}
                        </Text>

                        <Text style={[styles.detailLabelValue, { color: isDark ? '#CBD5E1' : '#334155' }]}>
                          <Text style={styles.bulletDotInline}>• </Text>GRIN: {item.grinNo}
                        </Text>
                      </View>

                      {/* Date Row */}
                      <View style={styles.detailsRow}>
                        <Text style={[styles.detailLabelValue, { color: isDark ? '#CBD5E1' : '#334155' }]}>
                          <Text style={styles.bulletDotInline}>• </Text>Date: {item.date}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              );
            })
          )}
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 90,
    gap: 12,
  },

  /* Search Bar */
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter',
    padding: 0,
  },

  /* Form Card Item */
  formCardContainer: {
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    gap: 10,
  },
  cardHeaderPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    flex: 1,
  },
  bulletPoint: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: -2,
  },
  companyInfoGroup: {
    gap: 4,
    flex: 1,
  },
  companyNameText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  statusBadgePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Inter',
  },

  /* Card Right Action Icons */
  cardActionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 8,
  },
  actionIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteCircleBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronToggleBtn: {
    padding: 2,
    marginLeft: 2,
  },

  /* Expanded Accordion Body Box */
  expandedBodyBox: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    gap: 8,
    marginTop: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailLabelValue: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  bulletDotInline: {
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter',
  },
});
