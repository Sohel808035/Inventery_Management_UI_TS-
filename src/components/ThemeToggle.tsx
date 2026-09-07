import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';

interface ThemeToggleProps {
  mode: ThemeMode;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ mode, onToggle }) => {
  const rotateAnim = useRef(new Animated.Value(mode === 'dark' ? 0 : 1)).current;
  const theme = ThemeColors[mode];

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: mode === 'dark' ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [mode]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          backgroundColor: theme.toggleBg,
        },
      ]}
    >
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        {mode === 'dark' ? (
          <Sun size={18} color={theme.toggleIcon} />
        ) : (
          <Moon size={18} color={theme.toggleIcon} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
