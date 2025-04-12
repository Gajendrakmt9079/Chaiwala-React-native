import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,
  ScrollView,
} from 'react-native';

const SubscriptionScreen = ({navigation}) => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(1000);

  const plans = [
    {
      id: 'topup_600',
      name: '₹500 ',
      amount: 500,
      save: 'Save 10%',
      perMonth: '',
    },
    {
      id: 'topup_1000',
      name: '₹1000 ',
      amount: 1000,
      save: 'Save 20%',
      perMonth: '',
    },
    {
      id: 'topup_1500',
      name: '₹1500 ',
      amount: 1500,
      save: 'Save 30%',
      perMonth: '',
    },
  ];

  const handleSelectPlan = (planId: number) => {
    setSelectedPlan(planId);
  };

  const handleProceed = () => {
    if (selectedPlan) {
        navigation.navigate('cheakout');
        Alert.alert('welcome');
      // Call API to process payment
    } else {
      Alert.alert('Please select a plan.');
    }
  };

  return (
    <ScrollView>
    <ImageBackground
      source={require('../public/plansbf.png')}
      style={styles.container}>
      {/* Illustration */}
      <Image source={require('../public/plans.png')} style={styles.image} />

      {/* Header */}
      <Text style={styles.title}>Upgrade to Premium</Text>
      <Text style={styles.subtitle}>
        Unlimited benefits and exclusive perks!
      </Text>

      {/* Subscription Plans */}
      <View style={styles.plansContainer}>
        {plans.map(plan => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              selectedPlan === plan.amount ? styles.selectedPlan : null,
            ]}
            onPress={() => handleSelectPlan(plan.amount)}>
            <Text style={styles.planSave}>{plan.save}</Text>

            <Text style={styles.planName}>₹{plan.amount} </Text>
            <Text style={styles.planName}> TOP-UP Plan</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Proceed Button */}
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedText}>
          Get {plans.find(p => p.amount === selectedPlan)?.amount} Plan
        </Text>
      </TouchableOpacity>

      {/* Info Section */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>When will I be billed?</Text>
        <Text style={styles.infoText}>
          Your payment will be deducted instantly upon subscription
          confirmation.
        </Text>

        <Text style={styles.infoTitle}>Does my subscription auto-renew?</Text>
        <Text style={styles.infoText}>
          No, this is a one-time top-up plan. You can recharge again after topup
          is complete !.
        </Text>
      </View>
    </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff7f50',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  plansContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  planCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    width: '30%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedPlan: {
    borderColor: '#ff7f50',
    borderWidth: 2,
    // color:'red',
    backgroundColor: '#fff5f0',
  },
  planSave: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ff7f50',
  },
  planName: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    display: 'flex',
  },
  planAmount: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  proceedButton: {
    backgroundColor: '#ff7f50',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 20,
  },
  proceedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
  },
});

export default SubscriptionScreen;
