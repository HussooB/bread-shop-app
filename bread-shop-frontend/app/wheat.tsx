import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { API_URL } from '../config';
const BAKERY_BG = require('../assets/bakery-bg.jpg');

export default function Wheat() {
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const router = useRouter();
  const { theme } = useTheme();

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      // Replace with your actual backend IP and endpoint
      const response = await fetch(`${API_URL}/api/wheat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity: parseFloat(quantity),
          date,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Wheat stock data added successfully');
        setQuantity('');
      } else {
        Alert.alert('Error', data.message || 'Failed to add wheat stock data');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ImageBackground source={BAKERY_BG} style={{ flex: 1 }} resizeMode="cover">
      <View style={[styles.container, theme === 'dark' && { backgroundColor: 'rgba(40, 30, 10, 0.92)' }]}>
        {/* Header */}
        <View style={[styles.header, theme === 'dark' && { backgroundColor: '#2d1a05' }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, theme === 'dark' && { color: '#fff8e1' }]}>Add Wheat Stock</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          <View style={[styles.form, theme === 'dark' && { backgroundColor: '#3a2a12', borderColor: '#2d1a05' }]}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, theme === 'dark' && { color: '#fff8e1' }]}>Quantity (kg)</Text>
              <TextInput
                style={[styles.input, theme === 'dark' && { backgroundColor: '#2d1a05', color: '#fff' }]}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                placeholder="Enter quantity"
                placeholderTextColor={theme === 'dark' ? '#fff8e1' : '#8B5C2A'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, theme === 'dark' && { color: '#fff8e1' }]}>Date</Text>
              <TextInput
                style={[styles.input, theme === 'dark' && { backgroundColor: '#2d1a05', color: '#fff' }]}
                value={date}
                onChangeText={setDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={theme === 'dark' ? '#fff8e1' : '#8B5C2A'}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add Wheat Stock</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC', // warm bakery cream
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    padding: 5,
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 