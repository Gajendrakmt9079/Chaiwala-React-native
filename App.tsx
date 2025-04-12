import React, {useEffect, useState, createContext, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {CartProvider} from './src/Api/Cartcontext';
import HomePage from './src/components/home';
import FirstIntro from './src/components/firstInstro';
import LoginScreen from './src/components/Login';
import SignInScreen from './src/components/Singing';
import ProfileScreen from './src/components/ProfileScreen';
import AddressComponent from './src/components/Address';
import Getotp from './src/components/Getotp';
import Mapview from './src/components/mapview';
import ProductDetail from './src/components/productdetail';
import CartScreen from './src/components/CartScreen';
import SubscriptionScreen from './src/components/Plans';
import CheckoutConfirmation from './src/components/Cheackout';
import Loading from './src/components/Loadingscreen';

const Stack = createNativeStackNavigator();

// Create Auth Context
const AuthContext = createContext(null);

export default function App() {
  const [userToken, setUserToken] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');

        setUserToken(token);
      } catch (error) {
        console.error('Error fetching auth token:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <Loading navigation={undefined} />;
  }

  return (
    <AuthContext.Provider value={{userToken, setUserToken}}>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator >
            {userToken ? (
              <>
                <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Address" component={AddressComponent} />
                <Stack.Screen
                  name="Checkout"
                  component={CheckoutConfirmation}
                />
                <Stack.Screen name="Order Tracking" component={Mapview} />
                <Stack.Screen name="Plans" component={SubscriptionScreen} />
                <Stack.Screen name="DetailsScreen" component={ProductDetail} />
                <Stack.Screen name="Cart" component={CartScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Welcome" component={FirstIntro} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="Verify" component={Getotp}/>
                <Stack.Screen name="Address" component={AddressComponent}/>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </AuthContext.Provider>
  );
}

// Custom Hook for Auth
export const useAuth = () => useContext(AuthContext);
