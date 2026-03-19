import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ImageSourcePropType,
} from 'react-native';

const { width } = Dimensions.get('window');

const ITEM_SPACING = 20;
const ITEM_WIDTH = width - 40;
const SNAP_INTERVAL = ITEM_WIDTH + ITEM_SPACING;






interface PromoItem {
    id: string;
    title: string;
    subtitle: string;
    buttonText: string;
    image: ImageSourcePropType;
    backgroundColor?: string;
}

interface PromoSliderProps {
    data: PromoItem[];
    onPressAction?: (id: string) => void;
}

const PromoSlider: React.FC<PromoSliderProps> = ({ data, onPressAction }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        // const index = Math.round(scrollPosition / CAROUSEL_WIDTH);
        const index = Math.round(scrollPosition / SNAP_INTERVAL);
        setActiveIndex(index);
    };

    const renderItem = ({ item }: { item: PromoItem }) => (
        <View style={[styles.card, { backgroundColor: item.backgroundColor || '#EFE6D6' }]}>
            <View style={styles.leftContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onPressAction?.(item.id)}
                >
                    <Text style={styles.buttonText}>{item.buttonText}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.rightContent}>
                {/* Replace with your desktop/Mac mockup image */}
                <Image source={item.image} style={styles.promoImage} resizeMode="contain" />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={SNAP_INTERVAL}
                snapToAlignment="start"
                disableIntervalMomentum={true}
                decelerationRate="fast"
                onScroll={handleScroll}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    paddingLeft: ITEM_SPACING,
                }}
            />

            {/* Pagination Dots */}
            <View style={styles.pagination}>
                {data.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            activeIndex === index ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    flatListContent: {
        paddingHorizontal: 10,
    },
    card: {
        width: ITEM_WIDTH,
        height: 150,
        borderRadius: 30,
        flexDirection: 'row',
        padding: 20,
        marginRight: ITEM_SPACING,
        overflow: 'hidden',
    },
    leftContent: {
        flex: 1.2,
        justifyContent: 'center',
    },
    rightContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
    },
    subtitle: {
        color: 'black',
        fontSize: 16,
        marginTop: 5,
        marginBottom: 15,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    button: {
        backgroundColor: '#93BF06', // The lime green from your image
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#001A3F',
        fontWeight: '600',
        fontSize: 14,
    },
    promoImage: {
        width: '120%',
        height: '100%',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
        width: 24, // Longer dash for active state
        backgroundColor: '#98C102',
    },
    inactiveDot: {
        width: 8,
        backgroundColor: '#E0E0E0',
    },
});

export default PromoSlider;