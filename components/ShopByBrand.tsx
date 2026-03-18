import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Image,
  Dimensions, 
  ImageSourcePropType 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Need Feather for the arrow icon

// Define the shape of each brand item
export interface BrandItem {
  id: string;
  name: string; // Used for accessibility/logging, though not displayed textually in this design
  logo: ImageSourcePropType; // require('./path/to/logo.png')
  color?: string; // The specific soft pastel background color for that brand's circle
}

interface ShopByBrandProps {
  title: string;
  data: BrandItem[];
  onSeeAllPress: () => void; // Function to call when "See All" is clicked
  onBrandPress: (brandId: string) => void; // Handle click on individual brands
}

const ShopByBrand: React.FC<ShopByBrandProps> = ({ 
  title, 
  data, 
  onSeeAllPress, 
  onBrandPress 
}) => {
  
  // Render function for individual brand cards
  const renderBrandCard = ({ item }: { item: BrandItem }) => (
    <TouchableOpacity 
      style={styles.brandCard} 
      onPress={() => onBrandPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={[styles.circleContainer, { backgroundColor: item.color }]}>
        <Image 
          source={item.logo} 
          style={styles.logoImage} 
          resizeMode="contain" // Ensures logos don't get stretched
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity style={styles.seeAllContainer} onPress={onSeeAllPress}>
          <Text style={styles.seeAllText}>See All</Text>
          <Icon name="arrow-right" size={18} color="#001A3F" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      {/* Horizontal List of Brands */}
      <FlatList
        data={data}
        renderItem={renderBrandCard}
        keyExtractor={(item) => item.id}
        horizontal={true} // Makes the list scroll sideways
        showsHorizontalScrollIndicator={false} // Hides the bottom scrollbar
        contentContainerStyle={styles.listContent} // Apply padding inside the list
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 16,
    color: '#001A3F',
    marginRight: 5,
  },
  arrowIcon: {
    paddingTop: 2, // Slight vertical adjustment to center arrow with text
  },
  listContent: {
    paddingLeft: 20, // Start with padding on the far left
    paddingRight: 10, // Small padding on the far right after the last card
  },
  brandCard: {
    marginRight: 12, // Space between each card
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    width: 90,
    height: 90,
    borderRadius: 45, // Half of width/height for a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    // Subtle shadow for that professional feel from your image
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoImage: {
    width: 60, // Sized so logos fit comfortably inside the circle
    height: 60,
  },
});

export default ShopByBrand;