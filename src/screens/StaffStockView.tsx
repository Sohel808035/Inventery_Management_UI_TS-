import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Boxes, MapPin, Tag, CheckCircle2 } from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';

interface StaffStockViewProps {
  mode: ThemeMode;
  onBack: () => void;
}

export const StaffStockView: React.FC<StaffStockViewProps> = ({ mode, onBack }) => {
  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  const stockItems = [
    { sku: 'EL-MBP-16', name: 'MacBook Pro M3 Max 16"', qty: 14, loc: 'Bay A4', status: 'In Stock' },
    { sku: 'HW-DRL-18V', name: 'DeWalt Cordless Drill Kit', qty: 28, loc: 'Bay C3', status: 'In Stock' },
    { sku: 'PK-BOX-MD', name: 'Shipping Boxes (Medium)', qty: 250, loc: 'Bay P1', status: 'In Stock' },
    { sku: 'EL-MON-4K', name: 'Dell UltraSharp 4K Monitor', qty: 3, loc: 'Bay A2', status: 'Low Stock' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { borderBottomColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}>
        <TouchableOpacity style={[styles.backBtn, { backgroundColor: theme.iconButtonBg }]} onPress={onBack}>
          <ChevronLeft size={20} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Staff Stock Inspector</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
          <View style={styles.bannerRow}>
            <Boxes size={22} color={theme.accent} />
            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>Live Inventory Counts</Text>
          </View>
          <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>
            Scan & audit warehouse shelf locations and real-time inventory balances.
          </Text>
        </View>

        {/* Stock List */}
        <Text style={[styles.sectionHeading, { color: theme.textPrimary }]}>Warehouse Stock Items</Text>

        {stockItems.map((item) => (
          <View
            key={item.sku}
            style={[styles.itemCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}
          >
            <View style={styles.itemTop}>
              <View style={styles.skuTag}>
                <Tag size={12} color={theme.accent} />
                <Text style={[styles.skuText, { color: theme.accent }]}>{item.sku}</Text>
              </View>
              <Text style={[styles.qtyText, { color: theme.textPrimary }]}>{item.qty} units</Text>
            </View>

            <Text style={[styles.itemName, { color: theme.textPrimary }]}>{item.name}</Text>

            <View style={styles.itemBottom}>
              <View style={styles.locRow}>
                <MapPin size={12} color={theme.textSecondary} />
                <Text style={[styles.locText, { color: theme.textSecondary }]}>{item.loc}</Text>
              </View>
              <View style={styles.statusRow}>
                <CheckCircle2 size={12} color={item.status === 'In Stock' ? '#10B981' : '#F59E0B'} />
                <Text style={{ fontSize: 12, color: item.status === 'In Stock' ? '#10B981' : '#F59E0B' }}>
                  {item.status}
                </Text>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={[styles.mainActionBtn, { backgroundColor: theme.accent }]} onPress={onBack}>
          <Text style={[styles.mainActionText, { color: isDark ? '#030303' : '#FFFFFF' }]}>Return to Landing Screen</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    padding: 20,
    gap: 14,
  },
  card: {
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
  },
  itemCard: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
  },
  itemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  skuTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  skuText: {
    fontSize: 12,
    fontWeight: '700',
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '700',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locText: {
    fontSize: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mainActionBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  mainActionText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
