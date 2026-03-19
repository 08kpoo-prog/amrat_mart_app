import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface ProductItem {
  id: string;
  name: string;
  weight: string; // e.g., "1 kg" or "500 g"
  price: number;
  originalPrice?: number;
  image: any; // Can be a require() or a URI string
}

interface ProductSectionProps {
  title: string;
  products: ProductItem[];
  onAdd?: (product: ProductItem) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products, onAdd }) => {
  const renderProduct = ({ item }: { item: ProductItem }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      </View>
      
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.weight}>{item.weight}</Text>
        
        {/* <View style={styles.footer}>
          <View>
            <Text style={styles.price}>₹{item.price}</Text>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
            )}
          </View>
          
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => onAdd?.(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.footer}>
  <Text style={styles.price}>₹{item.price}</Text>
  {item.originalPrice && (
    <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
  )}

  <TouchableOpacity 
    style={styles.addButton} 
    onPress={() => onAdd?.(item)}
    activeOpacity={0.8}
  >
    <Text style={styles.addButtonText}>ADD</Text>
  </TouchableOpacity>
</View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>see all</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    paddingBottom: 25,
    // backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1C1C',
  },
  seeAll: {
    color: '#0C831F', // Blinkit Green
    fontWeight: '700',
    fontSize: 14,
  },
  listPadding: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  card: {
    width: 140,
    marginRight: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    padding: 4,
  },
  imageContainer: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productImage: {
    height: 90,
    width: 90,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    height: 36, // Ensures text alignment even with 1 vs 2 lines
  },
  weight: {
    fontSize: 11,
    color: '#888',
    marginVertical: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1C',
  },
  originalPrice: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: '#fff',
    borderColor: '#0C831F',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#0C831F',
    fontWeight: '800',
    fontSize: 12,
  },
});

export default ProductSection;