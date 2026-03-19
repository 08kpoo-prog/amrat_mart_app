import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface BannerItem {
  id: string;
  image: any; // require() or uri
}

interface BannerGridProps {
  data: BannerItem[];
  onPress?: (item: BannerItem) => void;
}

const BannerGrid: React.FC<BannerGridProps> = ({ data, onPress }) => {
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => onPress?.(item)}
        >
          <Image source={item.image} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const CARD_GAP = 10;
const CARD_WIDTH = (width - 30 - CARD_GAP) / 2; 
// 30 = marginHorizontal (15 + 15)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    marginHorizontal: 15,
    marginTop: 15,
  },

  card: {
    width: CARD_WIDTH,
    height: 110,

    borderRadius: 14,
    overflow: 'hidden',

    marginBottom: CARD_GAP,

    backgroundColor: '#fff',

    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default BannerGrid;