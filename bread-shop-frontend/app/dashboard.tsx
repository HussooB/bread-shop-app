import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ImageBackground, Switch, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { API_URL } from '../config';
const BAKERY_BG = require('../assets/bakery-bg.jpg');

// Add types for user and summary
interface UserData {
  firstName: string;
  [key: string]: any;
}

interface Summary {
  production: { [key: string]: number };
  sales: { hotels: number; markets: number; shop: number };
  revenue: number;
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [productionSummary, setProductionSummary] = useState<any>({});
  const [salesSummary, setSalesSummary] = useState<any>({ hotels: 0, markets: 0, shop: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetchUserData();
    fetchSummaries();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/api/user/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setUserData(data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchSummaries = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      // Fetch production summary
      const prodRes = await fetch(`${API_URL}/api/production/summary`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const prodData = await prodRes.json();
      if (prodRes.ok) setProductionSummary(prodData);
      // Fetch sales summary
      const salesRes = await fetch(`${API_URL}/api/sales/summary`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const salesData = await salesRes.json();
      if (salesRes.ok) setSalesSummary(salesData);
    } catch (error) {
      console.error('Error fetching summaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      router.replace('/auth/login');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <ImageBackground source={BAKERY_BG} style={{ flex: 1 }} resizeMode="cover">
      <View style={[styles.overlay, theme === 'dark' && { backgroundColor: 'rgba(40, 30, 10, 0.92)' }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsSidebarOpen(!isSidebarOpen)} style={styles.menuButton}>
            <Ionicons name="menu-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <MaterialCommunityIcons name="bread-slice" size={26} color="#fff" style={styles.breadIcon} />
        </View>
        {/* Welcome */}
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>Welcome, <Text style={styles.welcomeName}>{userData?.firstName || 'User'}</Text></Text>
        </View>
        {/* Sidebar */}
        {isSidebarOpen && (
          <View style={[styles.sidebar, theme === 'dark' && { backgroundColor: '#2d1a05' }]}>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setIsSidebarOpen(false); router.push('/production'); }}>
              <Ionicons name="create-outline" size={24} color="#D2691E" />
              <Text style={styles.sidebarText}>Production</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setIsSidebarOpen(false); router.push('/sales'); }}>
              <Ionicons name="cart-outline" size={24} color="#D2691E" />
              <Text style={styles.sidebarText}>Sales</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setIsSidebarOpen(false); router.push('/wheat'); }}>
              <Ionicons name="leaf-outline" size={24} color="#D2691E" />
              <Text style={styles.sidebarText}>Wheat</Text>
            </TouchableOpacity>
            <View style={styles.themeToggleRow}>
              <Ionicons name={theme === 'dark' ? 'moon' : 'sunny'} size={22} color="#D2691E" />
              <Text style={styles.sidebarText}>{theme === 'dark' ? 'Dark' : 'Light'} Mode</Text>
              <Switch value={theme === 'dark'} onValueChange={toggleTheme} thumbColor={theme === 'dark' ? '#D2691E' : '#fff'} trackColor={{ true: '#fff8e1', false: '#e0c097' }} />
            </View>
            <TouchableOpacity style={styles.logoutSidebarBtn} onPress={handleLogout}>
              <MaterialCommunityIcons name="logout-variant" size={24} color="#D2691E" />
              <Text style={styles.sidebarText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Main Content */}
        <ScrollView style={styles.content}>
          {loading ? (
            <ActivityIndicator size="large" color="#D2691E" style={{ marginTop: 40 }} />
          ) : (
            <>
              <Text style={styles.sectionTitle}>Bread Production</Text>
              <View style={styles.cardRow}>
                <View style={styles.card}><Text style={styles.cardTitle}>6 Birr</Text><Text style={styles.cardValue}>{productionSummary['6birr'] || 0} pcs</Text></View>
                <View style={styles.card}><Text style={styles.cardTitle}>7 Birr</Text><Text style={styles.cardValue}>{productionSummary['7birr'] || 0} pcs</Text></View>
                <View style={styles.card}><Text style={styles.cardTitle}>10 Birr</Text><Text style={styles.cardValue}>{productionSummary['10birr'] || 0} pcs</Text></View>
                <View style={styles.card}><Text style={styles.cardTitle}>12 Birr</Text><Text style={styles.cardValue}>{productionSummary['12birr'] || 0} pcs</Text></View>
              </View>
              <Text style={styles.sectionTitle}>Bread Sold</Text>
              <View style={styles.cardRow}>
                <View style={styles.card}><Text style={styles.cardTitle}>Hotels</Text><Text style={styles.cardValue}>{salesSummary.hotels || 0} pcs</Text></View>
                <View style={styles.card}><Text style={styles.cardTitle}>Markets</Text><Text style={styles.cardValue}>{salesSummary.markets || 0} pcs</Text></View>
                <View style={styles.card}><Text style={styles.cardTitle}>Own Shop</Text><Text style={styles.cardValue}>{salesSummary.shop || 0} pcs</Text></View>
              </View>
              <View style={styles.earningsCard}>
                <Text style={styles.earningsTitle}>Total Daily Earnings</Text>
                <Text style={styles.earningsValue}>{salesSummary.revenue || 0} Birr</Text>
              </View>
            </>
          )}
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  breadIcon: {
    marginLeft: 8,
  },
  logoutButton: { padding: 5 },
  menuButton: { padding: 5 },
  welcomeBox: {
    alignItems: 'flex-start',
    marginTop: 18,
    marginLeft: 20,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: '#8B5C2A',
  },
  welcomeName: {
    fontWeight: 'bold',
    color: '#D2691E',
  },
  sidebar: {
    position: 'absolute',
    top: 70,
    left: 0,
    width: 220,
    backgroundColor: '#fff',
    padding: 20,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    zIndex: 1000,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sidebarText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#D2691E',
  },
  themeToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    gap: 8,
  },
  logoutSidebarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff8e1',
    borderWidth: 1,
    borderColor: '#e0c097',
  },
  content: { flex: 1, padding: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B5C2A',
    marginBottom: 8,
    marginTop: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 8,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff8e1',
    marginHorizontal: 2,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0c097',
  },
  cardTitle: { fontSize: 16, color: '#8B5C2A', marginBottom: 5 },
  cardValue: { fontSize: 22, fontWeight: 'bold', color: '#D2691E' },
  earningsCard: {
    backgroundColor: '#fff8e1',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e0c097',
  },
  earningsTitle: { fontSize: 18, color: '#8B5C2A', marginBottom: 5 },
  earningsValue: { fontSize: 28, fontWeight: 'bold', color: '#D2691E' },
}); 