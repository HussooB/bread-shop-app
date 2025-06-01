import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { API_URL } from '../config';
const BAKERY_BG = require('../assets/bakery-bg.jpg');
const DEFAULT_BREAD_TYPES = [
  { label: '6 Birr', value: '6birr' },
  { label: '7 Birr', value: '7birr' },
  { label: '10 Birr', value: '10birr' },
  { label: '12 Birr', value: '12birr' },
];

export default function Production() {
  const [breadInputs, setBreadInputs] = useState(
    DEFAULT_BREAD_TYPES.map(type => ({ type: type.value, label: type.label, quantity: '' }))
  );
  const [newType, setNewType] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const router = useRouter();
  const { theme } = useTheme();

  const handleInputChange = (idx: number, value: string) => {
    setBreadInputs(inputs => inputs.map((input, i) => i === idx ? { ...input, quantity: value } : input));
  };

  const handleAddType = () => {
    if (!newType || !newLabel) {
      Alert.alert('Error', 'Please enter both bread type value and label');
      return;
    }
    if (breadInputs.some(input => input.type === newType)) {
      Alert.alert('Error', 'Bread type already exists');
      return;
    }
    setBreadInputs(inputs => [...inputs, { type: newType, label: newLabel, quantity: '' }]);
    setNewType('');
    setNewLabel('');
  };

  const handleSubmit = async () => {
    const entries = breadInputs.filter(input => input.quantity && !isNaN(Number(input.quantity)) && Number(input.quantity) > 0);
    if (entries.length === 0) {
      Alert.alert('Error', 'Please enter quantity for at least one bread type');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/api/production`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ breadTypes: entries.map(e => ({ breadType: e.type, quantity: Number(e.quantity) })) }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Production data added successfully');
        setBreadInputs(breadInputs.map(input => ({ ...input, quantity: '' })));
      } else {
        Alert.alert('Error', data.message || 'Failed to add production data');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ImageBackground source={BAKERY_BG} style={{ flex: 1 }} resizeMode="cover">
      <View style={[styles.overlay, theme === 'dark' && { backgroundColor: 'rgba(40, 30, 10, 0.92)' }]}> 
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Production</Text>
          <View style={styles.placeholder} />
        </View>
        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.label}>Bread Types & Quantities</Text>
          {breadInputs.map((input, idx) => (
            <View key={input.type} style={styles.breadRow}>
              <MaterialCommunityIcons name="bread-slice" size={22} color="#D2691E" style={{ marginRight: 8 }} />
              <Text style={styles.breadLabel}>{input.label}</Text>
              <TextInput
                style={[styles.input, theme === 'dark' && { backgroundColor: '#2d1a05', color: '#fff' }]}
                value={input.quantity}
                onChangeText={val => handleInputChange(idx, val)}
                keyboardType="numeric"
                placeholder="Qty"
                placeholderTextColor={theme === 'dark' ? '#fff8e1' : '#8B5C2A'}
              />
            </View>
          ))}
          <View style={styles.addTypeRow}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }, theme === 'dark' && { backgroundColor: '#2d1a05', color: '#fff' }]}
              value={newLabel}
              onChangeText={setNewLabel}
              placeholder="Label (e.g. 20 Birr)"
              placeholderTextColor={theme === 'dark' ? '#fff8e1' : '#8B5C2A'}
            />
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }, theme === 'dark' && { backgroundColor: '#2d1a05', color: '#fff' }]}
              value={newType}
              onChangeText={setNewType}
              placeholder="Value (e.g. 20birr)"
              placeholderTextColor={theme === 'dark' ? '#fff8e1' : '#8B5C2A'}
            />
            <TouchableOpacity style={styles.addBtn} onPress={handleAddType}>
              <Ionicons name="add-circle" size={28} color="#D2691E" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add Production</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 248, 220, 0.92)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#D2691E',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: { padding: 5 },
  placeholder: { width: 34 },
  form: {
    backgroundColor: '#fff8e1',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    borderWidth: 1,
    borderColor: '#e0c097',
  },
  label: {
    fontSize: 16,
    color: '#8B5C2A',
    marginBottom: 5,
  },
  breadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  breadLabel: {
    width: 80,
    color: '#D2691E',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0c097',
    marginBottom: 0,
    width: 70,
    textAlign: 'center',
  },
  addTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  addBtn: {
    padding: 2,
  },
  button: {
    backgroundColor: '#D2691E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff8e1',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 