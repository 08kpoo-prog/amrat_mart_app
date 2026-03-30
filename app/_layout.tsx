import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts or data if needed
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <Stack
      initialRouteName="auth"   // ⭐ IMPORTANT
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="auth" />
      <Stack.Screen name="(drawer)" />
    </Stack>
  );
}