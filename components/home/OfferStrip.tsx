import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface OfferItem {
  id: string;
  title: string;
  // ✅ FIXED
    icon: string;
  bgColor: string;
}

interface OfferStripProps {
  data: OfferItem[];
  onPress?: (item: OfferItem) => void;
}

const OfferStrip: React.FC<OfferStripProps> = ({ data, onPress }) => {
  const renderItem = ({ item }: { item: OfferItem }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.bgColor }]}
      activeOpacity={0.8}
      onPress={() => onPress?.(item)}
    >
      <MaterialCommunityIcons name={item.icon as any} size={18} color="#000" />
      <Text style={styles.text} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 10,
    marginTop: 10,
    marginBottom: 2,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,

    marginRight: 10,

    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  text: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
});

export default OfferStrip;