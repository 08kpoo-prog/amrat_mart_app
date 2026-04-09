import { Drawer } from 'expo-router/drawer';

export default function VendorDrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerTitle: 'Vendor Dashboard',
        drawerActiveTintColor: '#0C831F',
      }}
    />
  );
}
