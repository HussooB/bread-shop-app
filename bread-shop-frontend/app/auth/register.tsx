import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { API_URL } from '../../config';
export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!firstName || !lastName || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      console.log('Attempting registration with:', { firstName, lastName, phone }); // Log attempt
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, phone, password }),
      });
      const data = await response.json();
      console.log('Registration response:', { status: response.status, data }); // Log response
      if (response.ok) {
        Alert.alert(
          'Success',
          'Registration successful! Please login.',
          [{ text: 'OK', onPress: () => router.replace('/auth/login') }]
        );
      } else {
        Alert.alert('Error', data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error); // Log actual error
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
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
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