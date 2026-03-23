import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Platform
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { PERSONAL_CARE_DATA, BOUGHT_PRODUCTS, INDIAN_SWEETS_PRODUCTS } from '@/constants/dummyData/dummyData';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const findProduct = () => {
    const allProducts = [...PERSONAL_CARE_DATA, ...BOUGHT_PRODUCTS, ...INDIAN_SWEETS_PRODUCTS];
    // @ts-ignore
    return allProducts.find(p => p.id === id) || PERSONAL_CARE_DATA[0];
  };

  const product = findProduct();
  const price = product.price || 999;
  const originalPrice = product.originalPrice || Math.round(price * 1.2);
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const rating = (product as any).rating || 4.2;

  // Handle different image structures in your dummy data (uri vs require)
  const getImageSource = () => {
    if ((product as any).image) return (product as any).image;
    if ((product as any).imageUri) return { uri: (product as any).imageUri };
    return { uri: 'https://placehold.co/400' };
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{product.name}</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn}>
            <Feather name="search" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}>
            <Feather name="heart" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}>
            <Feather name="shopping-bag" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={getImageSource()} style={styles.productImage} resizeMode="contain" />
        </View>

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <View style={styles.brandRow}>
             <Text style={styles.brandText}>Premium Brand</Text>
             <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>{rating}</Text>
                <Ionicons name="star" size={12} color="#fff" />
                <Text style={styles.ratingCount}> | 2.4k</Text>
             </View>
          </View>

          <Text style={styles.productName}>{product.name}</Text>
          {(product as any).description && (
            <Text style={styles.productDesc}>{(product as any).description}</Text>
          )}

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{price}</Text>
            <Text style={styles.mrp}>MRP <Text style={styles.strike}>₹{originalPrice}</Text></Text>
            <Text style={styles.discount}>({discount}% OFF)</Text>
          </View>
          <Text style={styles.taxNote}>inclusive of all taxes</Text>
        </View>

        {/* Delivery Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Check Delivery</Text>
          <View style={styles.deliveryInput}>
             <Text style={styles.deliveryPlaceholder}>Enter PIN Code</Text>
             <Text style={styles.checkText}>CHECK</Text>
          </View>
          <View style={styles.deliveryInfo}>
            <Feather name="truck" size={16} color="#555" />
            <Text style={styles.deliveryInfoText}> Get it by Tomorrow, 9 PM</Text>
          </View>
        </View>

        {/* Offers Section */}
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Best Offers</Text>
           <View style={styles.offerTag}>
              <MaterialIcons name="local-offer" size={16} color="#0C831F" />
              <Text style={styles.offerText}>Bank Offer: 10% off on SBI Cards</Text>
           </View>
        </View>

        <View style={{ height: 100 }} /> 
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.wishlistBtn}>
           <Feather name="heart" size={20} color="#333" />
           <Text style={styles.wishlistLabel}>WISHLIST</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.addToBagBtn}>
           <Feather name="shopping-bag" size={20} color="#fff" />
           <Text style={styles.addToBagLabel}>ADD TO BAG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? 10 : 50, paddingBottom: 10, paddingHorizontal: 10,
    backgroundColor: '#fff', elevation: 2, zIndex: 10
  },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '600', marginLeft: 10, color: '#333' },
  headerRight: { flexDirection: 'row' },
  headerBtn: { padding: 8 },
  
  scrollContent: { paddingBottom: 20 },
  
  imageContainer: { width: '100%', height: 400, backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center' },
  productImage: { width: '90%', height: '90%' },
  
  infoContainer: { padding: 16 },
  brandRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  brandText: { fontSize: 16, fontWeight: '700', color: '#333' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1b8b60', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  ratingText: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginRight: 2 },
  ratingCount: { color: '#fff', fontSize: 10, opacity: 0.8 },
  
  productName: { fontSize: 16, color: '#555', marginBottom: 4 },
  productDesc: { fontSize: 13, color: '#888', marginBottom: 12 },
  
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 10 },
  price: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  mrp: { fontSize: 14, color: '#888', marginLeft: 8 },
  strike: { textDecorationLine: 'line-through' },
  discount: { fontSize: 16, color: '#ff905a', fontWeight: 'bold', marginLeft: 8 },
  taxNote: { fontSize: 12, color: '#03a685', marginTop: 4, fontWeight: '600' },
  
  section: { padding: 16, borderTopWidth: 8, borderTopColor: '#f4f4f4' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  deliveryInput: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: '#ddd', borderRadius: 4, padding: 12, marginBottom: 8
  },
  deliveryPlaceholder: { color: '#888' },
  checkText: { color: '#ff3f6c', fontWeight: 'bold' },
  deliveryInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  deliveryInfoText: { color: '#555', fontSize: 13 },
  
  offerTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f8e8', padding: 10, borderRadius: 4 },
  offerText: { marginLeft: 8, color: '#333', fontSize: 13 },
  
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', height: 60, elevation: 10,
    backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee'
  },
  wishlistBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#fff', borderRightWidth: 1, borderRightColor: '#eee'
  },
  wishlistLabel: { marginLeft: 8, fontWeight: '700', color: '#333' },
  addToBagBtn: {
    flex: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#ff3f6c'
  },
  addToBagLabel: { marginLeft: 8, fontWeight: '700', color: '#fff' }
});
