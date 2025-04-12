
import React, {} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';

const Loading = ({navigation}) => {
  
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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

  container: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    padding: 20,
    backgroundColor: '#ffff',
  },
});

export default Loading;
