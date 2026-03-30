import { Tabs } from 'expo-router';
import CustomTabBar from '@/components/CustomTabBar';
import Header from '@/components/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
   const insets = useSafeAreaInsets();
  return (
    <>
      <Header />
      <Tabs
        tabBar={(props) => {
          return <CustomTabBar {...props} bottomInset={insets.bottom} />;
        }}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="orders" options={{ title: 'Categories' }} />
        <Tabs.Screen name="cart" options={{ title: 'Cart' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>
    </>
  );
}