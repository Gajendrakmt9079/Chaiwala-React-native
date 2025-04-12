/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import products from '../data/data';

const HomePage = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Top Navbar */}
      {/* <View style={styles.navbar}>
        <Image
          source={require('../public/foodxl.png')}
          style={[{width: 35, height: 35}]}
        />
        <Image
          source={require('../public/bell.png')}
          style={[{width: 20, height: 30}]}
        />
      </View> */}

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.navIconContainer}>
            <Image
              source={require('../public/coffeeicon.png')}
              style={[{width: 25, height: 30}]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIconContainer}>
            <Image
              source={require('../public/ice.png')}
              style={[{width: 25, height: 30}]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIconContainer}>
            <Image
              source={require('../public/food.png')}
              style={[{width: 25, height: 30}]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIconContainer}>
            <Image
              source={require('../public/pizza.png')}
              style={[{width: 25, height: 30}]}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Delicious Drinks</Text>

        {/* Product List */}
        <View style={styles.productsContainer}>
          {products.map(item => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DetailsScreen', {userId: item.id});
              }}
              key={item.id}
              style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDesc}>{item.description}</Text>
              <Text style={styles.price}>₹{item.sizes.S}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* New Lunch Section */}
        <View style={styles.newLunch}>
          <Image
            source={require('../public/coffee2.png')}
            style={[{width: '50%', height: '100%', position: 'relative'}]}
          />
          <View style={[{paddingLeft: 20, paddingTop: 40}]}>
            <Text style={styles.productName}>New Lunch Tea</Text>
            <Text style={styles.productDesc}>
              A refreshing tea for your mood
            </Text>
            <Text style={styles.price}>₹25</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[{borderRadius: 50, padding: 5, backgroundColor: '#F67B01'}]}>
          <Image
            source={require('../public/home.png')}
            style={[{width: 30, height: 30}]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image
            source={require('../public/bag.png')}
            style={[{width: 20, height: 30}]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Order Tracking')}>
          <Image
            source={require('../public/map.png')}
            style={[{width: 24, height: 30}]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../public/man.png')}
            style={[{width: 25, height: 30}]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContent: {
    padding: 15,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginBottom: 30,
  },
  navIconContainer: {
    backgroundColor: 'rgba(153, 153, 153, 0.09)',
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    marginBottom: 20,
  },
  newLunch: {
    backgroundColor: 'rgba(153, 153, 153, 0.09)',
    overflow: 'hidden',
    borderRadius: 15,
    // padding: ,
    display: 'flex',
    height: 200,
    alignContent: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },
  image: {
    width: 100,
    height: 120,
    // padding:50,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDesc: {
    fontSize: 12,
    color: '#666',
    marginVertical: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  bottomNav: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 20,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
});

export default HomePage;
