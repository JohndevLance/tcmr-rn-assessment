import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button, ListItem, Switch } from 'react-native-elements';
import { useAuthStore } from '../store/authStore';
import { useFavouritesStore } from '../store/favouritesStore';
import { useLanguageStore } from '../store/languageStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { isArabic, toggleLanguage, currentLanguage, languageCode, initializeLanguage } = useLanguageStore();
  const { favourites } = useFavouritesStore();
  const { 
    user, 
    logout, 
    biometricEnabled, 
    enableBiometric, 
    disableBiometric,
    checkBiometricAvailability 
  } = useAuthStore();
  
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  useEffect(() => {
    checkBiometricAvailability().then(setBiometricAvailable);
    initializeLanguage(); // Initialize language on component mount
  }, [checkBiometricAvailability, initializeLanguage]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/auth');
          }
        }
      ]
    );
  };

  const handleLanguageToggle = async () => {
    const result = await toggleLanguage();
    
    // Show success alert with restart message
    Alert.alert(
      'Language Changed',
      `Language changed from ${result.oldLanguage} to ${result.newLanguage}. ${result.requiresRestart ? 'Please restart the app to see the changes in layout direction.' : ''}`,
      [
        {
          text: 'OK',
          style: 'default'
        }
      ]
    );
  };

  const toggleBiometric = async () => {
    if (biometricEnabled) {
      await disableBiometric();
    } else {
      const success = await enableBiometric();
      if (!success) {
        Alert.alert('Error', 'Failed to enable biometric authentication');
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f5f5f5' }}>
      {/* User Info */}
      <View style={{ 
        backgroundColor: 'white', 
        padding: 20, 
        borderRadius: 12, 
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
      }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
          {user?.name || 'User'}
        </Text>
        <Text style={{ fontSize: 16, color: '#666', marginBottom: 16 }}>
          {user?.email}
        </Text>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#007AFF' }}>
              {favourites.length}
            </Text>
            <Text style={{ color: '#666' }}>Favorites</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#007AFF' }}>
              {languageCode.toUpperCase()}
            </Text>
            <Text style={{ color: '#666' }}>Language</Text>
          </View>
        </View>
      </View>

      {/* Settings */}
      <View style={{ 
        backgroundColor: 'white', 
        borderRadius: 12, 
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
      }}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Language</ListItem.Title>
            <ListItem.Subtitle>
              {currentLanguage} ({isArabic ? 'RTL' : 'LTR'})
            </ListItem.Subtitle>
          </ListItem.Content>
          <Button 
            title={`Switch to ${isArabic ? 'English' : 'Arabic'}`} 
            onPress={handleLanguageToggle} 
            buttonStyle={{ backgroundColor: '#007AFF', borderRadius: 6 }}
            titleStyle={{ fontSize: 14 }}
          />
        </ListItem>

        {biometricAvailable && (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Biometric Login</ListItem.Title>
              <ListItem.Subtitle>
                Use fingerprint/face to login
              </ListItem.Subtitle>
            </ListItem.Content>
            <Switch
              value={biometricEnabled}
              onValueChange={toggleBiometric}
              trackColor={{ false: '#767577', true: '#007AFF' }}
              thumbColor={biometricEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </ListItem>
        )}
      </View>

      {/* Logout Button */}
      <Button
        title="Logout"
        onPress={handleLogout}
        buttonStyle={{ 
          backgroundColor: '#FF3B30',
          borderRadius: 8,
          paddingVertical: 12
        }}
        titleStyle={{ fontSize: 16, fontWeight: 'bold' }}
      />
    </View>
  );
}
