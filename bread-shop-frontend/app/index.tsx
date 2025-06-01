import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        router.replace('/dashboard');
      } else {
        router.replace('/auth/login');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bread Shop</Text>
      <Text style={styles.subtitle}>Daily Management System</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
}); 