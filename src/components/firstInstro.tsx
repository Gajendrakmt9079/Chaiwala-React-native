/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';

const FirstIntro = ({navigation}) => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  return (
    <ImageBackground
      source={require('../public/loading.png')}
      style={styles.container}>
      <View style={styles.logobox}>
        <Image
          style={styles.logoimg}
          source={require('../public/chefimg.png')}
        />
      </View>

      <View style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <Text style={styles.logintext}>{greeting}</Text>
        <Text style={styles.logintext2}>Fastest tea delivery service</Text>
        <Text style={styles.logintext2}>for you</Text>
      </View>

      <View style={[{ display: 'flex', flexDirection: 'row', gap: 10 }]}>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'white' }]} onPress={() => navigation.navigate('SignIn')}>
          <Text style={[styles.buttonText, { color: 'black' }]}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoimg: {
    width: 300,
    height: 220,
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
    fontSize: 35,
    fontWeight: '400',
  },
  logintext2: {
    fontSize: 15,
    fontWeight: '300',
    color: '#7C7C7C',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
    width: 130,
    height: 50,
    backgroundColor: '#F67C00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 30,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default FirstIntro;
