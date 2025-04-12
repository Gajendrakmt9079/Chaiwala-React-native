/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import products from '../data/data';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCart } from '../Api/Cartcontext';

interface RouteParams {
  userId: string;
}

type ProductDetailProps = NativeStackScreenProps<any, 'ProductDetail'>;

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const route = useRoute();
  const { userId } = route.params as RouteParams;
  const { addToCart } = useCart();
  const navigation = useNavigation();

  const product = products.find(item => item.id === userId);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found!</Text>
      </View>
    );
  }

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<'S' | 'L'>('L');
  const [totalPrice, setTotalPrice] = useState(product.sizes.M); // Default to Medium size

  // Update total price whenever quantity or selected size changes
  useEffect(() => {
    setTotalPrice(product.sizes[selectedSize] * quantity);
  }, [quantity, selectedSize]);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      <Image source={product.image} style={styles.image} />

      {/* Quantity Selector */}
      <View style={{ alignItems: 'center' }}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Size Selector */}
      <View style={styles.sizeContainer}>
        {['S', 'L'].map(size => (
          <TouchableOpacity
            key={size}
            onPress={() => setSelectedSize(size as 'S' | 'L')}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.selectedSize,
            ]}>
            <Text style={selectedSize === size ? styles.selectedSizeText : styles.sizeText}>
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Price & Add to Cart */}
      <View style={styles.bottomContainer}>
        <View>
          <Text style={{ color: 'rgba(128, 128, 128, 0.57)' }}>Total Price</Text>
          <Text style={styles.price}>₹{totalPrice}</Text>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            addToCart(product, quantity, selectedSize);
            navigation.navigate('Cart' as never);
          }}>
          <Image source={require('../public/bag.png')} style={{ width: 20, height: 30 }} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  image: {
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    marginVertical: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.14)',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityButton: {
    padding: 10,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  sizeButton: {
    backgroundColor: '#eee',
    padding: 10,
    width: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedSize: {
    backgroundColor: '#F67C00',
  },
  sizeText: {
    fontSize: 28,
    color: '#555',
  },
  selectedSizeText: {
    fontSize: 28,
    color: '#fff',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    marginTop: 20,
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#F67C00',
    padding: 15,
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    marginTop: 50,
  },
});

export default ProductDetail;
