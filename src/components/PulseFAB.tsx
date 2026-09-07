import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet, View } from 'react-native';
import { Mic } from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';

interface PulseFABProps {
  mode: ThemeMode;
  onPress: () => void;
}

export const PulseFAB: React.FC<PulseFABProps> = ({ mode, onPress }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const theme = ThemeColors[mode];

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* Outer Cyan/Blue Ring 2 */}
      <Animated.View
        style={[
          styles.outerRing2,
          {
            borderColor: theme.fabRing2,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />

      {/* Outer Ring 1 */}
      <View style={[styles.outerRing1, { borderColor: theme.fabRing1 }]} />

      {/* Main Center Button */}
      <TouchableOpacity
        style={[styles.centerButton, { backgroundColor: theme.fabCenterBg }]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Mic size={24} color={theme.fabIconColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 84,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing2: {
    position: 'absolute',
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 1.5,
  },
  outerRing1: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1.5,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  centerButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
