import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';

export type SystemTab = 'INVENTORY' | 'GRIN' | 'INCENTIVE';

interface SystemTabBarProps {
  mode: ThemeMode;
  activeTab: SystemTab;
  onSelectTab: (tab: SystemTab) => void;
}

export const SystemTabBar: React.FC<SystemTabBarProps> = ({
  mode,
  activeTab,
  onSelectTab,
}) => {
  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  const tabs: { key: SystemTab; label: string }[] = [
    { key: 'INVENTORY', label: 'Inventory Management' },
    { key: 'GRIN', label: 'Grin System' },
    { key: 'INCENTIVE', label: 'Incentive System' },
  ];

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {tabs.map((tab, idx) => {
          const isActive = activeTab === tab.key;
          return (
            <React.Fragment key={tab.key}>
              <TouchableOpacity
                onPress={() => onSelectTab(tab.key)}
                activeOpacity={0.7}
                style={styles.tabButton}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: isActive
                        ? isDark
                          ? '#00E5FF'
                          : '#2563EB'
                        : isDark
                        ? '#94A3B8'
                        : '#475569',
                      fontWeight: isActive ? '700' : '500',
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>

              {idx < tabs.length - 1 && (
                <View
                  style={[
                    styles.divider,
                    { backgroundColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)' },
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  tabButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter',
  },
  divider: {
    width: 1,
    height: 16,
    marginHorizontal: 8,
  },
});
