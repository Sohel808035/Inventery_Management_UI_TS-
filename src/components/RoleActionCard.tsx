import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { Users, ArrowUpRight, Award, Trophy, DollarSign, Gift, LucideIcon } from 'lucide-react-native';
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

  // Determine default icon if custom icon not provided
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
            backgroundColor: theme.rowBg,
            borderColor: theme.rowBorder,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.leftSection}>
          <View style={[styles.iconBadge, { backgroundColor: theme.rowIconBg }]}>
            <IconComponent size={18} color={theme.rowIconColor} />
          </View>
          <Text style={[styles.roleTitle, { color: theme.rowTitle }]}>{title}</Text>
        </View>

        {/* Pill Button 'See Details ↗' */}
        <View
          style={[
            styles.pillBtn,
            { backgroundColor: theme.pillBg, borderColor: theme.pillBorder },
          ]}
        >
          <Text style={[styles.pillText, { color: theme.pillText }]}>See Details</Text>
          <ArrowUpRight size={14} color={theme.pillArrow} />
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
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTitle: {
    fontSize: 18,
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
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
});
