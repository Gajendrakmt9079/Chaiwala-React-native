import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import products from '../data/data';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useCart} from '../Api/Cartcontext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// Define route parameters
interface RouteParams {
  userId: string;
}

// Define navigation type
type ProductDetailProps = NativeStackScreenProps<any, 'ProductDetail'>;

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {userId} = route.params as RouteParams;
  const {addToCart} = useCart(); // Use cart context

  // Find the product based on userId
  const product = products.find(item => item.id === userId);
  if (!product) {
    return <Text>Product not found!</Text>;
  }

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('M');

  const priceBySize: Record<string, number> = {
    S: product.price,
    M: product.price + 10,
    L: product.price + 15,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Image source={product.image} style={styles.image} />

      {/* Quantity Controls */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => setQuantity(Math.max(1, quantity - 1))}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Add to Cart */}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => {
          addToCart(product, quantity, selectedSize);
          navigation.navigate('Cart' as never);
        }}>
        <Text style={styles.cartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20},
  title: {fontSize: 22, fontWeight: 'bold'},
  image: {width: 200, height: 200},
  quantityContainer: {flexDirection: 'row', alignItems: 'center'},
  buttonText: {fontSize: 20, paddingHorizontal: 10},
  quantity: {fontSize: 18, marginHorizontal: 10},
  cartButton: {
    backgroundColor: '#F67C00',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  cartButtonText: {color: 'white', textAlign: 'center'},
});

export default ProductDetail;
