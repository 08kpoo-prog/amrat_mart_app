import { Tabs } from 'expo-router';
import CustomTabBar from '@/components/CustomTabBar';
import Header from '@/components/Header';

export default function TabLayout() {
  return (
    <>
      <Header />
      <Tabs
        tabBar={(props) => {
          const routeName = props.state.routes[props.state.index].name;
          if (routeName === 'profile') {
            return null;
          }
          return <CustomTabBar {...props} />;
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