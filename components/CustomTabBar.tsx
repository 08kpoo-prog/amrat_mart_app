import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';


const CustomTabBar: React.FC<BottomTabBarProps & { translateY?: Animated.Value }> = ({ state, descriptors, navigation,
  translateY = new Animated.Value(0)
}) => {

  // 1. Helper for the User-facing label
  const getLabel = (routeName: string) => {
    switch (routeName) {
      case 'index': return 'Home';
      case 'orders': return 'Categories';
      case 'cart': return 'Cart';
      case 'profile': return 'Profile';
      default: return routeName;
    }
  };

  // 2. Updated to match your lowercase filenames
  const getIcon = (routeName: string, isFocused: boolean) => {
    const color = isFocused ? '#000' : '#9E9E9E';

    switch (routeName) {
      case 'index':
        return <Feather name="home" size={22} color={color} />;
      case 'orders':
        return <Feather name="shopping-bag" size={22} color={color} />;
      case 'cart':
        return <Feather name="shopping-cart" size={22} color={color} />;
      case 'profile':
        return <Feather name="user" size={22} color={color} />;
      default:
        return <Feather name="circle" size={22} color={color} />;
    }
  };

  return (
    <Animated.View
      style={[
        styles.mainContainer,
        { transform: [{ translateY }] },
      ]}
    >
      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <View style={styles.iconWrapper}>
                <View style={{ transform: [{ scale: isFocused ? 1.15 : 1 }] }}>
                  {getIcon(route.name, isFocused)}
                </View>

                {/* Cart badge */}
                {route.name === 'cart' && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>3</Text>
                  </View>
                )}
              </View>

              <Text
                style={[
                  styles.label,
                  {
                    color: isFocused ? '#000' : '#9E9E9E',
                    fontWeight: isFocused ? '600' : '400',
                  },
                ]}
              >
                {getLabel(route.name)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },

  tabBarContainer: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',

    borderTopWidth: 0.5,
    borderTopColor: '#eee',

    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconWrapper: {
    position: 'relative',
  },

  tabIcon: {
    width: 22,
    height: 22,
  },

  label: {
    fontSize: 11,
    marginTop: 3,
  },

  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default CustomTabBar;