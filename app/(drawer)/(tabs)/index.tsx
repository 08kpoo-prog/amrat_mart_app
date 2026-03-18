
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

// Your Components
import CategoryGrid from '@/components/CategoryGrid';
import ProductSection from '@/components/ProductSection';
import PromoSlider from '@/components/PromoSlider';
import SearchBar from '@/components/SearchBar';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { BOUGHT_PRODUCTS, CATEGORIES, MOCK_PROMOS } from '@/constants/dummyData/dummyData';


export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;

  // Animation values for the scroll logic
  const lastScrollY = useRef(0);
  const tabBarValue = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event: any) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        
        // Blinkit logic: hide when scrolling down, show when scrolling up
        if (currentOffset > lastScrollY.current && currentOffset > 50) {
          // Scrolling Down
          Animated.timing(tabBarValue, {
            toValue: 100,
            duration: 250,
            useNativeDriver: true,
          }).start();
        } else if (currentOffset < lastScrollY.current) {
          // Scrolling Up
          Animated.timing(tabBarValue, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }).start();
        }
        lastScrollY.current = currentOffset;
      },
    }
  );

  // return (
  //   <View style={styles.container}>
  //     <Animated.ScrollView
  //       onScroll={handleScroll}
  //       scrollEventThrottle={16}
  //       contentContainerStyle={styles.scrollContent}
  //       showsVerticalScrollIndicator={false}
  //     >
  //       <SearchBar
  //         value={search}
  //         onChangeText={setSearch}
  //         onFilterPress={() => console.log("Filter opened")}
  //         placeholder="Search products..."
  //         containerStyle={{ marginHorizontal: 15, marginTop: 10 }}
  //       />
        
  //       <PromoSlider data={MOCK_PROMOS} />
        
  //       <CategoryGrid 
  //         data={CATEGORIES} 
  //         onSeeAll={() => {
  //           console.log('Redirecting to Search Tab');
  //           router.push('/allBrands' as any);
  //         }} 
  //       />
        
  //       <ProductSection 
  //         title="Frequently bought together" 
  //         products={BOUGHT_PRODUCTS}
  //         onAdd={(item) => console.log('Added:', item.name)}
  //       />
  //     </Animated.ScrollView>
  //   </View>
  // );
  return (
  <LinearGradient
    colors={['#F8F1E9', '#F5EBDD', '#EFE3D3']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.container}
  >
    {/* ✨ Optional Glow */}
    <View style={styles.glow} />

    <Animated.ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <SearchBar
        value={search}
        onChangeText={setSearch}
        onFilterPress={() => console.log("Filter opened")}
        placeholder="Search products..."
        containerStyle={{ marginHorizontal: 15, marginTop: 10 }}
      />

      <PromoSlider data={MOCK_PROMOS} />

      <CategoryGrid 
        data={CATEGORIES} 
        onSeeAll={() => {
          router.push('/allBrands' as any);
        }} 
      />

      <ProductSection 
        title="Frequently bought together" 
        products={BOUGHT_PRODUCTS}
        onAdd={(item) => console.log('Added:', item.name)}
      />
    </Animated.ScrollView>
  </LinearGradient>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 120,
  },

  // ✨ Glow effect (matches your image)
  glow: {
    position: 'absolute',
    top: -80,
    left: -60,
    width: 250,
    height: 250,
    backgroundColor: '#FFF3E0',
    borderRadius: 150,
    opacity: 0.4,
  },
});