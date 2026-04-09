import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

export interface CategoryItem {
  id: string;
  name: string;
  image: { uri: string };
  color: string;
}

interface CategoryGridProps {
  data: CategoryItem[];
  onSeeAll?: () => void;
  onPressCategory?: (item: CategoryItem) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ data, onSeeAll, onPressCategory }) => {
  const getItemWidth = (totalItems: number) => {
    if (totalItems === 1) return '100%';
    if (totalItems === 2) return '48%';
    if (totalItems === 3) return '31%';
    return '23%';
  };

  const renderItem = (item: CategoryItem, totalItems: number) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        { width: getItemWidth(totalItems) }
      ]}
      onPress={() => onPressCategory?.(item)}
      activeOpacity={0.85}
    >
      <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
        <Image source={item.image} style={styles.image} />
      </View>

      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
       colors={['#fbc2eb', '#a6c1ee']}
      // colors={['#fff', '#fff']}
      //  colors={['rgba(255,255,255,0.75)', 'rgba(255,255,255,0.55)']}

      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SHOP BY CATEGORY</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        // renderItem={renderItem}
        renderItem={({ item }) => renderItem(item, data.length)}
        keyExtractor={(item) => item.id}
        numColumns={4}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    resizeMode: 'cover',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    letterSpacing: 1,
  },

  seeAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black', // 👈 green (matches your theme)
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  itemContainer: {
    alignItems: 'center',
    // width: '23%',
  },

  iconCircle: {
    width: 98,
    height: 128,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  itemText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});

export default CategoryGrid;