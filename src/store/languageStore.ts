import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import { create } from 'zustand';

interface LanguageState {
  isArabic: boolean;
  currentLanguage: string;
  languageCode: string;
  isRTL: boolean;
  toggleLanguage: () => Promise<{
    oldLanguage: string;
    newLanguage: string;
    requiresRestart: boolean;
  }>;
  initializeLanguage: () => Promise<void>;
  setLanguage: (isArabic: boolean) => Promise<void>;
}

const LANGUAGE_KEY = '@app_language';

export const useLanguageStore = create<LanguageState>((set, get) => ({
  isArabic: I18nManager.isRTL,
  currentLanguage: I18nManager.isRTL ? 'Arabic' : 'English',
  languageCode: I18nManager.isRTL ? 'ar' : 'en',
  isRTL: I18nManager.isRTL,

  initializeLanguage: async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLanguage !== null) {
        const isArabic = savedLanguage === 'ar';
        set({
          isArabic,
          currentLanguage: isArabic ? 'Arabic' : 'English',
          languageCode: isArabic ? 'ar' : 'en',
          isRTL: isArabic,
        });
        
        // Only force RTL if it's different from current state
        if (I18nManager.isRTL !== isArabic) {
          I18nManager.forceRTL(isArabic);
        }
      }
    } catch (error) {
      console.error('Error loading language preference:', error);
    }
  },

  setLanguage: async (isArabic: boolean) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, isArabic ? 'ar' : 'en');
      
      set({
        isArabic,
        currentLanguage: isArabic ? 'Arabic' : 'English',
        languageCode: isArabic ? 'ar' : 'en',
        isRTL: isArabic,
      });
      
      // Force RTL layout change
      I18nManager.forceRTL(isArabic);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  },

  toggleLanguage: async () => {
    const { isArabic, setLanguage } = get();
    const newIsArabic = !isArabic;
    
    await setLanguage(newIsArabic);
    
    // Return the new language for feedback
    return {
      oldLanguage: isArabic ? 'Arabic' : 'English',
      newLanguage: newIsArabic ? 'Arabic' : 'English',
      requiresRestart: true
    };
  },
}));
