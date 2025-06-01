import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config';
   
export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token);
        router.replace('/dashboard');
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/bakery-bg.jpg')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text style={styles.link}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 248, 220, 0.85)', // light bakery cream
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B5C2A', // bakery brown
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff8e1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0c097',
  },
  button: {
    backgroundColor: '#D2691E', // bakery brown
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff8e1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#8B5C2A',
    textAlign: 'center',
    fontSize: 16,
  },
});