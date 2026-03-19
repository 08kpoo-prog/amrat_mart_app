import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

export interface FestivalItem {
  id: string;
  name: string;
  image: { uri: string };
}

interface FestivalSectionProps {
  title: string;
  data: FestivalItem[];
  backgroundColor?: string;
  onPress?: (item: FestivalItem) => void;
}

const FestivalSection: React.FC<FestivalSectionProps> = ({
  title,
  data,
  backgroundColor = '#FFE6E6',
  onPress,
}) => {
  const renderItem = ({ item }: { item: FestivalItem }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onPress?.(item)}
    >
      <Image source={item.image} style={styles.image} />
      <Text numberOfLines={1} style={styles.name}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,
    paddingVertical: 15,
    paddingLeft: 15,
    borderRadius: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },

  card: {
    width: 90,
    marginRight: 12,
    alignItems: 'center',
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 14,
    resizeMode: 'cover',
    marginBottom: 6,
  },

  name: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default FestivalSection;