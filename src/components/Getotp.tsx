/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import {useAuth} from '../../App';

const Getotp = ({navigation, route}) => {
  const {userEmail} = route.params;
  const {token} = route.params;
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const {setUserToken} = useAuth();

  useEffect(() => {
    sendOTP();
  }, []);

  const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

  const handleChangeText = (text, index) => {
    let newOtp = [...otp];

    if (text) {
      newOtp[index] = text;
      if (index < 3) {
        inputRefs.current[index + 1]?.focus(); // Move to next field
      }
    } else {
      newOtp[index] = ''; // Allow clearing the field
    }

    setOtp(newOtp);
  };
  const sendOTP = async () => {
    if (!userEmail) {
      Alert.alert('Error', 'User email is missing!');
      return;
    }

    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);

    try {
      const response = await axios.post('https://api.web3forms.com/submit', {
        access_key: 'c24c0223-ca3b-4e03-92d5-4968865d9d87', // Replace with your Web3Forms key
        email: userEmail,
        subject: 'Your OTP Code',
        message: `Your OTP code is: ${newOtp}. It is valid for 5 minutes.`,
      });

      if (response.data.success) {
        Alert.alert('Success', `OTP sent successfully to ${userEmail}`);
      } else {
        Alert.alert('Error', 'Failed to send OTP.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong!');
      console.error(error);
    }
  };

  const verifyOTP = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp === generatedOtp) {
      await AsyncStorage.setItem('authToken', token);
      setUserToken(token);
      Alert.alert('Success', 'OTP Verified!');
      navigation.navigate('Home'); // Navigate to home screen or dashboard
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };
  const handleKeyPress = ({nativeEvent}, index) => {
    if (nativeEvent.key === 'Backspace') {
      let newOtp = [...otp];

      if (newOtp[index] !== '') {
        // Clear the current input
        newOtp[index] = '';
      } else if (index > 0) {
        // Move focus to the previous input and clear it
        newOtp[index - 1] = '';
        inputRefs.current[index - 1]?.focus();
      }

      setOtp(newOtp);
    }
  };

  return (
    <ImageBackground
      source={require('../public/loading.png')}
      style={styles.container}>
      <View style={styles.logobox}>
        <Image
          style={styles.logoimg}
          source={require('../public/foodxl.png')}
        />
        <Text style={styles.logotext}>Chaiwala</Text>
        <Text style={styles.logotext2}>Tea and coffee service</Text>
      </View>

      <View style={{display: 'flex', marginBottom: 20}}>
        <Text style={styles.logintext}>Enter Your Code</Text>
        <Text style={styles.logintext2}>Enter the code we just sent</Text>
      </View>

      <View style={styles.frombox}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={el => (inputRefs.current[index] = el)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={value}
            onChangeText={text => handleChangeText(text, index)}
            onKeyPress={event => handleKeyPress(event, index)}
            autoFocus={index === 0} // Autofocus on the first input
          />
        ))}
      </View>

      <TouchableOpacity>
        <Text
          style={[
            styles.logintext2,
            {marginTop: 5, color: '#E75102', textDecorationLine: 'underline'},
          ]}>
          Resend Code
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={verifyOTP}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  frombox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    fontWeight: '400',
  },
  logotext2: {
    fontSize: 10,
    fontWeight: '300',
    color: '#7C7C7C',
  },
  logintext: {
    fontSize: 30,
    fontWeight: '400',
  },
  logintext2: {
    fontSize: 12,
    fontWeight: '300',
    color: '#7C7C7C',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffff',
  },
  input: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
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

export default Getotp;
