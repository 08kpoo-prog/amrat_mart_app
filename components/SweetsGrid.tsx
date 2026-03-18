import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons'; // Ensure you have this vector icon set installed

// --- 1. Define the Product Type ---
export interface SweetProduct {
  id: string;
  name: string;
  brand: string;
  weight: string; // e.g., "85 g"
  price: number;
  originalPrice?: number; // Optional, for discounted products
  discount?: number;     // Optional percentage (e.g., 12 for 12% OFF)
  imageUri: string;      // A public URL link (Google link)
  deliveryTime?: string; // e.g., "11 mins"
}

// --- 2. Define the Component Props ---
interface SweetsGridProps {
  title: string;
  products: SweetProduct[];
  onUpdateCart?: (quantities: { [key: string]: number }) => void; // Optional callback to notify the parent cart
}

// Helper to get screen width for grid calculation
const SCREEN_WIDTH = Dimensions.get('window').width;
const COLUMN_COUNT = 3;
// Calculate item width accounting for 3 columns and horizontal padding
const ITEM_WIDTH = (SCREEN_WIDTH - 30) / COLUMN_COUNT; // Assumes 15 padding on each side

const SweetsGrid: React.FC<SweetsGridProps> = ({ title, products, onUpdateCart }) => {
  // --- 3. Manage Quantities State ---
  // A dictionary mapping product IDs to their current quantity in the cart
  // e.g., { "1": 2, "3": 1 }
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // --- 4. Define Action Handlers ---
  const handleIncrease = (id: string) => {
    setQuantities((prev) => {
      const nextQuantities = {
        ...prev,
        [id]: (prev[id] || 0) + 1,
      };
      // Optional: Send update to parent (e.g., a cart context)
      onUpdateCart?.(nextQuantities);
      return nextQuantities;
    });
  };

  const handleDecrease = (id: string) => {
    setQuantities((prev) => {
      // Don't go below 0
      if (!prev[id] || prev[id] <= 0) return prev;

      const nextQuantities = { ...prev };
      const currentQty = prev[id];
      
      if (currentQty === 1) {
        // If decreasing from 1, remove the key from the dictionary entirely
        delete nextQuantities[id];
      } else {
        nextQuantities[id] = currentQty - 1;
      }
      
      onUpdateCart?.(nextQuantities);
      return nextQuantities;
    });
  };

  // --- 5. Render Individual Product Card ---
  const renderSweetItem = ({ item }: { item: SweetProduct }) => {
    const qty = quantities[item.id] || 0; // Get quantity for THIS product

    return (
      <View style={styles.cardContainer}>
        {/* Discount Badge */}
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}% OFF on MRP</Text>
          </View>
        )}

        <View style={styles.imageSection}>
          <Image 
            source={{ uri: item.imageUri }} // ✅ USING URIs
            style={styles.productImage} 
            resizeMode="contain" 
          />
          
          {/* Action Button Section: Blinkit/Zomato style logic */}
          <View style={styles.buttonPositioner}>
            {qty === 0 ? (
              // Case 1: Quantity is 0, show initial ADD button
              <TouchableOpacity style={styles.addButton} onPress={() => handleIncrease(item.id)} activeOpacity={0.8}>
                <Text style={styles.addButtonText}>ADD</Text>
              </TouchableOpacity>
            ) : (
              // Case 2: Quantity > 0, show + / - selector
              <View style={styles.qtySelector}>
                <TouchableOpacity onPress={() => handleDecrease(item.id)} style={styles.selectorOp}>
                  <Feather name="minus" size={18} color="white" />
                </TouchableOpacity>
                
                <Text style={styles.qtyText}>{qty}</Text>
                
                <TouchableOpacity onPress={() => handleIncrease(item.id)} style={styles.selectorOp}>
                  <Feather name="plus" size={18} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Product Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.weight}>{item.weight}</Text>
          <Text style={styles.productTitle} numberOfLines={2}>
            <Text style={styles.brand}>{item.name}</Text> by {item.brand}
          </Text>
          
          {/* Pricing */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{item.price}</Text>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
            )}
          </View>

          {/* Optional: Delivery Time */}
          {item.deliveryTime && (
            <Text style={styles.delivery}>{item.deliveryTime}</Text>
          )}
        </View>
      </View>
    );
  };

  // --- 6. Main Render ---
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{title}</Text>
      
      <FlatList
        data={products}
        renderItem={renderSweetItem}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT} // 3 column grid
        scrollEnabled={false} // Assume this is inside another ScrollView (HomeScreen)
        contentContainerStyle={styles.listPadding}
        columnWrapperStyle={styles.rowWrapper} // Styles for the rows
      />
    </View>
  );
};

// --- 7. Styles (Following Blinkit/Zomato visual guidelines) ---
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginVertical: 15,
    backgroundColor: '#fff',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginBottom: 15,
  },
  listPadding: {
    paddingBottom: 10,
  },
  rowWrapper: {
    justifyContent: 'flex-start', // Products align to the left
    marginBottom: 10,
  },
  cardContainer: {
    width: ITEM_WIDTH,
    // Add margin to separate items, slightly less than available space to create gaps
    marginHorizontal: (30 / COLUMN_COUNT) / 2, // Simple calculation to divide remaining gap
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    // Subtle shadow for premium feel
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    position: 'relative', // Necessary for discount badge positioning
  },
  discountBadge: {
    position: 'absolute',
    top: -5,
    left: 10,
    backgroundColor: '#256FEF', // Blue discount color
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1, // Ensure it's on top of image
  },
  discountText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  imageSection: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    position: 'relative', // Necessary for ADD button positioning
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  // Blinkit style ADD/qty button positioning (bottom right)
  buttonPositioner: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 2, // on top of image
  },
  addButton: {
    backgroundColor: 'white',
    borderColor: '#0C831F', // Blinkit green
    borderWidth: 1.5,
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 8,
    elevation: 2, // Slight lift for button
  },
  addButtonText: {
    color: '#0C831F',
    fontWeight: '800',
    fontSize: 13,
  },
  // The green state after item added (+ 2 -)
  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0C831F', // Blinkit green background
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
    elevation: 3,
  },
  selectorOp: {
    padding: 3,
  },
  qtyText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 15,
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  detailsSection: {
    marginTop: 15,
  },
  weight: {
    fontSize: 11,
    color: '#888',
    marginBottom: 3,
  },
  productTitle: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
    height: 38, // ensures alignment even with different line counts
    marginBottom: 6,
  },
  brand: {
    color: '#000',
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#000',
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  delivery: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
  },
});

export default SweetsGrid;