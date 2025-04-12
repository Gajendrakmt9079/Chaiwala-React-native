import React from 'react';

import LoginScreen from '../components/Login';
import SignInScreen from '../components/Singing';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
