/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
 
  TouchableOpacity,
  Alert,
} from 'react-native';

const FastDelivary = () => {
  return (
    <ImageBackground
      source={require('../public/loading.png')}
      style={styles.container}>
      <View style={styles.logobox}>
        <Image style={styles.logoimg} source={require('../public/fast.png')} />
        <Text style={styles.logotext}>Get fast delivary</Text>
        <Text style={styles.logotext2}>Fastest opretion on your service </Text>
        <Text style={styles.logotext2}> by the Chaiwala</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Button Pressed!')}>
          <Image
            source={require('../public/skip.png')}
            style={[{width: 25, height: 30}]}
          />
        </TouchableOpacity>
      
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  logobox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  logoimg: {
    width: 300,
    height: 300,
  },
  logotext: {
    fontSize: 35,
    fontWeight: 400,
  },
  logotext2: {
    fontSize: 15,
    fontWeight: 300,
    color: '#7C7C7C',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    padding: 20,
    backgroundColor: '#ffff',
  },
  button: {
    backgroundColor: '#F06C00', // Green color
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
    marginTop:20,
    shadowColor: '#000', // Shadow effect
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    elevation: 10, // Android shadow
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FastDelivary;
