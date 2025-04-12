/* eslint-disable react-native/no-inline-styles */
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../../App';
// import Icon from 'react-native-vector-icons/FontAwesome';

const user = {
  name: 'Dwayne Johnson',
  address: '47 W 13th St, New York, NY\n1001, USA',
  image:
    'https://images.unsplash.com/photo-1586124667279-16906ac416b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbiUyMHllbGxvd3xlbnwwfHwwfHx8MA%3D%3D',
};

const favoriteItems = [
  {
    id: '1',
    name: 'Speical chai',
    price: '₹10',
    rating: 4.9,
    time: '20-25 Min',
    image:
      'https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmV8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '2',
    name: 'Coffee',
    price: '₹18.99',
    rating: 4.9,
    time: '20-25 Min',
    image:
      'https://images.unsplash.com/photo-1612095437389-d459aee25de4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29mZmV8ZW58MHx8MHx8fDA%3D',
  },
];

const ProfileScreen = ({navigation}) => {
  const { setUserToken } = useAuth();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken'); // Remove auth token
      setUserToken(null);
      Alert.alert('Logged Out', 'You have been logged out successfully.');
      navigation.replace('Welcome'); // Redirect to Login screen
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Try again!');
    }
  };

  return (
    <ScrollView>
    <ImageBackground
      source={require('../public/profilebg.png')}
      style={styles.container}>
      {/* Header */}

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Image source={{uri: user.image}} style={styles.profileImage} />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileAddress}>{user.address}</Text>
        <TouchableOpacity style={styles.editProfile}>
          <Text style={styles.editText}>Edit Profile</Text>
          <TouchableOpacity onPress={() => console.log('Go Back')}>
            <Image
              source={require('../public/edit.png')}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, {backgroundColor: '#E75102'}]} onPress={() => navigation.navigate('Plans')}>
          <Text style={{color: '#fff', fontWeight: '800'}}>Subscriptions </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, {backgroundColor: 'white'}]}  onPress={handleLogout}>
          <Text style={{color: 'black', fontWeight: '500'}}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Favorite Items */}
      <FlatList
        data={favoriteItems}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image source={{uri: item.image}} style={styles.cardImage} />
            <TouchableOpacity style={styles.heartIcon}>
              <TouchableOpacity onPress={() => console.log('Go Back')}>
                <Image
                  source={require('../public/herat.png')}
                  style={{width: 20, height: 20, margin: 5}}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
            <View style={styles.cardFooter}>
              <TouchableOpacity onPress={() => console.log('Go Back')}>
                <Image
                  source={require('../public/star.png')}
                  style={{width: 15, height: 15}}
                />
              </TouchableOpacity>
              <Text style={styles.rating}>{item.rating}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 20},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    marginBottom: 10,
  },
  backButton: {marginRight: 10},
  headerText: {fontSize: 18, fontWeight: 'bold'},

  profileContainer: {alignItems: 'center', marginVertical: 50},
  profileImage: {width: 130, height: 130, borderRadius: 40, marginBottom: 10},
  profileName: {fontSize: 22, marginVertical: 10, fontWeight: 'bold'},
  profileAddress: {fontSize: 14, color: 'gray', textAlign: 'center'},
  editProfile: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  editText: {
    color: 'orange',
    textDecorationLine: 'underline',
    marginRight: 5,
    fontWeight: 'bold',
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 50,
    elevation: 11,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  activeTab: {backgroundColor: 'orange'},
  activeTabText: {color: '#fff', fontWeight: 'bold'},

  gridContainer: {justifyContent: 'center'},
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '47%',
    margin: '1.5%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardImage: {width: '100%', height: 120, borderRadius: 10},
  heartIcon: {position: 'absolute', top: 10, right: 10},
  cardTitle: {fontSize: 14, fontWeight: 'bold', margin: 10},
  cardPrice: {fontSize: 14, color: '#555', marginBottom: 10},
  cardFooter: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  rating: {fontSize: 12, marginLeft: 5},
  time: {fontSize: 12, marginLeft: 10, color: 'gray'},
});

export default ProfileScreen;
