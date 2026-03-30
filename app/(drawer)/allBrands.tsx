import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// Components
import SearchBar from '@/components/SearchBar';
import PromoSlider from '@/components/PromoSlider';
import ShopByBrand, { BrandItem } from '@/components/ShopByBrand';
import SweetsGrid from '@/components/SweetsGrid';
import { INDIAN_SWEETS_PRODUCTS } from '@/constants/dummyData/dummyData';
const BRAND_DATA: BrandItem[] = [
  {
    id: '1',
    name: 'Amul',
    logo: { uri: 'https://reactnative.dev/img/tiny_logo.png' },
    color: '#F0F7FF',
  },
  {
    id: '2',
    name: 'Paper Boat',
   logo: { uri: 'https://reactnative.dev/img/tiny_logo.png' },
    color: '#F4E7E6',
  },
   {
    id: '3',
    name: 'Amul',
    logo: { uri: 'https://reactnative.dev/img/tiny_logo.png' },
    color: '#F0F7FF',
  },
  {
    id: '4',
    name: 'Paper Boat',
   logo: { uri: 'https://reactnative.dev/img/tiny_logo.png' },
    color: '#F4E7E6',
  },
   {
    id: '5',
    name: 'Amul',
    logo: { uri: 'https://reactnative.dev/img/tiny_logo.png' },
    color: '#F0F7FF',
  },
  {
    id: '6',
    name: 'Paper Boat',
   logo: { uri: 'https://reactnative.dev/img/tiny_logo.png' },
    color: '#F4E7E6',
  },
];

export default function HomeScreen() {
  const handleSeeAllRedirection = () => {
    console.log("hiiiiiii")
  };

  return (
    <View style={styles.mainContainer}>

      {/* Sticky SearchBar */}
      <View style={styles.searchWrapper}>
        <SearchBar
          value=""
          onChangeText={() => { }}
          onFilterPress={() => { }}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* <PromoSlider data={[]} /> */}

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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchWrapper: {
    height: 100,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: '#f2eeeee0',
    marginTop: 15,
    zIndex: 10,
    elevation: 5,
  },

  scrollContent: {
    paddingBottom: 100,
  },
});