
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  PERSONAL_CARE_DATA,
  INDIAN_SWEETS_PRODUCTS,
  NAVRATRI_DATA,
} from '@/constants/dummyData/dummyData';
import { router } from 'expo-router';


const SIDEBAR_DATA = [
  { id: '1', name: 'Vegetables & Fruits', icon: 'https://cdn-icons-png.flaticon.com/128/2329/2329865.png', type: 'navratri' },
  { id: '2', name: 'Dairy & Breakfast', icon: 'https://cdn-icons-png.flaticon.com/128/3050/3050158.png', type: 'sweets' },
  { id: '3', name: 'Munchies', icon: 'https://cdn-icons-png.flaticon.com/128/2553/2553691.png', type: 'mix' },
  { id: '4', name: 'Cold Drinks & Juices', icon: 'https://cdn-icons-png.flaticon.com/128/2405/2405479.png', type: 'personal' },
  { id: '5', name: 'Instant & Frozen Food', icon: 'https://cdn-icons-png.flaticon.com/128/3348/3348078.png', type: 'navratri' },
  { id: '6', name: 'Tea, Coffee & Health Drinks', icon: 'https://cdn-icons-png.flaticon.com/128/924/924514.png', type: 'sweets' },
  { id: '7', name: 'Bakery & Biscuits', icon: 'https://cdn-icons-png.flaticon.com/128/3014/3014520.png', type: 'mix' },
  { id: '8', name: 'Sweet Tooth', icon: 'https://cdn-icons-png.flaticon.com/128/2515/2515183.png', type: 'sweets' },
  { id: '9', name: 'Atta, Rice & Dal', icon: 'https://cdn-icons-png.flaticon.com/128/3014/3014488.png', type: 'navratri' },
  { id: '10', name: 'Masala, Oil & More', icon: 'https://cdn-icons-png.flaticon.com/128/2553/2553644.png', type: 'personal' },
];

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = 85;


export default function CategoryScreen() {
  const [selectedCategory, setSelectedCategory] = useState(SIDEBAR_DATA[0]);

  const getCategoryData = () => {
    switch (selectedCategory.type) {
      case 'personal':
        return PERSONAL_CARE_DATA;
      case 'sweets':
        // Adapt sweets data to match the generic structure
        return INDIAN_SWEETS_PRODUCTS.map(p => ({
          id: p.id,
          name: p.name,
          image: { uri: p.imageUri }
        }));
      case 'navratri':
        return NAVRATRI_DATA;
      default:
        // Combine datasets to create filler content
        return [...PERSONAL_CARE_DATA, ...NAVRATRI_DATA];
    }
  };

  const currentData = getCategoryData();

  // --- 3. Render Items ---
  const renderSidebarItem = ({ item }: { item: typeof SIDEBAR_DATA[0] }) => {
    const isSelected = selectedCategory.id === item.id;
    return (
      <TouchableOpacity
        style={[styles.sidebarItem, isSelected && styles.sidebarItemSelected]}
        onPress={() => setSelectedCategory(item)}
        activeOpacity={0.8}
      >
        <View style={[styles.sidebarIconContainer, isSelected && styles.sidebarIconSelected]}>
          <Image source={{ uri: item.icon }} style={styles.sidebarIcon} />
        </View>
        <Text style={[styles.sidebarText, isSelected && styles.sidebarTextSelected]}>
          {item.name}
        </Text>
        {/* The colored bar on the right edge of selected item */}
        {isSelected && <View style={styles.selectedIndicator} />}
      </TouchableOpacity>
    );
  };

  // const renderContentItem = ({ item }: { item: any }) => (
  //   <TouchableOpacity 
  //     style={styles.gridItem} 
  //     onPress={() => console.log(`Clicked on ${item.name}`)}
  //   >
  //     <View style={styles.gridImageContainer}>
  //       <Image source={item.image} style={styles.gridImage} resizeMode="contain" />
  //     </View>
  //     <Text style={styles.gridText} numberOfLines={2}>{item.name}</Text>
  //   </TouchableOpacity>
  // );

  const renderContentItem = ({ item }: { item: any }) => (
  <TouchableOpacity
    style={styles.gridItem}
    onPress={() =>
      router.push({
        pathname: "/product/[id]",
        params: { id: item.id },
      })
    }
  >
    <View style={styles.gridImageContainer}>
      <Image source={item.image} style={styles.gridImage} resizeMode="contain" />
    </View>
    <Text style={styles.gridText} numberOfLines={2}>
      {item.name}
    </Text>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <FlatList
          data={SIDEBAR_DATA}
          renderItem={renderSidebarItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.sidebarContent}
        />
      </View>
      <View style={styles.mainContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{selectedCategory.name}</Text>
          <Text style={styles.headerSubtitle}>Explore all products</Text>
        </View>

        <FlatList
          data={currentData}
          renderItem={renderContentItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: '#F0F5FC', // The distinct Blinkit light blue/gray
    borderRightWidth: 1,
    borderRightColor: '#E8E8E8',
  },

  sidebarContent: {
    paddingBottom: 80,
  },


  sidebarItem: {
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 4,
    position: 'relative',
  },

  sidebarItemSelected: {
    backgroundColor: '#fff',
  },
  selectedIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#256FEF', // Blue or Green based on your theme
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  sidebarIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sidebarIconSelected: {
    backgroundColor: '#Eaf2ff', // Light blue circle when selected
  },
  sidebarIcon: {
    width: 30,
    height: 30,
  },
  sidebarText: {
    fontSize: 10,
    textAlign: 'center',
    color: '#666',
    lineHeight: 14,
  },
  sidebarTextSelected: {
    fontWeight: '700',
    color: '#222',
  },

  // --- Main Content Styles ---
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  gridContent: {
    padding: 12,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: 12,
  },
  gridItem: {
    width: (width - SIDEBAR_WIDTH - 48) / 3, // Logic: (Screen - Sidebar - Padding - Gaps) / Columns
    marginBottom: 20,
    alignItems: 'center',
  },
  gridImageContainer: {
    width: '100%',
    aspectRatio: 1, // Keeps it square
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridImage: {
    width: '75%',
    height: '75%',
  },
  gridText: {
    fontSize: 11,
    textAlign: 'center',
    color: '#444',
    fontWeight: '500',
    lineHeight: 15,
  },
});
