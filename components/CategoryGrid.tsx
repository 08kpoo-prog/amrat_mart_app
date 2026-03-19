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

export interface CategoryItem {
  id: string;
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string; // Myntra uses different soft background colors for each category
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
      // style={styles.itemContainer} 
      style={[
        styles.itemContainer,
        { width: getItemWidth(totalItems) }
      ]}
      onPress={() => onPressCategory?.(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
        <MaterialCommunityIcons name={item.icon} size={28} color="#282C3F" />
      </View>
      <Text style={styles.itemText} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
    //  colors={['#fbc2eb', '#a6c1ee']}
    colors={['#ebe996', '#bac9e2']}
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
    marginVertical: 5,
    padding: 15,
    borderRadius: 20,
    // backgroundColor: '#de354c',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
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

    // 👇 softer shadow
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  itemText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
});

export default CategoryGrid;