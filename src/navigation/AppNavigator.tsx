import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../components/home';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };
    checkToken();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Home" component={HomePage} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
