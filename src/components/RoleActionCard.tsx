import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { Users, ArrowUpRight, LucideIcon } from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';

interface RoleActionCardProps {
  mode: ThemeMode;
  title: string;
  icon?: LucideIcon;
  onPress: () => void;
}

export const RoleActionCard: React.FC<RoleActionCardProps> = ({
  mode,
  title,
  icon: CustomIcon,
  onPress,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const IconComponent = CustomIcon || Users;

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.rowCard,
          {
            backgroundColor: isDark ? '#02141A' : '#F1F5F9',
            borderColor: isDark ? 'rgba(0, 229, 255, 0.25)' : '#CBD5E1',
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.leftSection}>
          <View
            style={[
              styles.iconBadge,
              {
                backgroundColor: isDark ? 'rgba(163, 230, 53, 0.15)' : '#DBEAFE',
                borderColor: isDark ? '#A3E635' : '#2563EB',
              },
            ]}
          >
            <IconComponent size={18} color={isDark ? '#A3E635' : '#2563EB'} />
          </View>
          <Text style={[styles.roleTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
            {title}
          </Text>
        </View>

        {/* Pill Button 'See Details ↗' */}
        <View
          style={[
            styles.pillBtn,
            {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#E2E8F0',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#CBD5E1',
            },
          ]}
        >
          <Text style={[styles.pillText, { color: isDark ? '#94A3B8' : '#475569' }]}>
            See Details
          </Text>
          <ArrowUpRight size={14} color={isDark ? '#94A3B8' : '#475569'} />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  rowCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTitle: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  pillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 12.5,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
});
