import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const notifications = [
  {
    id: '1',
    title: 'Order Placed',
    message: 'Your order #1234 has been placed successfully.',
    icon: 'checkmark-circle',
  },
  {
    id: '2',
    title: 'Order Shipped',
    message: 'Your order is on the way 🚚',
    icon: 'car',
  },
  {
    id: '3',
    title: 'New Offer',
    message: 'Get 20% off on groceries today!',
    icon: 'pricetag',
  },
  {
    id: '4',
    title: 'Welcome to AmritBazar',
    message: 'Thanks for joining our platform.',
    icon: 'gift',
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={22} color="#0C831F" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: 'center',
  },

  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#E8F8ED',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },

  message: {
    fontSize: 13,
    color: '#666',
  },
});