// import { View, Text } from 'react-native';

// export default function ProfileScreen() {
//   return (
//     <View>
//       <Text>Profile Screen</Text>
//     </View>
//   );
// }

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// --- Reusable Menu Item Component ---
const MenuItem = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  isLast = false 
}: { 
  icon: any, 
  title: string, 
  subtitle?: string, 
  onPress: () => void,
  isLast?: boolean 
}) => (
  <TouchableOpacity 
    style={[styles.menuItem, !isLast && styles.borderBottom]} 
    onPress={onPress}
  >
    <View style={styles.menuIconContainer}>
      <Ionicons name={icon} size={22} color="#444" />
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
    <Ionicons name="chevron-forward" size={18} color="#CCC" />
  </TouchableOpacity>
);
  
export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* --- Header Section --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.userName}>Pooja Kumari</Text>
            <Text style={styles.userPhone}>+91 9876543210</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* --- My Account Section --- */}
        <Text style={styles.sectionTitle}>YOUR ACCOUNT</Text>
        <View style={styles.sectionCard}>
          <MenuItem 
            icon="receipt-outline" 
            title="Your Orders" 
            onPress={() => {}} 
          />
          <MenuItem 
            icon="book-outline" 
            title="Address Book" 
            onPress={() => {}} 
          />
          <MenuItem 
            icon="share-social-outline" 
            title="Share the app" 
            onPress={() => {}} 
            isLast={true}
          />
        </View>

        {/* --- Information Section --- */}
        <Text style={styles.sectionTitle}>INFORMATION</Text>
        <View style={styles.sectionCard}>
          <MenuItem 
            icon="help-circle-outline" 
            title="Customer Support" 
            onPress={() => {}} 
          />
          <MenuItem 
            icon="information-circle-outline" 
            title="About Us" 
            onPress={() => {}} 
          />
          <MenuItem 
            icon="document-text-outline" 
            title="Terms & Conditions" 
            onPress={() => {}} 
            isLast={true}
          />
        </View>

        {/* --- Logout Button --- */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>App Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#F0F9F0',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0C831F',
  },
  editButtonText: {
    color: '#0C831F',
    fontWeight: '700',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#888',
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  logoutButton: {
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '700',
  },
  versionText: {
    textAlign: 'center',
    color: '#AAA',
    fontSize: 12,
    marginBottom: 40,
  },
});