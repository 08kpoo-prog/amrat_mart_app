import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
  value: string | number;
  icon: any;
}

export default function VendorStatCard({ title, value, icon }: Props) {
  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={24} color="#0C831F" />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    alignItems: 'center',
    gap: 6,
  },
  value: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },
  title: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});