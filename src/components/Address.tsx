/* eslint-disable react-native/no-inline-styles */
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

const AddressComponent = ({navigation}) => {
  const [addressData, setAddressData] = useState({
    streetName: '',
    floorNumber: '',
    landmark: '',
    phoneNumber: '',
    pincode: '',
    cityName: '',
  });

  // Function to update state dynamically
  const handleChange = (field: string, value: string) => {
    setAddressData(prevState => ({...prevState, [field]: value}));
  };

  const handleSaveAddress = () => {
    const {streetName, floorNumber, landmark, phoneNumber, pincode, cityName} =
      addressData;

    if (
      !streetName ||
      !floorNumber ||
      !landmark ||
      !phoneNumber ||
      !pincode ||
      !cityName
    ) {
      Alert.alert('Error', 'Please fill in all address fields!');
      return;
    }
    Alert.alert('Success', 'you sigin  Successfully!');
    navigation.navigate('Home');
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
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          paddingHorizontal: 5,
        }}>
        <Text style={styles.header}> Address</Text>
        <Text style={styles.logotext2}>
          Enter you proper address for delivary
        </Text>
      </View>

      {/* Input Fields */}
      <View style={styles.addrssfrom}>
        <TextInput
          style={styles.input}
          placeholder="Street Name"
          placeholderTextColor="#888"
          onChangeText={text => handleChange('streetName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Floor Number"
          placeholderTextColor="#888"
          onChangeText={text => handleChange('floorNumber', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Landmark"
          placeholderTextColor="#888"
          onChangeText={text => handleChange('landmark', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          onChangeText={text => handleChange('phoneNumber', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          placeholderTextColor="#888"
          keyboardType="numeric"
          onChangeText={text => handleChange('pincode', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="City Name"
          placeholderTextColor="#888"
          onChangeText={text => handleChange('cityName', text)}
        />
      </View>

      {/* Save Address Button */}
      <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
        <Text style={styles.buttonText}>Save Address</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logobox: {
    marginBottom: 10,
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
    fontSize: 12,
    fontWeight: 300,
    color: '#7C7C7C',
    marginBottom: 20,
  },
  addrssfrom: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(153, 153, 153, 0.09)',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    // textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black',
    // borderWidth: 0.5,
    borderRadius: 30,
    paddingHorizontal: 20,
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
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddressComponent;
