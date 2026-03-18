import { CategoryItem } from "@/components/CategoryGrid";
import { ProductItem } from "@/components/ProductSection";
import { SweetProduct } from "@/components/SweetsGrid";

export const CATEGORIES: CategoryItem[] = [
{ id: '1', name: 'Men', icon: 'tshirt-crew', color: '#E3F2FD' },      // Light Blue
  { id: '2', name: 'Women', icon: 'face-woman', color: '#FCE4EC' },    // Light Pink
  { id: '3', name: 'Kids', icon: 'baby-face-outline', color: '#FFF3E0' }, // Light Orange
  { id: '4', name: 'Beauty', icon: 'lipstick', color: '#F3E5F5' },     // Light Purple
  { id: '5', name: 'Home', icon: 'home-variant', color: '#E8F5E9' },    // Light Green
  { id: '6', name: 'Footwear', icon: 'shoe-sneaker', color: '#EFEBE9' }, // Light Brown
  { id: '7', name: 'Watches', icon: 'watch', color: '#ECEFF1' },        // Light Grey
  { id: '8', name: 'Jewellery', icon: 'necklace', color: '#FFFDE7' },
  
];
export const MOCK_PROMOS = [
  {
    id: '1',
    title: 'On Sale Now',
    subtitle: 'THE WEEKEND',
    buttonText: 'Get Now',
    // image: require('../../../assets/images/newarrival.png'),
    image: require('../../assets/images/newarrival.png'),
    backgroundColor: '#EFE6D6',
  },
  {
    id: '2',
    title: 'NEW ARRIVALS',
    subtitle: 'CHECK THEM OUT',
    buttonText: 'View All',
    image: require('../../assets/images/newarrival.png'),
    backgroundColor: '#EFE6D6',
  },
];

export const BOUGHT_PRODUCTS: ProductItem[] = [
  {
    id: '1',
    name: 'Amul Taaza Toned Milk',
    weight: '500 ml',
    price: 28,
    image: { uri: 'https://cdn.grofers.com/app/images/products/full_screen/pro_391465.jpg' },
  },
  {
    id: '2',
    name: 'Harvest Gold White Bread',
    weight: '400 g',
    price: 30,
    originalPrice: 35,
    image: { uri: 'https://cdn.grofers.com/app/images/products/full_screen/pro_102.jpg' },
  },
  {
    id: '3',
    name: 'Lay’s India’s Magic Masala',
    weight: '42 g',
    price: 20,
    image: { uri: 'https://cdn.grofers.com/app/images/products/full_screen/pro_103.jpg' },
  },
];

// Using placeholder URIs here. You can replace these with your Google Link URLs.
// IMPORTANT: Ensure the URL ends in an image extension (.png, .jpg, .webp) for direct linking
export const INDIAN_SWEETS_PRODUCTS: SweetProduct[] = [
  {
    id: 'sweet_1',
    name: 'Rabri',
    brand: 'Amul',
    weight: '85 g',
    price: 25,
    imageUri: 'https://placehold.jp/150x150.png?text=Rabri+Amul', // Replace with your Google URI
    deliveryTime: '11 mins',
  },
  {
    id: 'sweet_2',
    name: 'Motichoor Laddu',
    brand: 'Lal',
    weight: '200 g',
    price: 110,
    originalPrice: 125,
    discount: 12,
    imageUri: 'https://placehold.jp/150x150.png?text=Laddu+Lal',
    deliveryTime: '11 mins',
  },
  {
    id: 'sweet_3',
    name: 'Malai Peda',
    brand: 'Amul',
    weight: '200 g',
    price: 110,
    originalPrice: 120,
    discount: 8,
    imageUri: 'https://placehold.jp/150x150.png?text=Peda+Amul',
    deliveryTime: '11 mins',
  },
  {
    id: 'sweet_4',
    name: 'Kaju Katli',
    brand: 'Amul',
    weight: '200 g',
    price: 219,
    originalPrice: 230,
    imageUri: 'https://placehold.jp/150x150.png?text=Katli+Amul',
    deliveryTime: '11 mins',
  },
  {
    id: 'sweet_5',
    name: 'Rasgulla',
    brand: 'Gwalia',
    weight: '500 g',
    price: 110,
    imageUri: 'https://placehold.jp/150x150.png?text=Rasgulla',
    deliveryTime: '11 mins',
  },
  {
    id: 'sweet_6',
    name: 'Gulab Jamun',
    brand: 'Gits',
    weight: '1 kg',
    price: 202,
    originalPrice: 255,
    discount: 20,
    imageUri: 'https://placehold.jp/150x150.png?text=Jamun+Gits',
    deliveryTime: '11 mins',
  },
];