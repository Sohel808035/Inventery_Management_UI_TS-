import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { ThemeMode } from './src/theme/landingTheme';
import { LandingScreen } from './src/screens/LandingScreen';
import { AdminDashboardView } from './src/screens/AdminDashboardView';
import { StaffDashboardView } from './src/screens/StaffDashboardView';

type ViewScreen = 'LANDING' | 'ADMIN' | 'STAFF';

export default function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [currentView, setCurrentView] = useState<ViewScreen>('LANDING');

  const handleToggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectRole = (role: 'Admin' | 'Staff') => {
    if (role === 'Admin') setCurrentView('ADMIN');
    else if (role === 'Staff') setCurrentView('STAFF');
  };

  return (
    <SafeAreaProvider>
      <View style={[styles.root, { backgroundColor: themeMode === 'dark' ? '#000000' : '#E2E8F0' }]}>
        <ExpoStatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />

        {currentView === 'LANDING' && (
          <LandingScreen
            mode={themeMode}
            onToggleTheme={handleToggleTheme}
            onSelectRole={handleSelectRole}
          />
        )}

        {currentView === 'ADMIN' && (
          <AdminDashboardView
            mode={themeMode}
            onToggleTheme={handleToggleTheme}
            onBack={() => setCurrentView('LANDING')}
          />
        )}

        {currentView === 'STAFF' && (
          <StaffDashboardView
            mode={themeMode}
            onToggleTheme={handleToggleTheme}
            onBack={() => setCurrentView('LANDING')}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
