

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
 const INITIAL_CART = [
 {
    id: '1',
    name: 'Amul Taaza Toned Fresh Milk',
    weight: '500 ml',
    price: 27,
    originalPrice: 27,
    quantity: 1,
    image: 'https://cdn.grofers.com/app/images/products/full_screen/pro_391465.jpg',
  },
  {
    id: '2',
    name: 'Gits Gulab Jamun (Open & Eat)',
    weight: '1 kg',
    price: 202,
    originalPrice: 255,
    quantity: 2,
    image: 'https://placehold.jp/150x150.png?text=Jamun+Gits',
  },
  {
    id: '3',
    name: 'Lay’s India’s Magic Masala Chips',
    weight: '50 g',
    price: 20,
    originalPrice: 20,
    quantity: 1,
    image: 'https://cdn.grofers.com/app/images/products/full_screen/pro_103.jpg',
  },
];

const { width } = Dimensions.get('window');

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  // --- Calculations ---
  const itemTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const handlingCharge = 4;
  const deliveryCharge = 25;
  const grandTotal = itemTotal + handlingCharge + deliveryCharge;
  const savings = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );

  // --- Handlers ---
  const incrementQty = (id: string) => {
   setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decrementQty = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.quantity > 0) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

   return (

    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Checkout</Text>
          <Text style={styles.headerSubtitle}>
            {cartItems.length} items • Total ₹{grandTotal}
          </Text>
        </View>
        <TouchableOpacity>
           <Text style={styles.headerAction}>Empty</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Delivery Time Section */}
        <View style={styles.deliveryCard}>
          <View style={styles.deliveryHeader}>
            <View style={styles.timerIconBg}>
              <Feather name="clock" size={20} color="#000" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.deliveryTitle}>Delivery in 11 minutes</Text>
              <Text style={styles.deliveryAddress}>Home - Vastrapur, Ahmedabad</Text>
            </View>
          </View>
        </View>

        {/* Cart Items List */}
        <View style={styles.section}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.itemImageContainer}>
                <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.itemWeight}>{item.weight}</Text>
                <View style={styles.itemPriceRow}>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                  {item.originalPrice > item.price && (
                    <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
                  )}
                </View>
              </View>

              {/* Quantity Control */}
              <View style={styles.qtyContainer}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => decrementQty(item.id)}>
                  <Feather name="minus" size={14} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => incrementQty(item.id)}>
                  <Feather name="plus" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Coupons */}
        <TouchableOpacity style={styles.couponSection}>
          <View style={styles.couponIconBg}>
            <MaterialCommunityIcons name="ticket-percent-outline" size={24} color="#0C831F" />
          </View>
          <Text style={styles.couponText}>Use Coupons</Text>
          <Feather name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>

        {/* Bill Details */}
        <View style={styles.billSection}>
          <Text style={styles.sectionTitle}>Bill Details</Text>

          <View style={styles.billRow}>
            <View style={styles.billRowLeft}>
              <MaterialCommunityIcons name="note-text-outline" size={16} color="#666" />
              <Text style={styles.billLabel}>Items Total</Text>
            </View>
            <Text style={styles.billValue}>₹{itemTotal}</Text>
          </View>

          <View style={styles.billRow}>
            <View style={styles.billRowLeft}>
              <MaterialCommunityIcons name="bike" size={16} color="#666" />
              <Text style={styles.billLabel}>Delivery Charge</Text>
            </View>
            <Text style={styles.billValue}>₹{deliveryCharge}</Text>
          </View>

          <View style={styles.billRow}>
            <View style={styles.billRowLeft}>
              <MaterialCommunityIcons name="shopping" size={16} color="#666" />
              <Text style={styles.billLabel}>Handling Charge</Text>
            </View>
            <Text style={styles.billValue}>₹{handlingCharge}</Text>
          </View>

          <View style={[styles.billRow, styles.grandTotalRow]}>
            <Text style={styles.grandTotalLabel}>Grand Total</Text>
            <Text style={styles.grandTotalValue}>₹{grandTotal}</Text>
          </View>
        </View>

        {/* Cancellation Policy */}
        <View style={styles.policySection}>
          <Text style={styles.policyText}>
            Cancellation Policy: Orders cannot be cancelled once packed for delivery. In case of
            unexpected delays, a refund will be provided, if applicable.
          </Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {savings > 0 && (
          <View style={styles.savingsStrip}>
            <Text style={styles.savingsText}>Yay! You saved ₹{savings} on this order</Text>
          </View>
        )}

        <View style={styles.footerContent}>
          <View style={styles.addressSelector}>
           <View style={styles.addressIconBg}>
              <Feather name="home" size={18} color="#666" />
            </View>
            <View>
              <Text style={styles.payUsingText}>Delivering to Home</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.payButton} activeOpacity={0.8}>
            <View>
              <Text style={styles.payButtonTotal}>₹{grandTotal}</Text>
              <Text style={styles.payButtonSub}>TOTAL</Text>
            </View>
            <Text style={styles.payButtonText}>Proceed to Pay</Text>
            <Feather name="chevron-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
     </View>
   );
 }

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FB' },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#111' },
  headerSubtitle: { fontSize: 13, color: '#666', marginTop: 2 },
  headerAction: { color: 'red', fontWeight: '600' },
  scrollContent: { padding: 12 },

  deliveryCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15 },
  deliveryHeader: { flexDirection: 'row', alignItems: 'center' },
  timerIconBg: { width: 40, height: 40, backgroundColor: '#F0F5FC', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  deliveryTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  deliveryAddress: { fontSize: 13, color: '#666' },

  section: { backgroundColor: '#fff', borderRadius: 12, padding: 5, marginBottom: 15 },
  cartItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  itemImageContainer: { width: 60, height: 60, marginRight: 12 },
  itemImage: { width: '100%', height: '100%' },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '500', color: '#333' },
  itemWeight: { fontSize: 12, color: '#888', marginTop: 2 },
  itemPriceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  itemPrice: { fontSize: 14, fontWeight: '700', color: '#111', marginRight: 6 },
  originalPrice: { fontSize: 12, color: '#999', textDecorationLine: 'line-through' },
  qtyContainer: { backgroundColor: '#0C831F', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 6, flexDirection: 'row', alignItems: 'center', height: 32 },
  qtyBtn: { padding: 4 },
  qtyText: { color: '#fff', fontWeight: '700', marginHorizontal: 8, minWidth: 14, textAlign: 'center' },

  couponSection: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15 },
  couponIconBg: { marginRight: 12 },
  couponText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#111' },

  billSection: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15 },
  sectionTitle: { fontSize: 15, fontWeight: '700', marginBottom: 15 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  billRowLeft: { flexDirection: 'row', alignItems: 'center' },
  billLabel: { marginLeft: 8, color: '#555', fontSize: 13 },
  billValue: { fontSize: 13, color: '#111', fontWeight: '500' },
  grandTotalRow: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 12, marginTop: 5 },
  grandTotalLabel: { fontSize: 16, fontWeight: '700' },
  grandTotalValue: { fontSize: 16, fontWeight: '700' },

  policySection: { padding: 12, backgroundColor: '#fff', borderRadius: 12 },
  policyText: { fontSize: 11, color: '#888', lineHeight: 16 },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', elevation: 20 },
  savingsStrip: { backgroundColor: '#ECFDF3', padding: 8, alignItems: 'center' },
  savingsText: { color: '#0C831F', fontSize: 12, fontWeight: '700' },
  footerContent: { flexDirection: 'row', alignItems: 'center', padding: 15, borderTopWidth: 1, borderTopColor: '#eee' },
  addressSelector: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  addressIconBg: { backgroundColor: '#F0F0F0', padding: 8, borderRadius: 8, marginRight: 10 },
  payUsingText: { fontSize: 13, fontWeight: '600', color: '#333' },
  payButton: { backgroundColor: '#0C831F', flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12 },
  payButtonTotal: { color: '#fff', fontWeight: '700', fontSize: 15 },
  payButtonSub: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: '700' },
  payButtonText: { color: '#fff', fontWeight: '600', fontSize: 16, marginLeft: 15, marginRight: 5 },
});
