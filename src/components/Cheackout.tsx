import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

const CheckoutConfirmation = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time before showing success message
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Loading for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../public/conbg.png')}
      style={styles.container}>
      {/* Loading Indicator */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffa500" />
          <Text style={styles.loadingText}>Processing your order...</Text>
        </View>
      ) : (
        <>
          {/* Confirmation Message */}
          <Text style={styles.title}>Confirmation</Text>

          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.checkmark}>✔</Text>
          </View>

          <Text style={styles.successText}>Successful!</Text>

          {/* Order Details */}
          <Text style={styles.orderText}>
            Your order number is <Text style={styles.orderNumber}>#253698</Text>
          </Text>
          <Text style={styles.subText}>
            You will receive the order shortly.
          </Text>

          {/* Thank You Message */}
          <Text style={styles.thankYouText}>
            Thank you for ordering with us
          </Text>

          {/* Continue Shopping Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ff7f00',
    marginBottom: 10,
  },
  iconContainer: {
    backgroundColor: '#ffa500',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  checkmark: {
    fontSize: 40,
    color: '#fff',
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff7f00',
    marginBottom: 20,
  },
  orderText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  orderNumber: {
    fontWeight: 'bold',
    color: '#ff7f00',
  },
  subText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginVertical: 10,
  },
  thankYouText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ffa500',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutConfirmation;
