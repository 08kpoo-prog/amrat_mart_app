import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  
  const renderItem = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity 
      style={styles.itemContainer} 
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SHOP BY CATEGORY</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 15,
    borderRadius: 20,

    backgroundColor: '#de354c', // 👈 beige card like your image

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
    color: '#fff',
    letterSpacing: 1,
  },

  seeAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff', // 👈 green (matches your theme)
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  itemContainer: {
    alignItems: 'center',
    width: '23%',
  },

  iconCircle: {
    width: 68,
    height: 68,
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