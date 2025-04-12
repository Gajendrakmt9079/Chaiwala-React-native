/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { useAuth } from '../../App';
import { BASE_URL } from '../Api/Api';

const LoginScreen = ({navigation}) => {
  const { setUserToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password!');
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
      await AsyncStorage.setItem('authToken', response.data.token);
      setUserToken(response.data.token);
      Alert.alert('Login Successful');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Login Failed', error.response?.data?.message || 'Try again');
    }
  };

  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logobox}>
        <Image
          style={styles.logoimg}
          source={require('../public/foodxl.png')}
        />
        <Text style={styles.logotext}>Chaiwala</Text>
        <Text style={styles.logotext2}>Tea and coffee service</Text>
      </View>
      <View style={{display: 'flex', marginBottom: 50}}>
        <Text style={styles.logintext}>Login</Text>
        <Text style={styles.logintext2}>Enter your email and password</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <Text style={[styles.logintext2, {marginTop: 5, color: 'black'}]}>
        Forget password ?
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.box3]} onPress={() => navigation.navigate('Singin')}>
        <Text>
          Don't have an account?{' '}
          <Text style={[{color: '#E75102'}]}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box3: {
    paddingHorizontal: 60,
    paddingVertical: 20,
    marginBottom:20,
    color: '#D9D9D9',
  },
  logobox: {
    marginBottom: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  logoimg: {
    width: 65,
    height: 65,
  },
  logotext: {
    fontSize: 30,
    fontWeight: 400,
  },
  logotext2: {
    fontSize: 10,
    fontWeight: 300,
    color: '#7C7C7C',
  },
  logintext: {
    fontSize: 30,
    fontWeight: 400,
  },
  logintext2: {
    fontSize: 12,

    fontWeight: 300,
    color: '#7C7C7C',
  },
  container: {
    flex: 1,


    padding: 20,
    backgroundColor: '#ffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    width: '100%',
    backgroundColor: 'red',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#F67C00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
