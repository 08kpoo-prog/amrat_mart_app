// import { View, Text } from 'react-native';

// export default function OrdersScreen() {
//   return (
//     <View>
//       <Text>Orders Screen</Text>
//     </View>
//   );
// }

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

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 45) / 2;

interface CategoryItem {
  id: string;
  name: string;
  image: { uri: string };
  color: string;
}

interface Props {
  data: CategoryItem[];
  onPress?: (item: CategoryItem) => void;
}

const CategoryScreen: React.FC<Props> = ({ data, onPress }) => {
  const renderItem = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      activeOpacity={0.85}
      onPress={() => onPress?.(item)}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shop by Category</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#FFF8F2',
  },

  header: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 15,
  },

  card: {
    width: CARD_WIDTH,
    height: 160,
    borderRadius: 18,
    padding: 12,
    marginBottom: 15,
    justifyContent: 'space-between',

    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  image: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default CategoryScreen;

