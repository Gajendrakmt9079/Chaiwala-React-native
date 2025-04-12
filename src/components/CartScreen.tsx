import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useCart } from '../Api/Cartcontext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import products from '../data/data'; // Import products data

// Define cart item type
interface CartItem {
  id: string;
  name: string;
  quantity: number;
  size: string;
  image: any;
}

// Define navigation type
type CartScreenProps = NativeStackScreenProps<any, 'Cart'>;

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Calculate total price based on the selected size price
  const totalPrice = cartItems.reduce((sum: number, item: CartItem) => {
    const product = products.find((p) => p.id === item.id);
    const sizePrice = product ? product.sizes[item.size] || 0 : 0;
    return sum + sizePrice * item.quantity;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty!</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => `${item.id}-${item.size}`} // Unique key based on size
            renderItem={({ item }) => {
              const product = products.find(p => p.id === item.id);
              const sizePrice = product ? product.sizes[item.size] || 0 : 0;

              return (
                <View style={styles.cartItem}>
                  <Image source={item.image} style={styles.itemImage} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>
                      {item.name} ({item.size}) {/* Display size */}
                    </Text>
                    <Text style={styles.itemPrice}>
                      ₹{sizePrice * item.quantity}
                    </Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            Math.max(1, item.quantity - 1),
                          )
                        }>
                        <Text style={styles.quantityButton}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }>
                        <Text style={styles.quantityButton}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeFromCart(item.id, item.size)}>
                    <Text style={styles.removeButton}>X</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ₹{totalPrice}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('cheakout')}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
    marginTop: 50,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: '#F67C00',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  removeButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 10,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 10,
    backgroundColor: '#F67C00',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CartScreen;
