import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 60) / 4;

export interface MiniCategoryItem {
  id: string;
  name: string;
  image: { uri: string };
  color: string;
}

interface Props {
  title: string;
  data: MiniCategoryItem[];
  onPress?: (item: MiniCategoryItem) => void;
}

const MiniCategorySection: React.FC<Props> = ({ title, data, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.grid}>
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            activeOpacity={0.85}
            onPress={() => onPress?.(item)}
          >
            <View
              style={[
                styles.card,
                { backgroundColor: item.color },
              ]}
            >
              <Image source={item.image} style={styles.image} />
            </View>

            <Text numberOfLines={2} style={styles.name}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  item: {
    width: ITEM_SIZE,
    marginBottom: 14,
    alignItems: 'center',
  },

  card: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  image: {
    width: ITEM_SIZE * 0.7,
    height: ITEM_SIZE * 0.7,
    resizeMode: 'contain',
  },

  name: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
  },
});

export default MiniCategorySection;