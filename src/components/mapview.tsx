/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const Mapview = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
     

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 26.9124,
            longitude: 75.7873,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: 26.9124,
              longitude: 75.7873,
            }}
            title={'Delivery Location'}
          />
        </MapView>
      </View>

      {/* Static Profile Section */}
      <View style={styles.profileContainer}>
        {/* Profile Details */}
        <Image
          source={require('../public/proman.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Ravi Kumar</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 70,
          }}>
          <View>
            <Text style={styles.profileDetail}>Delivery Partner</Text>
            <Text style={styles.profileDetail}>Vehicle: Bajaj Pulsar</Text>
            <Text style={styles.profileDetail}>Phone: +91 9876543210</Text>
            <Text style={styles.deliveryStatus}>Status: On the way</Text>
          </View>

          {/* Call Button */}
          <TouchableOpacity style={styles.callButton}>
            <Image
              source={require('../public/phone.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 70,
    zIndex: 50,
    left: 20,
    top: 25,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  mapContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    margin: 0,
  },
  map: {
    flex: 1,
  },
  profileContainer: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 30,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 15,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 80,
    top: -60,
  },
  profileName: {
    fontSize: 35,
    // width:500,
    fontWeight: 'bold',
    color: '#5C5C5C',
    position: 'absolute',
    top: 85,
    // backgroundColor: 'red',
  },
  profileDetail: {
    fontSize: 15,
    color: '#777',
  },
  deliveryStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F06C00',
    marginTop: 5,
  },
  callButton: {
    width: 60,
    height: 60,
    backgroundColor: '#F06C00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 20,
  },
});

export default Mapview;
