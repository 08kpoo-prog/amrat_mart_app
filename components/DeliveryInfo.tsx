import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

interface DeliveryInfoProps {
  address?: string;
  time?: string;
  onPress?: () => void;
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({
  address = 'Home',
  time = '10 mins',
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {/* 📍 Left Section */}
      <View style={styles.left}>
        <View style={styles.locationRow}>
          <Feather name="map-pin" size={16} color="#000" />
          <Text style={styles.deliverTo}>Deliver to</Text>

          <Text style={styles.address}>{address}</Text>

          <Feather name="chevron-down" size={16} color="#000" />
        </View>

        {/* ⏱ Delivery Time */}
        {/* <View style={styles.timeRow}>
          <MaterialCommunityIcons name="lightning-bolt" size={16} color="#7BAE37" />
          <Text style={styles.timeText}>In {time}</Text>
        </View> */}
      </View>

      {/* 👉 Right Arrow */}
      {/* <Feather name="chevron-right" size={18} color="#999" /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 10,
    padding: 12,

    // borderRadius: 16,
    // backgroundColor: '#fff',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    // elevation: 3,
    // shadowColor: '#000',
    // shadowOpacity: 0.06,
    // shadowRadius: 8,
  },

  left: {
    flex: 1,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  deliverTo: {
    marginLeft: 6,
    fontSize: 12,
    color: 'black',
  },

  address: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  timeText: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: '600',
    color: '#7BAE37',
  },
});

export default DeliveryInfo;