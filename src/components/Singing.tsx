/* eslint-disable react-native/no-inline-styles */
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../App';

import {BASE_URL} from '../Api/Api';

const SignInScreen = ({navigation}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: '',
  });
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const {setUserToken} = useAuth();

  // Generate OTP
  const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

  // Send OTP to Email
  const sendOTP = async () => {
    const {email} = formData;
    if (!email) {
      Alert.alert('Error', 'Please enter your email!');
      return;
    }

    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);

    try {
      const response = await axios.post('https://api.web3forms.com/submit', {
        access_key: 'c24c0223-ca3b-4e03-92d5-4968865d9d87', // Replace with your Web3Forms key
        email: email,
        subject: 'Your OTP Code',
        message: `Your OTP code is: ${newOtp}. It is valid for 5 minutes.`,
      });

      if (response.data.success) {
        setIsOtpSent(true);
        Alert.alert('Success', `OTP sent successfully to ${email} ,${newOtp}`);
      } else {
        Alert.alert('Error', 'Failed to send OTP.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while sending OTP!');
      console.error(error);
    }
  };

  // Handle Signup
  const handleSignup = async () => {
    const {name, email, password, otp} = formData;

    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields (Name, Email, Password)!');
      return;
    }

    if (!isOtpSent) {
      Alert.alert('Error', 'Please send OTP before proceeding!');
      return;
    }

    if (otp !== generatedOtp) {
      Alert.alert('Error', 'Incorrect OTP. Please try again!');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
        name,
        email,
        password,
      });

      await AsyncStorage.setItem('authToken', response.data.token);
      setUserToken(response.data.token);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Signup Failed', 'Something went wrong. Please try again.');
      console.error(error);
    }
  };

  // Handle Input Changes
  const handleChange = (field: string, value: string) => {
    setFormData(prevState => ({...prevState, [field]: value}));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logobox}>
        <Image
          style={styles.logoimg}
          source={require('../public/foodxl.png')} // Ensure image path is correct
        />
        <Text style={styles.logotext}>Chaiwala</Text>
        <Text style={styles.logotext2}>Tea and Coffee Service</Text>
      </View>

      <View style={{marginBottom: 50}}>
        <Text style={styles.logintext}>Sign-up</Text>
        <Text style={styles.logintext2}>Create a new account!</Text>
      </View>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        onChangeText={text => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        onChangeText={text => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        onChangeText={text => handleChange('password', text)}
      />

      {/* Send OTP Button */}
      <TouchableOpacity style={styles.button} onPress={sendOTP}>
        <Text style={styles.buttonText}>
          {isOtpSent ? 'Resend OTP' : 'Send OTP'}
        </Text>
      </TouchableOpacity>

      {/* OTP Input Field */}
      {isOtpSent && (
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          placeholderTextColor="#888"
          keyboardType="number-pad"
          onChangeText={text => handleChange('otp', text)}
        />
      )}

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Already have an account? */}
      <TouchableOpacity
        style={styles.box3}
        onPress={() => navigation.replace('Login')}>
        <Text>
          Already have an account? <Text style={{color: '#E75102'}}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box3: {
    paddingHorizontal: 60,
    paddingVertical: 20,
    color: '#D9D9D9',
  },
  logobox: {
    marginBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoimg: {
    width: 65,
    height: 65,
  },
  logotext: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  logotext2: {
    fontSize: 10,
    color: '#7C7C7C',
  },
  logintext: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  logintext2: {
    fontSize: 12,
    color: '#7C7C7C',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
