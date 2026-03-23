
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.container}>
      
      {/* LEFT: Logo Section */}
      <View style={styles.leftSection}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      {/* RIGHT: Actions Section */}
      <View style={styles.rightSection}>
        
        {/* Notification Icon */}
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={24} color="#1A1A1A" />
          <View style={styles.dotBadge} />
        </TouchableOpacity>

        {/* Cart/Bag Icon */}
        <TouchableOpacity style={[styles.iconButton, { marginLeft: 12 }]} activeOpacity={0.7}>
          <Ionicons name="bag-handle-outline" size={24} color="#1A1A1A" />
          <View style={styles.countBadge}>
            <Text style={styles.countText}>3</Text>
          </View>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingTop: Platform.OS === 'ios' ? 45 : 25, 
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E6E6E6', // Your light gray background
  },
  leftSection: {
    flex: 1, // Pushes the rightSection to the far right
    justifyContent: 'center',
    marginBottom:4
  },
  logo: {
    width: 150,
    height: 55,
    resizeMode: 'contain',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:4
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF', // High-contrast white buttons
    borderRadius: 12, // Modern "Squircle" shape
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 3,
  },
  dotBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#FF3B30', // Vibrant Red
    borderWidth: 2,
    borderColor: '#FFF',
  },
  countBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#1A1A1A', // Dark contrast for the count
    paddingHorizontal: 5,
    height: 20,
    minWidth: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});