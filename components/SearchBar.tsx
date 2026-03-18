import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ViewStyle, Image } from 'react-native';



interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void; // Optional if you don't always need a filter
  placeholder?: string;
  containerStyle?: ViewStyle; // Allows you to override margins/padding from the parent
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChangeText, 
  onFilterPress, 
  placeholder = "Search....",
  containerStyle 
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Left Search Icon */}
  <Image
        source={require('@/assets/images/search.png')}
        style={styles.searchIcon}
      />
      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9EA0A4"
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
      />

      {/* Right Filter Button */}
      {onFilterPress && (
        <TouchableOpacity 
          onPress={onFilterPress} 
          style={styles.filterButton}
          activeOpacity={0.7}
        >
          <Image
        source={require('@/assets/images/sliders.png')}
        style={styles.slidersIcon}
      />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#EEEEEE',
    paddingHorizontal: 12,
    height: 65,
    marginVertical: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
    slidersIcon: {
    width: 24,
    height: 24,
    },
  
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1A253D',
    height: '100%',
    paddingVertical: 0, // Fixes vertical alignment on some Android versions
  },
  filterButton: {
    padding: 5,
    marginLeft: 10,
  },
});

export default SearchBar;