import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useToggleLanguage } from '../hooks/useToggleLanguage';
import { useFavouritesStore } from '../store/favouritesStore';

export default function ProfileScreen() {
  const { isArabic, toggleLanguage } = useToggleLanguage();
  const { favourites } = useFavouritesStore();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16, fontWeight: 'bold' }}>
        User Profile
      </Text>
      
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          Language: {isArabic ? 'Arabic (RTL)' : 'English (LTR)'}
        </Text>
        <Button title="Toggle Language" onPress={toggleLanguage} />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          Favourite Events: {favourites.length}
        </Text>
        {favourites.length > 0 && (
          <Text style={{ color: '#666' }}>
            You have {favourites.length} favourite event{favourites.length > 1 ? 's' : ''}
          </Text>
        )}
      </View>
    </View>
  );
}
