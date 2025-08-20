import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, I18nManager } from 'react-native';

const LANGUAGE_KEY = '@app_language';

export function useToggleLanguage() {
  const [isArabic, setIsArabic] = useState(I18nManager.isRTL);

  useEffect(() => {
    // Load saved language preference
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (savedLanguage !== null) {
          const isRTL = savedLanguage === 'ar';
          setIsArabic(isRTL);
          // Only force RTL if it's different from current state
          if (I18nManager.isRTL !== isRTL) {
            I18nManager.forceRTL(isRTL);
          }
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };
    
    loadLanguage();
  }, []);

  const toggleLanguage = async () => {
    try {
      const newIsArabic = !isArabic;
      
      // Save language preference
      await AsyncStorage.setItem(LANGUAGE_KEY, newIsArabic ? 'ar' : 'en');
      
      // Update state immediately for UI feedback
      setIsArabic(newIsArabic);
      
      // Force RTL layout change
      I18nManager.forceRTL(newIsArabic);
      
      // Show alert about restart requirement
      Alert.alert(
        'Language Changed',
        'Please restart the app to see the layout changes take effect.',
        [
          {
            text: 'OK',
            onPress: () => {
              // You could add restart logic here if needed
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  return { 
    isArabic, 
    toggleLanguage,
    currentLanguage: isArabic ? 'Arabic' : 'English',
    languageCode: isArabic ? 'ar' : 'en'
  };
}
