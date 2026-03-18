import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

// Components
import SearchBar from '@/components/SearchBar';
import PromoSlider from '@/components/PromoSlider';
import ProductSection from '@/components/ProductSection';
import ShopByBrand, { BrandItem } from '@/components/ShopByBrand';
import SweetsGrid from '@/components/SweetsGrid';
import { INDIAN_SWEETS_PRODUCTS } from '@/constants/dummyData/dummyData';

const BRAND_DATA: BrandItem[] = [
  {
    id: '1',
    name: 'Amul',
    // Using a placeholder image service
    logo: { uri: 'https://placehold.jp/24/001A3F/ffffff/150x150.png?text=Amul' },
    color: '#F0F7FF'
  },
  {
    id: '2',
    name: 'Paper Boat',
    logo: { uri: 'https://placehold.jp/24/ff3f6c/ffffff/150x150.png?text=PaperBoat' },
    color: '#F4E7E6'
  },
  {
    id: '3',
    name: 'Haldiram',
    logo: { uri: 'https://placehold.jp/24/d32f2f/ffffff/150x150.png?text=Haldiram' },
    color: '#FCF7ED'
  },
  {
    id: '4',
    name: "Let's Try",
    logo: { uri: 'https://placehold.jp/24/fbc02d/000000/150x150.png?text=LetsTry' },
    color: '#FEEFC2'
  },
  {
    id: '5',
    name: "Bikaji",
    logo: { uri: 'https://placehold.jp/24/7b1fa2/ffffff/150x150.png?text=Bikaji' },
    color: '#F3E5F5'
  },
];

export default function HomeScreen() {

  const handleSeeAllRedirection = () => {
    console.log("hiiiiiii")
    // router.push('/(tabs)/search' as any);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Re-enabled your components for a full layout view */}
        <SearchBar
          value=""
          onChangeText={() => { }}
          onFilterPress={() => { }}
        />

        <PromoSlider data={[]} />

        {/* The Brand Section */}
        <ShopByBrand
          title="Shop by brands"
          data={BRAND_DATA}
          onSeeAllPress={handleSeeAllRedirection}
          onBrandPress={(id) => console.log('Brand pressed:', id)}
        />

        <SweetsGrid
          title="Indulge in Indian sweets"
          products={INDIAN_SWEETS_PRODUCTS}
          onUpdateCart={(updatedQuantities) => {
            console.log('HomeScreen Cart Updated:', updatedQuantities);
          }}
        />

        {/* <ProductSection title="Frequently bought" products={[]} /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
    paddingTop: 10, // Added some top padding for the search bar
  },
});